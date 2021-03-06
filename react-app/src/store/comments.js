
const LOAD_COMMENTS = 'comments/LOAD_COMMENTS';
const ADD_ONE = 'comments/ADD_ONE';
const REMOVE = 'comments/REMOVE';
const UPDATE = 'comments/UPDATE';


const loadComments = (comments) => ({
  type: LOAD_COMMENTS,
  comments
})

const addOne = (comment) => ({
  type: ADD_ONE,
  comment
})

const remove = (comment) => ({
  type: REMOVE,
  comment
})

const update = (comment) => ({
  type: UPDATE,
  comment
})

export const loadAllComments = () => async dispatch => {
  const response = await fetch(`/api/comments/`);
  if (response.ok) {
    const all_comments = await response.json();
    dispatch(loadComments(all_comments));
    return all_comments;
  }
}

export const addComment = (data) => async dispatch => {
  const response = await fetch(`/api/posts/${data.post_id}/comments/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (response.ok) {
    const newComment = await response.json();
    dispatch(addOne(newComment));
    return newComment;
  }
}

export const removeComment = (id) => async dispatch => {
  const response = await fetch(`/api/comments/${id}/`, {
    method: 'DELETE',
  });
  if (response.ok) {
    const deleted = await response.json()
    dispatch(remove(deleted));
  }
}

export const updateComment = (data) => async dispatch => {
  const response = await fetch(`/api/comments/${data.id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (response.ok) {
    const updated = await response.json();
    dispatch(update(updated));
    return updated;
  }
}


const initialState = {}

const commentReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_COMMENTS:
     const allComments = {}
     action.comments.comments.forEach((comment) => {
       allComments[comment.id] = comment
     })
     return {...allComments}
    case ADD_ONE:
    return {
      ...state,
      [action.comment.id]: action.comment
    }
    case REMOVE: {
      newState = {...state};
      delete newState[action.comment]
      return newState;
    };
    case UPDATE: {
      newState = {...state};
      newState[action.comment.id] = action.comment;
      return newState;
    };
    default:
      return state;
  }
}

export default commentReducer;

import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllPosts, removePost } from '../../store/posts';
import { loadAllComments, addComment } from '../../store/comments';
import Comments from './Comments'
import Captions from './Caption'
import Likes from './Likes'
import './dashboard.css'
import { loadAllLikes } from '../../store/likes';
import { NavLink } from 'react-router-dom';

function Dashboard() {
  const dispatch = useDispatch();

  const postObj = useSelector(state => state.posts)
  const posts = Object.values(postObj).reverse();
  const sessionUser = useSelector(state => state.session.user);
  const commentObj = useSelector(state => state.comments)
  const comments = Object.values(commentObj)

  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState([])

  useEffect(() => {
    const newErrors = [];
    if (comment.length > 80) {
      newErrors.push('Comment is too long');
    }
    if (comment.length < 1 && comment.length) {
      newErrors.push('Comment is too short');
    }
    if (comment.indexOf(' ') === 0) {
      newErrors.push('Comment cannot start with a space');
    }
    setErrors(newErrors);
  }, [comment])


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = {
      post_id: e.target.value,
      comment,
      user_id: sessionUser.id,
    }
    const data = await dispatch(addComment(newComment));
    dispatch(loadAllComments())
    dispatch(loadAllPosts())
    if (data.errors) {
      setErrors(data.errors)
    }
    setComment('');
  }
  const handleDelete = async (e) => {
    e.preventDefault();
    const deletePost = {
      'id': e.target.value
    }
    await dispatch(removePost(deletePost))
  }

  if (sessionUser) {
    return (
      <div className='posts-wrapper'>
        <ul className='ul-posts'>
          {posts?.map(post => (
            <li key={post?.id} className='posts'>
              <div className='post-username-container'>
                <NavLink to={`/user/${post?.user?.id}`} className='posts-username'><NavLink className='user-pictures' to={`/user/${post?.user?.id}`}><img src={post?.user?.picture} height='30' className='user-profile-picture' /></NavLink> {post?.user?.username} </NavLink>
                {sessionUser?.id === post?.user_id ? <button value={post?.id} className='delete-post-button' onClick={handleDelete}>Delete Post</button> : <></>}
              </div>
              <img className='posts-images' src={post?.photos[0]?.photo} />
              <Likes post={post.id} />
              <Captions post={post} />
              {post?.comments?.map(comment => (
                <Comments comments={comment} />
              ))}
              {errors.map((error, idx) => <li className='errors' key={idx}>{error}</li>)}
              <div className='comment-form-container'>
                <form className='post-comment-form'>
                  <div className='input-post-container'>
                    <input className='comment-input' placeholder='Enter a comment' type='text' value={comment} onSubmit={e => setComment('')} onChange={e => setComment(e.target.value)} />
                    <button disabled={comment.length <= 0 || comment.length > 80 || comment.indexOf(' ') === 0 ? true : false} className='post-button' type='submit' value={post.id} onClick={handleSubmit}>Post</button>
                  </div>
                </form>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Dashboard;

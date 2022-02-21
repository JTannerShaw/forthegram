import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllPosts } from '../../store/posts';
import { loadAllComments } from '../../store/comments';
import Comments from '../dashboard/Comments';
import Captions from '../dashboard/Caption';
import Likes from '../dashboard/Likes';
import { addComment } from '../../store/comments';
import { removePost } from '../../store/posts';
import './SinglePost.css'
import { NavLink } from 'react-router-dom';
import { loadAllLikes } from '../../store/likes';

function SinglePost({ post }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  const postObj = useSelector(state => state.posts)
  const posts = Object.values(postObj)
  const sessionUser = useSelector(state => state.session.user);
  const commentObj = useSelector(state => state.comments)
  const comments = Object.values(commentObj)

  useEffect(() => {
    dispatch(loadAllPosts());
    dispatch(loadAllComments());
    dispatch(loadAllLikes());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = {
      post_id: e.target.value,
      comment,
      user_id: sessionUser.id,
    }
    await dispatch(addComment(newComment));
    dispatch(loadAllComments())
    setComment('');
    return newComment;
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    const deletePost = {
      'id': e.target.value
    }
    dispatch(removePost(deletePost))
  }


  return (
    <div className='single-posts-wrapper'>
        <ul className='single-ul-posts'>
            <li key={post?.id} className='single-posts'>
              <div className='post-username-container'>
                <h4 className='posts-username'><NavLink className='user-pictures' to={`/users/${post?.user?.id}`}><img src={post?.user?.picture} height='30' className='user-profile-picture'/></NavLink> {post?.user?.username}</h4>
                {sessionUser?.id === post?.user_id ? <button value={post?.id} className='delete-post-button' onClick={handleDelete}>Delete Post</button> : <></>}
              </div>
              <img className='single-posts-images' src={post?.photos[0]?.photo} />
              <Likes post={post.id} />
              <Captions post={post} />
              {post?.comments?.map(comment => (
                <Comments comments={comment} />
              ))}
              <div className='comment-form-container'>
                <form className='post-comment-form'>
                  <div className='input-post-container'>
                    {/* {errors.map((error, idx) => <li className='errors' key={idx}>{error}</li>)} */}
                    <input className='comment-input' placeholder='Enter a comment' type='text' value={comment} onSubmit={e => setComment('')} onChange={e => setComment(e.target.value)} />
                    <button disabled={comment.length <= 0 ? true : false} className='post-button' type='submit' value={post.id} onClick={handleSubmit}>Post</button>
                  </div>
                </form>
              </div>
            </li>
        </ul>
      </div>
    // <div className='single-post-wrapper'>
    //     <img src={post?.user?.picture} height='30' className='user-profile-picture' /><h4>{post.user.username}</h4>
    //     {sessionUser?.id === post?.user_id ? <button value={post?.id} className='delete-post-button' onClick={handleDelete}>Delete Post</button> : <></>}
    //   <img className='single-posts-images' src={post?.photos[0].photo} />
    //   {post?.comments?.map(comment => (
    //     <Comments comments={comment} />
    //   ))}
    //   <div className='comment-form-container'>
    //     <form className='post-comment-form'>
    //       <div className='input-post-container'>
    //         {/* {errors.map((error, idx) => <li className='errors' key={idx}>{error}</li>)} */}
    //         <input className='single-post-comment-input' placeholder='Enter a comment' type='text' value={comment} onSubmit={e => setComment('')} onChange={e => setComment(e.target.value)} />
    //         <button disabled={comment.length <= 0 ? true : false} className='post-button' type='submit' value={post.id} onClick={handleSubmit}>Post</button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
  );
}


export default SinglePost;
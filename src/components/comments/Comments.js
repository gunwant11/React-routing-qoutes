import { useState } from 'react';
import { useParams } from'react-router-dom';
import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import useHttp from '../../hooks/hooks/use-http';
import { getAllComments } from '../../lib/lib/api'
import { useEffect } from 'react/cjs/react.development';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from '../comments/CommentsList';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams()

  const { sendRequest,status, data: loadedComments } = useHttp(getAllComments);

  const { quoteId } = params; 

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  useEffect(()=> {
    sendRequest(quoteId);
  },[quoteId, sendRequest]);
  const addedCommentHandler= () =>{

  }
  let comments;
  if (status ==='pending'){
    comments = (<div className = "centered">
       <LoadingSpinner />
    </div> )
  }

  if(status === 'completed' && loadedComments && loadedComments.lenght > 0){
      comments = <CommentsList comments={loadedComments} />;
  }
  if(status === 'completed' && loadedComments && loadedComments.lenght === 0){
      comments = <p className='centered'>NO comments were found!</p>
  }
  
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteId={params.quoteId} onAddedComment={addedCommentHandler} />}
      {comments}
    </section>
  );
};

export default Comments;

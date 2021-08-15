import { useRef } from "react";
import useHttp from "../../hooks/hooks/use-http";
import classes from "./NewCommentForm.module.css";
import { addComment } from "../../lib/lib/api";
import LoadingSpinner from '../UI/LoadingSpinner'
import { useEffect } from "react/cjs/react.development";


const NewCommentForm = (props) => {

  const commentTextRef = useRef();

  const { sendRequest, status, error } = useHttp(addComment);
  
  const{ onAddComment } = props; 
  useEffect(()=> {
    if(status === 'completed' && !error){
      onAddComment();
    }
  },[])

  const submitFormHandler = (event) => {
    event.preventDefault();
    const enteredText = commentTextRef.current.value;

    // optional: Could validate here

    sendRequest({commentData: { text: enteredText },quoteId: props.quoteId});

  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === "pending" && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;

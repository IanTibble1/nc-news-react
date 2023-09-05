import { useState } from "react";
import axiosBase from "./axiosBase";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const PostCommentForm = ({
  article_id,
  handleOptimisticComment,
  setCommentList,
}) => {
  const [comment, setComment] = useState("");
  const { userName } = useContext(UserContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    const optimisticComment = {
      comment_id: 99999,
      username: userName,
      body: comment,
      votes: 0,
    };

    handleOptimisticComment(optimisticComment);

    axiosBase
      .post(`articles/${article_id}/comments`, {
        username: `${userName}`,
        body: `${comment}`,
      })
      .then(() => {
        alert("Your comment has been posted");
        setComment("");
      })
      .catch((err) => {
        alert("Something went wrong. Please try posting again");
        setCommentList((prevCommentList) => {
          return prevCommentList.filter((comment) => {
            comment !== optimisticComment;
          });
        });
      });
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label htmlFor="post-comment">Write a comment</label>
        <input
          type="text"
          id="postComment"
          name="postComment"
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
          }}
        />
        <button type="submit">Post Comment</button>
      </form>
    </section>
  );
};

export default PostCommentForm;
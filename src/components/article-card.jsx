import moment from "moment";
import axiosBase from "./axios-base";
import { useState } from "react";

const ArticleCard = ({ article }) => {
  const [voteCount, setVoteCount] = useState(article.votes);
  const [hasVoted, setHasVoted] = useState(false);
  const handleClick = (event) => {
    event.preventDefault();
    if (hasVoted === false) {
      setVoteCount((prevVoteCount) => prevVoteCount + 1);
      setHasVoted(true);

      axiosBase
        .patch(`articles/${article.article_id}`, { inc_vote: 1 })
        .then(() => {})
        .catch((err) => {
          console.log(err);
          setVoteCount((prevVoteCount) => prevVoteCount - 1);
          setHasVoted(false);
        });
    }
  };

  const formatDate = moment(article.created_at).utc().format("DD-MM-YYYY");

  return (
    <main>
      <section className="article-card">
        <div className="article-image">
          <img src={article.article_img_url} alt={article.title} />
        </div>
        <div className="blurred-textbox">
          <p>
            <strong>
              {article.title} ({article.topic}){" "}
            </strong>
            <br />
            By {article.author} <br />
            {formatDate}
            <br />
            <br />
            {article.body} <br />
          </p>
          <div className="vote-section">
            <p>Votes: {voteCount}</p>
            <button onClick={handleClick} type="submit">
              Add vote
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ArticleCard;

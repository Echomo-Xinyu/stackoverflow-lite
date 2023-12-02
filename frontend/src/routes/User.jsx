import { useEffect, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import {
  fetchAnswers,
  fetchComments
} from "../api";

export default function User() {
  const userData = useLoaderData();
  const [answers, setAnswers] = useState([]);
  const [comments, setComments] = useState([]);

  const fetchData = async () => {
    const answersData = await fetchAnswers();
    const filteredAnswers = answersData.filter(
      (answer) => answer.userId === userData.id
    );
    setAnswers(filteredAnswers);

    const commentsData = await fetchComments();
    const filteredComments = commentsData.filter(
      (comment) => comment.userId === userData.id
    );
    setComments(filteredComments);
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      <h2>Name: {userData.name} id: {userData.id}</h2>
      <h3>Answers by {userData.name}</h3>

      {answers.map((answer) => {
        return <ContentDisplay key={answer.id} type="answer" content={answer}/>
      })}
      <br/>
      <h3>Comments by {userData.name}</h3>
      {comments.map((comment) => {
        return <ContentDisplay key={comment.id} type="comment" content={comment} />
      })}
    </>
  )
}

function ContentDisplay(props) {
  return (
    <div className="card mb-3 container">
      <div className="card-body">
        <h5 className="card-title mb-2 text-muted">
          By <Link to={`/user/${props.content.user.id}`}>{props.content.user.name}</Link>
        </h5>
        <p className="card-text">{props.content.body}</p>
        <Link to={`/posts/${props.content.postId}`}>see original</Link>
      </div>
      <br />
    </div>
  )
}
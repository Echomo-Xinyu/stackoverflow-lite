import { useEffect, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import Input from "./Input";
import { fetchAnswers, fetchComments } from "../api";

export default function Post() {
  const postData = useLoaderData();
  const [answers, setAnswers] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const answersData = await fetchAnswers();
      const filteredAnswers = answersData.filter((answer) => answer.postId === postData.id);
      setAnswers(filteredAnswers);
  
      const commentsData = await fetchComments();
      const filteredComments = commentsData.filter((comment) => comment.postId === postData.id);
      setComments(filteredComments);
    };
  
    fetchData();
  }, [postData.id]); 

  return (
    <div className="container">
      <ContentBody type="Post:" content={postData} />
      {answers.map((answer) => {
        return (
          <div key={"answers" + answer.id} className="container">
            <ContentBody type="Answer: " content={answer} />

            {comments.filter((comment) => {
              return comment.answerId === answer.id
            }).map((comment) => {
              return <ContentBody type="Comment: " content={comment} />;
            })}
            <br/>
          </div>
        );
      })}
    </div>
  );
}

function ContentBody(props) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{props.type + props.content.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          By {props.content.user.name}
        </h6>
        <p className="card-text">{props.content.body}</p>
      </div>
    </div>
  );
}

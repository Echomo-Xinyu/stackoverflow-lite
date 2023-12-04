import { useEffect, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { fetchAnswers, fetchComments, fetchPosts } from "../api";

export default function User() {
  const userData = useLoaderData();
  const [posts, setPosts] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [comments, setComments] = useState([]);

  const fetchData = async () => {
    const postsData = await fetchPosts();
    const filteredPosts = postsData.filter(
      (post) => post.userId === userData.id
    );
    setPosts(filteredPosts);

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
    document.title = userData.name;
    fetchData();
  }, []);

  return (
    <>
      <h2>
        Name: {userData.name} id: {userData.id}
      </h2>

      <h3>Posts by {userData.name}</h3>
      {posts.length > 0 ? (
        posts.map((post) => {
          return <ContentDisplay key={post.id} content={post} />;
        })
      ) : (
        <p>No posts by {userData.name}</p>
      )}
      <br />

      <h3>Answers by {userData.name}</h3>
      {answers.length > 0 ? (
        answers.map((answer) => {
          return <ContentDisplay key={answer.id} content={answer} />;
        })
      ) : (
        <p>No answers by {userData.name}</p>
      )}
      <br />

      <h3>Comments by {userData.name}</h3>
      {comments.length > 0 ? (
        comments.map((comment) => {
          return <ContentDisplay key={comment.id} content={comment} />;
        })
      ) : (
        <p>No comments by {userData.name}</p>
      )}
    </>
  );
}

function ContentDisplay(props) {
  return (
    <div className="card mb-3 container">
      <div className="card-body">
        <h5 className="card-title mb-2 text-muted">
          By{" "}
          <Link to={`/user/${props.content.user.id}`}>
            {props.content.user.name}
          </Link>
        </h5>
        <p className="card-text">{props.content.body}</p>
        <Link to={`/posts/${props.content.postId || props.content.id}`}>see original</Link>
      </div>
      <br />
    </div>
  );
}

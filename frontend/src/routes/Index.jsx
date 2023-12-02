import { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import Input from "./Input";

export default function Index() {
  const posts = useLoaderData();
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");
  const [newPostAuthor, setNewPostAuthor] = useState("");

  return (
    <div className="index-page">
      <h1>Home</h1>

      <div>
        {posts.map((post) => {
          return <HomePost post={post} key={post.id} />;
        })}
      </div>
      <br />
      <h2>Question not found? Make your own post!</h2>
      <form onSubmit={(event) => {}}>
        <div className="my-3">
          <Input
            id="title"
            label="title: "
            type="text"
            value={newPostTitle}
            onInputChange={(event) => {
              setNewPostTitle(event.target.value);
            }}
          />
        </div>
        {/* TODO: make body content have larger box */}
        <div className="my-3">
          <Input
            id="body"
            label="body content: "
            type="textarea"
            value={newPostBody}
            onInputChange={(event) => {
              setNewPostBody(event.target.value);
            }}
          />
        </div>
        <div className="my-3">
          <Input
            id="author"
            label="author name: "
            type="text"
            value={newPostAuthor}
            onInputChange={(event) => {
              setNewPostAuthor(event.target.value);
            }}
          />
        </div>
        <button type="button" className="btn btn-primary">Create New Post</button>
      </form>
    </div>
  );
}

function HomePost(props) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{props.post.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          By {props.post.user.name}
        </h6>
        <p className="card-text">{props.post.body.substring(0, 100)}...</p>
        <Link to={`/posts/${props.post.id}`} className="card-link">
          Read
        </Link>
      </div>
    </div>
  );
}

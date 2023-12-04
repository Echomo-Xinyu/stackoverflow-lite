import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Input from "./Input";
import { addPost, addUser, fetchPosts, fetchUsers } from "../api";
import { v4 as uuidv4 } from "uuid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Index() {
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");
  const [newPostAuthor, setNewPostAuthor] = useState("");

  const fetchPostsData = async () => {
    const postsData = await fetchPosts();
    setPosts(postsData);
  };

  useEffect(() => {
    document.title = "Home";
    fetchPostsData();
  }, []);

  return (
    <div className="index-page">
      <h1>Home</h1>

      <div>
        {posts
          .sort((postA, postB) => {
            return postB.timestamp - postA.timestamp;
          })
          .map((post) => {
            return <HomePost post={post} key={post.id} />;
          })}
      </div>
      <br />
      <h2>Question not found? Make your own post!</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const handleAddPost = async () => {
            const userId = await fetchUsers().then((json) => {
              console.log("user data:", json);
              const matchedUsers = json.filter(
                (user) => user.name === newPostAuthor
              );
              console.log("hi", matchedUsers);
              if (matchedUsers.length === 0) {
                const newUserId = uuidv4();
                addUser({
                  id: newUserId,
                  name: newPostAuthor,
                });
                return newUserId;
              } else {
                return matchedUsers[0].id;
              }
            });
            const newUserId = uuidv4();
            const newTimestamp = Date.now();
            await addPost({
              id: newUserId,
              title: newPostTitle,
              body: newPostBody,
              isStarred: "f",
              userId: userId,
              timestamp: newTimestamp,
            });
            setNewPostTitle("");
            setNewPostBody("");
            setNewPostAuthor("");
            fetchPostsData();
          };

          handleAddPost();
          toast("new post created!");
        }}
      >
        <div className="my-3">
          <Input
            id="title"
            required={true}
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
            required={true}
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
            required={true}
            label="author name: "
            type="text"
            value={newPostAuthor}
            onInputChange={(event) => {
              setNewPostAuthor(event.target.value);
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create New Post
        </button>
      </form>
      <ToastContainer position="bottom-right" autoClose={1000} />
    </div>
  );
}

function HomePost(props) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{props.post.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {props.post.user ? "By: " : ""}
          {props.post.user ? (
            <Link to={`/users/${props.post.user.id}`}>
              {props.post.user.name}
            </Link>
          ) : (
            <></>
          )}
        </h6>
        <p className="card-text">{props.post.body.substring(0, 100)}...</p>
        <Link to={`/posts/${props.post.id}`} className="card-link">
          Read
        </Link>
      </div>
    </div>
  );
}

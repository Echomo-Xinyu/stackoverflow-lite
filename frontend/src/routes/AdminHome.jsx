import { useState, useEffect } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { deletePost, fetchPosts } from "../api";
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function AdminHome() {
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [selectedState, setSelectedState] = useState("false");
  const [posts, setPosts] = useState(useLoaderData());

  const handleToggleItem = (postId) => {
    setSelectedPosts((selectedPostIDs) => {
      if (selectedPostIDs.includes(postId)) {
        return selectedPostIDs.filter((selectedPost) => selectedPost !== postId); // Remove the post if it's already selected
      } else {
        return [...selectedPostIDs, postId]; // Add the post if it's not selected
      }
    });
  };

  const deleteSelectedPosts = () => {
    Promise.all(
      selectedPosts.map((postId) => {
        return deletePost(postId);
      })
    ).then(() => {
      setSelectedPosts([]);
      toast("selected posts deleted");
    })    
  };

  useEffect(() => {
    if (selectedPosts.length === 0) {
      setSelectedState("false");
    } else if (selectedPosts.length < posts.length) {
      setSelectedState("some");
    } else {
      setSelectedState("true");
    }

    fetchPosts().then((data) => {setPosts(data)});
  }, [selectedPosts]);

  return (
    <div>
      <div className="container">
        <p>De/select all</p>
        {selectedState === "true" ? (
          <input
            type="checkbox"
            checked={true}
            onChange={() => {
              setSelectedState("false");
              setSelectedPosts([]);
            }}
          />
        ) : (
          <></>
        )}
        {selectedState === "some" ? (
          <input
            type="checkbox"
            onChange={() => {
              setSelectedState("true");
              setSelectedPosts(posts);
            }}
          />
        ) : (
          <></>
        )}
        {selectedState === "false" ? (
          <input
            type="checkbox"
            checked={false}
            onChange={() => {
              setSelectedState("true");
              setSelectedPosts(posts);
            }}
          />
        ) : (
          <></>
        )}
      </div>
      <div className="toolbar">
        <button
          onClick={deleteSelectedPosts}
          disabled={selectedPosts.length === 0}
        >
          Delete
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Author</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedPosts.includes(post.id)}
                  onChange={() => handleToggleItem(post.id)}
                />
              </td>
              <td>{post.user.name}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer position="bottom-right" autoClose={1000} />
    </div>
  );
}

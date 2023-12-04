import { useEffect, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { useAdmin } from "./AdminContext";
import Input from "./Input";
import {
  addAnswer,
  addComment,
  addUser,
  fetchAnswers,
  fetchComments,
  fetchPostById,
  fetchUsers,
  updateAnswer,
  updateComment,
  updatePost,
} from "../api";
import { v4 as uuidv4 } from "uuid";

export default function Post() {
  const [post, setPost] = useState(useLoaderData());
  const [answers, setAnswers] = useState([]);
  const [comments, setComments] = useState([]);
  const [isCommentFormExpaned, setIsCommentFormExpanded] = useState(false);
  const [newCommentAnswerId, setNewCommentAnswerId] = useState("");
  const [newCommentBody, setNewCommentBody] = useState("");
  const [newCommentAuthor, setNewCommentAuthor] = useState("");
  const [newAnswerBody, setNewAnswerBody] = useState("");
  const [newAnswerAuthor, setNewAnswerAuthor] = useState("");
  const { isAdmin, toggleAdmin } = useAdmin();
  const [editContentId, setEditContentId] = useState("");
  const [editContentBody, setEditContentBody] = useState("");

  const fetchData = async () => {
    const newPostData = await fetchPostById(post.id);
    setPost(newPostData);

    const answersData = await fetchAnswers();
    const filteredAnswers = answersData.filter(
      (answer) => answer.postId === post.id
    );
    setAnswers(filteredAnswers);

    const commentsData = await fetchComments();
    const filteredComments = commentsData.filter(
      (comment) => comment.postId === post.id
    );
    setComments(filteredComments);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <ContentBody type="Post:" content={post} />
      {isAdmin ? (
        <>
          <button
            onClick={() => {
              setEditContentId(post.id);
            }}
          >
            Edit
          </button>
          {post.id === editContentId ? (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const handleUpdatePost = async () => {
                  const newTimestamp = Date.now();

                  await updatePost(post.id, {
                    id: post.id,
                    title: "",
                    body: editContentBody,
                    isStarred: "f",
                    userId: post.userId,
                    timestamp: newTimestamp,
                  });
                  setEditContentBody("");
                  setEditContentId("");
                  fetchData();
                };
                handleUpdatePost();
              }}
            >
              <div className="my-3">
                <Input
                  id="body"
                  required={true}
                  label="new body content: "
                  type="textarea"
                  value={editContentBody}
                  onInputChange={(event) => {
                    setEditContentBody(event.target.value);
                  }}
                />
                <button type="submit">Make change</button>
              </div>
            </form>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}

      {answers
        .sort((answerA, answerB) => {
          return answerB.timestamp - answerA.timestamp;
        })
        .map((answer) => {
          return (
            <div key={"answers" + answer.id} className="container">
              <br />
              <ContentBody type="Answer: " content={answer} />
              {isAdmin ? (
                <>
                  <button
                    onClick={() => {
                      setEditContentId(answer.id);
                    }}
                  >
                    Edit
                  </button>
                  {answer.id === editContentId ? (
                    <form
                      onSubmit={(event) => {
                        event.preventDefault();
                        const handleUpdateAnswer = async () => {
                          const newTimestamp = Date.now();
                          await updateAnswer(answer.id, {
                            id: answer.id,
                            title: "",
                            body: editContentBody,
                            userId: answer.userId,
                            postId: post.id,
                            timestamp: newTimestamp,
                          });
                          setEditContentBody("");
                          setEditContentId("");
                          fetchData();
                        };
                        handleUpdateAnswer();
                      }}
                    >
                      <div className="my-3">
                        <Input
                          id="body"
                          required={true}
                          label="new body content: "
                          type="textarea"
                          value={editContentBody}
                          onInputChange={(event) => {
                            setEditContentBody(event.target.value);
                          }}
                        />
                        <button type="submit">Make change</button>
                      </div>
                    </form>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}
              {comments.length > 0 ? (
                <p>Comments sorted from latest to oldest</p>
              ) : (
                <></>
              )}
              {comments
                .filter((comment) => {
                  return comment.answerId === answer.id;
                })
                .sort((commentA, commentB) => {
                  return commentB.timestamp - commentA.timestamp;
                })
                .map((comment) => {
                  return (
                    <>
                      <ContentBody
                        key={"comment" + comment.id}
                        type="Comment: "
                        content={comment}
                      />

                      {isAdmin ? (
                        <>
                          <button
                            onClick={() => {
                              setEditContentId(comment.id);
                            }}
                          >
                            Edit
                          </button>
                          {comment.id === editContentId ? (
                            <form
                              onSubmit={(event) => {
                                event.preventDefault();
                                const handleUpdateComment = async () => {
                                  const newTimestamp = Date.now();
                                  await updateComment(comment.id, {
                                    id: comment.id,
                                    title: "",
                                    body: editContentBody,
                                    userId: comment.userId,
                                    postId: comment.postId,
                                    answerId: comment.answerId,
                                    timestamp: newTimestamp,
                                  });
                                  setEditContentBody("");
                                  setEditContentId("");
                                  fetchData();
                                };
                                handleUpdateComment();
                              }}
                            >
                              <div className="my-3">
                                <Input
                                  id="body"
                                  required={true}
                                  label="new body content: "
                                  type="textarea"
                                  value={editContentBody}
                                  onInputChange={(event) => {
                                    setEditContentBody(event.target.value);
                                  }}
                                />
                                <button type="submit">Make change</button>
                              </div>
                            </form>
                          ) : (
                            <></>
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  );
                })}

              <button
                onClick={(event) => {
                  if (!isCommentFormExpaned) {
                    setIsCommentFormExpanded(true);
                    setNewCommentAnswerId(answer.id);
                  } else {
                    // if already expanded, then one more click will make it collapse
                    if (answer.id === newCommentAnswerId) {
                      setIsCommentFormExpanded(false);
                      setNewCommentAnswerId("");
                    } else {
                      setNewCommentAnswerId(answer.id);
                    }
                  }
                }}
              >
                Add a comment to this answer
              </button>
              {isCommentFormExpaned && answer.id === newCommentAnswerId ? (
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    const handleAddComment = async () => {
                      const userId = await fetchUsers().then((json) => {
                        console.log("user data:", json);
                        const matchedUsers = json.filter(
                          (user) => user.name === newCommentAuthor
                        );
                        console.log("hi", matchedUsers);
                        if (matchedUsers.length === 0) {
                          const newUserId = uuidv4();
                          addUser({
                            id: newUserId,
                            name: newCommentAuthor,
                          });
                          return newUserId;
                        } else {
                          return matchedUsers[0].id;
                        }
                      });
                      const newUserId = uuidv4();
                      const newTimestamp = Date.now();
                      await addComment({
                        id: newUserId,
                        title: "",
                        body: newCommentBody,
                        userId: userId,
                        postId: post.id,
                        answerId: answer.id,
                        timestamp: newTimestamp,
                      });
                      setNewCommentBody("");
                      setNewCommentAuthor("");
                      fetchData();
                    };

                    handleAddComment();
                    setIsCommentFormExpanded(false);
                    setNewCommentAnswerId("");
                  }}
                >
                  {/* TODO: make body content have larger box */}
                  <div className="my-3">
                    <Input
                      id="body"
                      required={true}
                      label="body content: "
                      type="textarea"
                      value={newCommentBody}
                      onInputChange={(event) => {
                        setNewCommentBody(event.target.value);
                      }}
                    />
                  </div>
                  <div className="my-3">
                    <Input
                      id="author"
                      required={true}
                      label="author name: "
                      type="text"
                      value={newCommentAuthor}
                      onInputChange={(event) => {
                        setNewCommentAuthor(event.target.value);
                      }}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Make new comment
                  </button>
                </form>
              ) : (
                <></>
              )}
              <br />
            </div>
          );
        })}

      <br />
      <h2>Unsatisified with current answers? Write your own!</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const handleAddAnswer = async () => {
            const userId = await fetchUsers().then((json) => {
              console.log("user data:", json);
              const matchedUsers = json.filter(
                (user) => user.name === newAnswerAuthor
              );
              console.log("hi", matchedUsers);
              if (matchedUsers.length === 0) {
                const newUserId = uuidv4();
                addUser({
                  id: newUserId,
                  name: newAnswerAuthor,
                });
                return newUserId;
              } else {
                return matchedUsers[0].id;
              }
            });
            const newUserId = uuidv4();
            const newTimestamp = Date.now();
            await addAnswer({
              id: newUserId,
              title: "",
              body: newAnswerBody,
              userId: userId,
              postId: post.id,
              timestamp: newTimestamp,
            });
            setNewAnswerBody("");
            setNewAnswerAuthor("");
            fetchData();
          };

          handleAddAnswer();
        }}
      >
        {/* TODO: make body content have larger box */}
        <div className="my-3">
          <Input
            id="body"
            required={true}
            label="body content: "
            type="textarea"
            value={newAnswerBody}
            onInputChange={(event) => {
              setNewAnswerBody(event.target.value);
            }}
          />
        </div>
        <div className="my-3">
          <Input
            id="author"
            required={true}
            label="author name: "
            type="text"
            value={newAnswerAuthor}
            onInputChange={(event) => {
              setNewAnswerAuthor(event.target.value);
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create New Answer
        </button>
      </form>
    </div>
  );
}

function ContentBody(props) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{props.type + " " + props.content.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          By{" "}
          <Link to={`/users/${props.content.user.id}`}>
            {props.content.user.name}
          </Link>
        </h6>
        <p className="card-text">{props.content.body}</p>
      </div>
    </div>
  );
}

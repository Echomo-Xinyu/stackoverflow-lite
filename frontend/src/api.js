const baseUrl = process.env.REACT_APP_API_BASE_URL;

// TODO: add upvote and downvote field to posts + answers
// TODO: allow users to edit or delete the post

// anyone can make a post / write an answer / post a comment using self-declared name
//   name is unique to one person
// anyone can view the comment / post by a particular person
// only admin can edit or delete a post / answer / comment

// post: id, title, body, isStarred, userId, timestamp
// answer: id, body, userId, postId, timestamp
// comment: id, body, answerId, postId, userId, timestamp
// user: id, name

// query all posts
export function fetchPost() {
  return fetch(`${baseUrl}/posts?_expand=user`)
    .then((response) => response.json());
}

// add post
export function addPost(data) {
  return fetch(`${baseUrl}/posts`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}

// (admin) update post
export function updatePost(postId, data) {
  return fetch(`${baseUrl}/posts/${postId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}

// (admin) delete post
export function deletePost(postId) {
  return fetch(`${baseUrl}/posts/${postId}`, {
    method: "DELETE",
  });
}

// /answers?_expand=user&_expand=post to expand multiple fields
// query a specific post
export function fetchPostById(postId) {
  return fetch(`${baseUrl}/posts/${postId}?_expand=user`)
    .then((response) => response.json());
}

export function fetchAnswers() {
  return fetch(`${baseUrl}/answers?_expand=user&_expand=post`)
    .then((response) => response.json());
}

export function fetchComments() {
  return fetch(`${baseUrl}/comments?_expand=user`)
    .then((response) => response.json());
}

// add answer to specific post
export function addAnswers(data) {
  return fetch(`${baseUrl}/answers`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}

// (admin) update answer
export function updateAnswers(answerId, data) {
  return fetch(`${baseUrl}/answers/${answerId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}

// (admin) delete answer
export function deleteAnswer(answerId) {
  return fetch(`${baseUrl}/answers/${answerId}`, {
    method: "DELETE",
  });
}

// add comment to specific answer
export function addComment(data) {
  return fetch(`${baseUrl}/comments`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}

// (admin) update comment information
export function updateComment(commendId, data) {
  return fetch(`${baseUrl}/comments/${commendId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}

// (admin) delete comment
export function deleteComment(commendId) {
  return fetch(`${baseUrl}/comments/${commendId}`, {
    method: "DELETE",
  });
}

// query all users
export function fetchUsers() {
  return fetch(`${baseUrl}/users`)
    .then((response) => response.json());
}

// query user's post, answer, and comment
// achieved by combing fetchPosts(), fetchAnswers(), fetchComments()

// add user (self-declared name, auto increment id)
export function addUser(data) {
  return fetch(`${baseUrl}/users`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}

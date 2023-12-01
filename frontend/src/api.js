const baseUrl = process.env.REACT_APP_API_BASE_URL;

// anyone can make a post / post a comment using self-declared name
// the name can be repeated and will be credited to same person
// anyone can view the comment / post by a particular person
// only admin can edit or delete a post / comment

// query all posts
// add post
// (admin) update post
// (admin) delete post
// query answers of specific post
// add answer to specific post
// (admin) update answer
// (admin) delete answer
// add comment to specific answer
// (admin) update comment information
// (admin) delete comment
// query all users
// query user's post, answer, and comment
// add user (self-declared name, auto increment id)


// post: id, title, body, isStarred, userId, timestamp
// answer: id, body, userId, postId, timestamp
// comment: id, body, answerId, postId, userId, timestamp
// user: id, name

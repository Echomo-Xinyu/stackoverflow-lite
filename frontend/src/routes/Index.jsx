import { useLoaderData, Link } from "react-router-dom";

export default function Index() {
  const posts = useLoaderData();
  return (
    <div className="index-page">
      <h1>Home</h1>

      <div>
        {posts.map((post) => {
          return <TitleAnswer post={post} key={post.id}/>;
        })}
      </div>
    </div>
  )
}

function TitleAnswer(props) {
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
  )
}
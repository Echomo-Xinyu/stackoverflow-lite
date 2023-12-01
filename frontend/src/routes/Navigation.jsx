import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg bg-light mb-2">
    <div className="container-fluid">
      <Link to="/" className="navbar-brand">
        Stackoverflow lite
      </Link>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin" className="nav-link">
              Admin Mode
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
}
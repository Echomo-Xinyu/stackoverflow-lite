import { Outlet } from "react-router-dom";

export default function Admin() {
  return (
    <div className="container">
      {/* TODO: login in verification */}
      <Outlet />
    </div>
  )
}
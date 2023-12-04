import { useNavigate } from "react-router-dom";
import { useAdmin } from "./AdminContext";
import AdminHome from "./AdminHome";
import AdminLogin from "./AdminLogin";

export default function Admin() {
  const { isAdmin, toggleAdmin } = useAdmin();

  return (
    <div className="container">
      {isAdmin ? (
        <AdminHome />
      ) : (
        <>
          <AdminLogin />
        </>
      )}
    </div>
  );
}

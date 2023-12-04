import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "./AdminContext";
import Input from "./Input";

export default function AdminLogin() {
  const { isAdmin, toggleAdmin } = useAdmin();
  const [filledPassword, setFilledPassword] = useState("");
  // this is a bad example of password
  const AdminPassword = "Password1";
  const navigate = useNavigate();

  return (
    <>
      <p>You have to sign in in order to view Admin content.</p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (filledPassword === AdminPassword) {
            toggleAdmin();
            navigate("/admin");
          } else {
            alert("wrong password");
          }
        }}
      >
        <Input
          id="password"
          label={"Admin Password"}
          required={false}
          type="text"
          value={filledPassword}
          onInputChange={(event) => {
            setFilledPassword(event.target.value);
          }}
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

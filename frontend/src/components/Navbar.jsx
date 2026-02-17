import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <Link to="/">Home</Link> |{" "}
      {!user ? (
        <>
          <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <Link to="/dashboard">Dashboard</Link>{" "}
          {user.role === "admin" && <>| <Link to="/admin">Admin</Link></>}
          {" "} | <button onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  );
};

export default Navbar;

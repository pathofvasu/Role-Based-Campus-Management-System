import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 20px",
        background: "#282c34",
        color: "#fff",
      }}
    >
      <div>
        <Link
          to="/"
          style={{ color: "#61dafb", textDecoration: "none", fontWeight: "bold" }}
        >
          RBCMS
        </Link>
      </div>

      <div style={{ display: "flex", gap: "15px" }}>
        {!user && (
          <>
            <Link to="/login" style={{ color: "#fff", textDecoration: "none" }}>
              Login
            </Link>
            <Link to="/register" style={{ color: "#fff", textDecoration: "none" }}>
              Register
            </Link>
          </>
        )}

        {user && (
          <>
            <Link to="/dashboard" style={{ color: "#fff", textDecoration: "none" }}>
              Dashboard
            </Link>
            {user.role === "admin" && (
              <Link to="/admin" style={{ color: "#fff", textDecoration: "none" }}>
                Admin Panel
              </Link>
            )}
            <button
              onClick={handleLogout}
              style={{
                background: "transparent",
                border: "1px solid #fff",
                borderRadius: "4px",
                padding: "2px 8px",
                cursor: "pointer",
                color: "#fff",
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

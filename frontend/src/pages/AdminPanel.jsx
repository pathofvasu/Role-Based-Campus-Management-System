import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminPanel = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <h2>Admin Panel</h2>
      <p>Welcome Admin {user?.email}!</p>
      <button onClick={logoutUser}>Logout</button>
    </div>
  );
};

export default AdminPanel;

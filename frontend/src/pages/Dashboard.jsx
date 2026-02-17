import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getProfile } from "../api/auth";

const Dashboard = () => {
  const { user, token, logoutUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile(token);
        setProfile(res.data.user);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [token]);

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <h2>Dashboard</h2>
      <p>Welcome, {user?.email}!</p>
      {profile && (
        <div>
          <p><strong>ID:</strong> {profile.id}</p>
          <p><strong>Role:</strong> {profile.role}</p>
        </div>
      )}
      <button onClick={logoutUser}>Logout</button>
    </div>
  );
};

export default Dashboard;

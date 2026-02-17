import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // {id, role, ...}
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Load user profile on initial load
  useEffect(() => {
    if (token) {
      axios
        .get("/profile", { headers: { Authorization: `Bearer ${token}` } })
        .then(res => setUser(res.data.user))
        .catch(() => {
          setUser(null);
          setToken("");
          localStorage.removeItem("token");
        });
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await axios.post("/login", { email, password });
    const token = res.data.token;
    setToken(token);
    localStorage.setItem("token", token);

    // fetch user profile
    const profileRes = await axios.get("/profile", { headers: { Authorization: `Bearer ${token}` } });
    setUser(profileRes.data.user);

    return profileRes.data.user;
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

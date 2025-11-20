import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import "../styles/Layout.css";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    user && (
      <div className="profile">
        <h2 className="phead">Profile</h2>
        <p>Email: {user.email}</p>
        <p>UID: {user.uid}</p>
        <button onClick={handleLogout}>Exit</button>
      </div>
    )
  );
};

export default Profile;

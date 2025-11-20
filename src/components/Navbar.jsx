import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import "../styles/Layout.css";

export default function NavBar() {
  const { user } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <nav className="navbar">
      <Link className="navitem" to="/">Home</Link>
      <Link className="navitem" to="/about">About</Link>
      <Link className="navitem" to="/items">Items</Link>

      {!user ? (
        <>
          <Link className="navitem" to="/login">Login</Link>
          <Link className="navitem" to="/register">Signup</Link>
        </>
      ) : (
        <>
          <Link className="navitem" to="/profile">Profile</Link>
          <button className="navitem" onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
}

import { NavLink } from "react-router-dom";
import "../styles/Layout.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navitem">Home</NavLink>
      <NavLink to="/about" className="navitem">About</NavLink>
      <NavLink to="/items" className="navitem">Items</NavLink>
      <NavLink to="/login" className="navitem">Login</NavLink>
    </nav>
  );
}

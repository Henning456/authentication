import "./NavBar.css";
import { NavLink } from "react-router-dom";

export function NavBar() {
  return (
    <nav className="nav-bar">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
        <div>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
        </div>
      </ul>
    </nav>
  );
}

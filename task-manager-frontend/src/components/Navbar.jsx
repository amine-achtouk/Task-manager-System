import { Link, useNavigate } from "react-router-dom";
import '../style/Navbar.css'

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <nav className="glass-nav">
      <div className="nav-content">
        <div className="nav-brand">
          <Link to="/" className="logo">Task<span>Flow</span></Link>
        </div>

        <div className="nav-links">
          {token ? (
            <>
              <Link to="/task" className="nav-item">Dashboard</Link>
              <div className="user-section">
                <span className="user-badge">{username?.charAt(0).toUpperCase()}</span>
                <span className="username-text">{username}</span>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-item">Login</Link>
              <Link to="/register" className="register-pill">Join Now</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
import React from "react";
import { Link,  useNavigate } from 'react-router-dom';
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const handleButton = (e) => {
    e.preventDefault();
    navigate("/cars");
  };

  return (
    <div className="homepage">
      <h1 className="homepage-title">Hello and welcome</h1>
      <h1 className="homepage-subtitle">Let's choose your dream car</h1>
      <div className="homepage-buttons">
        <button onClick={handleButton} className="homepage-button">
          All Cars
        </button>
        <Link to="/users/login" className="homepage-login-link">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Home;

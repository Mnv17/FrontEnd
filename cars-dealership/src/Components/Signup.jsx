import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Signup.css";
const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await fetch('https://attryb-88g8.onrender.com/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      setMessage(data.message);
      if (response.ok) {
        navigate('/users/login');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Signup Page</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="signup-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="signup-input"
      />
      <button onClick={handleSignUp} className="signup-button">
        Sign Up
      </button>
      <p className="signup-message">{message}</p>
      <Link to="/users/login" className="signup-link">
        Already have an account? Login
      </Link>
    </div>
  );
};

export default Signup;

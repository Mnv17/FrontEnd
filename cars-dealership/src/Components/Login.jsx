import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("https://lively-woolens-cod.cyclic.app/login", {
        email,
        password,
      });

      if (response.data.message === "Login Successful") {
        navigate("/", { state: { _id: email } });
      } else if (response.data.message === "User not found. Register First") {
        alert("User has not signed up");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  }

  return (
    <div className="login">
      <h1>Login</h1>

      <form onSubmit={submit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Submit</button>
      </form>

      <br />
      <p>Don't have an account?</p>
      <br />

      <Link to="/users/signup">Signup!!</Link>
    </div>
  );
}

export default Login;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("https://lively-woolens-cod.cyclic.app/signup", {
        email,
        password,
      });

      if (response.data.message === "New User Register") {
        navigate("/users/login", { state: { _id: email } });
        console.log(response.data.message)
      }
      else if(response.data.message === "User already present" || response.data.message === "Request failed with status code 400"){
        navigate("/users/login", { state: { _id: email } });
        console.log(response.data.message)
      }
       else if (response.data.message === "Cannot Register The User") {
        alert("Cannot Register The User");
        console.log(response.data.message)
      }
      
    } catch (error) {
      alert("Error: " + error.message);
      console.log(error);
    }
  }
  

  return (
    <div className="login">
      <h1>Signup</h1>

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
      <p>Already have an account?</p>
      <br />

      <Link to="/users/login">Login!!</Link>
    </div>
  );
}

export default Signup;

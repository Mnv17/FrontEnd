import React, { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }
  return (
    <div className="Login">
        <h1>Login</h1>
        <form action="POST">
            <input type="email" onChange={(e)=>{setEmail(e.target.value)}} value={email} required={true}/>
            <input type="password" onChange={(e)=>{setPassword(e.target.value)}} value={password} required={true}/>
            <input type="submit" onClick={handleSubmit}/>
        </form>
      
    </div>
  )
}

export default Login

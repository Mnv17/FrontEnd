import React, { useState } from 'react'

export const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  return (
    <>
    <h1>SignUp</h1>
    <form>
      <div>
      <label htmlFor="email">Email</label>
      <input type="email" autoComplete='off' required={true} value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
      <label htmlFor="password">Password</label>
      <input type="password" autoComplete='off' required={true} value={password} onChange={(e) => setPassword(e.target.value)} />    
      </div>
      <button type='submit'>SignUp</button>
      </form>
    </>
  )
}
export default Signup

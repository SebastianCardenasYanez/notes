import { header } from 'express-validator';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginView() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempted with:', { email, password });
    let config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-version" : "1.0.0"
      },
      body : JSON.stringify({ email, password })
    }
    let peticion = await fetch("http://localhost:5000/users/login", config);

    if (peticion.status === 200) {
      navigate('/notes/home');
      console.log("logeado"); 
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-form">
          <h2 className="login-title">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="text-[#E5E5E5]">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="text-[#E5E5E5]">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <button type="submit" className="submit-button">
              Log In
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
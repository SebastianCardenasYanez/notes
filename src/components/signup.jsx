import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUpView() {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit =  async(e) => {
    e.preventDefault();
    // Handle sign-up logic here
    console.log('Sign-up attempted with:', { name, nickname, email, password });
    let config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-version" : "1.0.0"
      },
      body : JSON.stringify({ name, nickname, email, password })
    }
    let peticion = await fetch("https://localhost:5000/users/", config);

    if (peticion.status === 202) {
      navigate('/home');
      console.log("logeado"); 
    }
  };

  return (
    <>
      <div className="signup-container">
        <div className="signup-form">
          <h2 className="signup-title">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="text-[#E5E5E5]">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="nickname" className="text-[#E5E5E5]">Nickname</label>
              <input
                id="nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
                className="form-input"
              />
            </div>
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
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
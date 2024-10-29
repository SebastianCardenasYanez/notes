import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function WelcomeView() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/notes/login');
    // For Next.js, you would use:
    // import { useRouter } from 'next/router';
    // const router = useRouter();
    // router.push('/login');
  };

  const handleSignUpClick = () => {
    navigate('/notes/signup');
    // For Next.js:
    // router.push('/signup');
  };

  return (
    <>
      <div className="welcome-container">
        <h1 className="welcome-title">Welcome to Our Platform</h1>
        <p className="welcome-subtitle">Please log in or sign up to continue</p>
        <div className="button-container">
          <button onClick={handleLoginClick} className="welcome-button">
            Log In
          </button>
          <button onClick={handleSignUpClick} className="welcome-button">
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
}
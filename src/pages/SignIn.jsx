import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAuthStore } from '../../store/authStore.js';
import { toast } from 'react-hot-toast';

import './signIn.css';
import bot from '../assets/bot.png';
import circle from '../assets/Back.png';
import eye from '../assets/eye.png';
import lock from '../assets/lock.png';
import maill from '../assets/maill.png';
import person from '../assets/person.png';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/login'); // Redirects to the login/sign-in page
  };

  const { signup } = userAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    try {
      console.log('name:', name);
      await signup(name, email, password, confirmPassword);
      console.log('name2:', name);
      toast.success('Sign-up successful!');

      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      navigate('/login');
    } catch (err) {
      console.error(err);

      // Handle the error directly from the API response
      const errorMessage =
        err.response?.data?.message || 'Sign-up failed. Please try again.';

      // Show the error message using toast
      toast.error(errorMessage);
    }
  };

  return (
    <div className="login-container">
      <div className="left-side-login">
        <div>
          <div className="login-img">
            <img src={circle} alt="circle" className="circle" />
            <img src={bot} alt="bot" className="bot" />
          </div>
          <p className="login-h">Welcome aboard my friend</p>
          <p className="login-p">just a couple of clicks and we start</p>
        </div>
      </div>
      <div className="right-side-login">
        <div>
          <p className="register">Register</p>
          <form className="form" onSubmit={handleSignUp}>
            <div className="input-wrapper">
              <span className="icon-left">
                <img src={person} alt="mail" />
              </span>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
              />
            </div>

            {/* Email Input */}
            <div className="input-wrapper">
              <span className="icon-left">
                <img src={maill} alt="mail" />
              </span>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
            </div>

            {/* Password Input */}
            <div className="input-wrapper">
              <span className="icon-left">
                <img src={lock} alt="lock" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
              />
              <span className="icon-right" onClick={togglePasswordVisibility}>
                <img src={eye} alt="eye" />
              </span>
            </div>

            {/* Confirm Password Input */}
            <div className="input-wrapper">
              <span className="icon-left">
                <img src={lock} alt="lock" />
              </span>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field"
              />
              <span
                className="icon-right"
                onClick={toggleConfirmPasswordVisibility}
              >
                <img src={eye} alt="eye" />
              </span>
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-button">
              Register
            </button>
          </form>
          <div className="form">
            <p className="account">Have an account ?</p>
            <button className="empty-button" onClick={handleRedirect}>
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

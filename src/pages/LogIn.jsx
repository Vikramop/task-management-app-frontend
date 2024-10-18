import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAuthStore } from '../../store/authStore';
import { toast } from 'react-hot-toast';

import './signIn.css';
import bot from '../assets/bot.png';
import circle from '../assets/Back.png';
import eye from '../assets/eye.png';
import lock from '../assets/lock.png';
import maill from '../assets/maill.png';

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/');
  };
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const { login } = userAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Login successfull');

      setEmail('');
      setPassword('');

      navigate('/dashboard');
    } catch (err) {
      console.log('error', err);

      const errorMessage = err.response?.data?.message || 'Invalid credentials';

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
          <p className="register">Login</p>
          <form className="form" onSubmit={handleLogin}>
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

            {/* Submit Button */}
            <button type="submit" className="submit-button">
              Login
            </button>
          </form>
          <div className="form">
            <p className="account">Have no account yet?</p>
            <button className="empty-button" onClick={handleRedirect}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;

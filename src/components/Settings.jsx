import React, { useState } from 'react';

import './style.css';
import '../pages/signIn.css';
import eye from '../assets/eye.png';
import lock from '../assets/lock.png';
import maill from '../assets/maill.png';
import person from '../assets/person.png';
import { userAuthStore } from '../../store/authStore.js';
import toast from 'react-hot-toast';

const Settings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const { update } = userAuthStore();
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (
      Object.keys(name || newEmail || oldPassword || newPassword).length === 0
    ) {
      console.error('Please fill in at least one field');
      toast.error('Please fill in at least one field');
      return;
    }

    try {
      await update(name, newEmail, oldPassword, newPassword);
      toast.success('Credentials updated successfully!');
      setNewPassword('');
      setOldPassword('');
      setName('');
      setNewEmail('');
    } catch (error) {
      console.error('Error updating credentials:', error);
      toast.error(
        error.response?.data?.message || 'Error updating credentials'
      );
    }
  };

  return (
    <div className="setting-contianer">
      <p className="settings-h">Settings</p>
      <form className="form" onSubmit={handleUpdate}>
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
            type=" email"
            name="newEmail"
            placeholder="New Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
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
            name="oldPassword"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
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
            name="newPassword"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
          Update
        </button>
      </form>
    </div>
  );
};

export default Settings;

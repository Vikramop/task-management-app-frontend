import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import SignIn from './pages/SignIn';
import LogIn from './pages/LogIn';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import TaskView from './components/TaskView';

const App = () => {
  return (
    <div>
      <Toaster />
      <div>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/task/:taskId" element={<TaskView />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;

import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Task from './components/Task';
import Login from './components/Login';
import Signup from './components/Signup';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      email:null,
    };
  }

  // Simulate login function
  handleLogin = (email) => {
    this.setState({ isLoggedIn: true,email });
  };
  handleLogout = () => {
    this.setState({ isLoggedIn: false });
  };

  render() {
    const { isLoggedIn, email } = this.state;

    return (
      <Router>
        <Routes>
          <Route 
            path="/home" 
            element={isLoggedIn ? <Home email={email}/> : <Navigate to="/login" />} 
          />
          <Route 
            path="/task" 
            element={isLoggedIn ? <Task email={email}/> : <Navigate to="/login" />} 
          />
          <Route 
            path="/login" 
            element={<Login onLogin={this.handleLogin} />} 
          />
          <Route 
            path="/signup" 
            element={<Signup onLogin={this.handleLogin} />} 
          />
          <Route 
            path="*" 
            element={<Navigate to="/home" />} 
          />
        </Routes>
      </Router>
    );
  }
}

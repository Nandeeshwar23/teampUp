import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile'; 
import Home from './components/Home';

// Protected Route Component
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('authToken'); // Check for auth token
  return token ? children : <Navigate to="/login" />; // Redirect if no token
};

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error">
          <h2>Something went wrong.</h2>
          <p>Please try again later.</p>
          <a href="/">Go to Home</a>
        </div>
      );
    }

    return this.props.children; 
  }
}

// Not Found Component
const NotFound = () => (
  <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <h2 className="text-2xl font-bold text-center">404 - Page Not Found</h2>
    <a href="/" className="mt-4 text-blue-600">Go to Home</a>
  </div>
);

// Main App Component
const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route 
            path="/home" 
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } 
          />
          {/* Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default App;

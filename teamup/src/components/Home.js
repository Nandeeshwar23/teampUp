import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Using react-icons for the profile icon

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [showProfile, setShowProfile] = useState(false); // State to toggle profile display
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming you're storing the token in localStorage
      const response = await fetch('/api/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const profileData = await response.json();
        setProfile(profileData);
      } else {
        setError('Failed to fetch profile data.');
      }
    } catch (err) {
      setError('An error occurred while fetching the profile.');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleProfileClick = () => {
    setShowProfile(!showProfile); // Toggle profile display
  };

  return (
    <div>
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-white text-2xl">TeamUp</div>
          <div className="relative">
            <button onClick={handleProfileClick} className="text-white">
              <FaUserCircle size={30} />
            </button>
            {showProfile && profile && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
                <p><strong>Name:</strong> {profile.name}</p>
                <p><strong>Age:</strong> {profile.age}</p>
                <p><strong>Location:</strong> {profile.location}</p>
                <p><strong>Sport:</strong> {profile.sport}</p>
                <p><strong>Bio:</strong> {profile.bio}</p>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-4">
        <h1>Welcome to the Home Page</h1>
        {profile ? (
          <div>
            <h2>Profile Information</h2>
            <p>Name: {profile.name}</p>
            <p>Age: {profile.age}</p>
            <p>Location: {profile.location}</p>
            <p>Sport: {profile.sport}</p>
            <p>Bio: {profile.bio}</p>
          </div>
        ) : (
          <p>{error || 'Loading profile...'}</p>
        )}
      </div>
    </div>
  );
};

export default Home;

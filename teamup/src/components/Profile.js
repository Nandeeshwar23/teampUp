import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState({
    userId:'',
    name: '',
    age: '',
    location: '',
    sport: '',
    bio: ''
  });
  const [loading, setLoading] = useState(true); // Loading state
  const [message, setMessage] = useState(''); // Message state for feedback
  const navigate = useNavigate();
  

  useEffect(() => {
    console.log(profile)
    let userId=localStorage.getItem('userId')
    console.log(userId)
  setProfile((profile)=>({ ...profile, userId:userId }))
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data) {
          // Set profile state with fetched data
          // setProfile(response.data);
        } else {
          // If no profile exists, do nothing
          setMessage('Please create your profile.');
        }
      } catch (error) {
        console.error(error);
        setMessage('Error fetching profile. Please try again.');
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(profile)
    
    try {
      await axios.post('http://localhost:5000/api/profile', profile, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log("yoyi")
      navigate('/home'); // Redirect to home if profile is created or updated
    } catch (error) {
      console.error(error);
      setMessage('Error saving profile. Please try again.'); // User-friendly error message
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-100">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Profile</h2>
        {message && <p className="text-red-500 text-center mb-4">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              placeholder="Name"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="number"
              value={profile.age}
              onChange={(e) => setProfile({ ...profile, age: e.target.value })}
              placeholder="Age"
              required
              min="1" // Ensure age is at least 1
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              placeholder="Location"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="text"
              value={profile.sport}
              onChange={(e) => setProfile({ ...profile, sport: e.target.value })}
              placeholder="Sport Interest"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              placeholder="Bio"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;

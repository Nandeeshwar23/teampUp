import React, { useState, useEffect } from 'react';  // Correct imports
import { FaUserCircle } from 'react-icons/fa'; // Using react-icons for the profile icon
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles

const Home = () => {
  const [profile, setProfile] = useState(null);  // State for profile
  const [error, setError] = useState('');        // State for error handling
  const [showProfile, setShowProfile] = useState(false); // State to toggle profile display

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('userId')
      console.log(user,token,"hello");
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },body: JSON.stringify(user),
      });
      console.log(response)

      if (response.ok) {
        const profileData = await response.json();
        setProfile(profileData);
      } else {
        const errorText = await response.text(); // Debugging response
        console.error('Response error:', errorText);
        setError('Failed to fetch profile data.');
      }
    } catch (err) {
      console.error('Fetch error:', err); // Debugging line
      setError('An error occurred while fetching profile data.');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
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
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6">Welcome to TeamUp</h1>

        {/* Carousel Section */}
        <div className="max-w-4xl mx-auto">
          <Carousel 
            showThumbs={false} 
            infiniteLoop={true} 
            autoPlay={true} 
            interval={3000} 
            showStatus={false} 
            dynamicHeight={true}
          >
            {/* Sports Images with URLs */}
            <div>
              <img src="https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=500" alt="Soccer" className="rounded-lg" />
              <p className="legend">Soccer</p>
            </div>
            <div>
              <img src="https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Basketball" className="rounded-lg" />
              <p className="legend">Basketball</p>
            </div>
            <div>
              <img src="https://images.pexels.com/photos/1103829/pexels-photo-1103829.jpeg?auto=compress&cs=tinysrgb&w=500" alt="Tennis" className="rounded-lg" />
              <p className="legend">Tennis</p>
            </div>
            <div>
              <img src="https://images.pexels.com/photos/1263348/pexels-photo-1263348.jpeg?auto=compress&cs=tinysrgb&w=500" alt="Swimming" className="rounded-lg" />
              <p className="legend">Swimming</p>
            </div>
            <div>
              <img src="https://images.pexels.com/photos/114972/pexels-photo-114972.jpeg?auto=compress&cs=tinysrgb&w=500" alt="Golf" className="rounded-lg" />
              <p className="legend">Golf</p>
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Home;

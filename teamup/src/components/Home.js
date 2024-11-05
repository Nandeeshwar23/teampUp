// Home.js
import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('userId');
      const response = await fetch('https://teamup-backend-amtu.onrender.com/api/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user }),
      });

      if (response.ok) {
        const profileData = await response.json();
        setProfile(profileData);
        setError('');
      } else {
        setError('Failed to fetch profile data.');
      }
    } catch (err) {
      setError('An error occurred while fetching profile data.');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true }); // Redirect to login if not authenticated
    } else {
      fetchProfile();
    }
  }, [navigate]);

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  const handleChatClick = () => {
    navigate('/chat');
  };

  const handleLogoutClick = (e) => {
    e.preventDefault(); // Prevent default button behavior
    setShowLogoutPopup(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login'); // Redirect to login page after logout
  };

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Lionel Messi",
      content: "TeamUp helped me connect with amazing players in my area!",
      sport: "Soccer"
    },
    {
      id: 2,
      name: "LeBron James",
      content: "I love the organized events and the community spirit!",
      sport: "Basketball"
    },
    {
      id: 3,
      name: "Roger Federer",
      content: "Great way to improve skills and meet new friends!",
      sport: "Tennis"
    },
  ];

  return (
    <div>
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-white text-2xl">TeamUp</div>
          <div className="flex items-center space-x-2">
            <button onClick={handleChatClick} className="text-white mr-4">
              Let's Chat
            </button>
            <button onClick={handleLogout} className="text-white">
              Logout
            </button>
            <button onClick={handleProfileClick} className="text-white">
              <FaUserCircle size={30} />
            </button>
            {showProfile && profile && (
              <div 
                className="absolute mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg p-4"
                style={{ top: '60px', right: '20px' }}
              >
                <p><strong>Name:</strong> {profile.name}</p>
                <p><strong>Age:</strong> {profile.age}</p>
                <p><strong>Location:</strong> {profile.location}</p>
                <p><strong>Sport:</strong> {profile.sport}</p>
                <p><strong>Bio:</strong> {profile.bio}</p>
              </div>
            )}
            {error && <p className="text-red-500 ml-4">{error}</p>}
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6">Welcome to TeamUp</h1>

        <div className="max-w-4xl mx-auto mb-6">
          <Carousel 
            showThumbs={false} 
            infiniteLoop={true} 
            autoPlay={true} 
            interval={3000} 
            showStatus={false} 
            dynamicHeight={true}
          >
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

        {/* Upcoming Events Section */}
        <h2 className="text-2xl font-bold text-center mb-4">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Soccer Tournament</h3>
            <p className="text-gray-600">Date: November 10, 2024</p>
            <p className="text-gray-600">Location: Central Park</p>
            <p className="mt-2">Join us for an exciting soccer tournament! All skill levels welcome.</p>
          </div>
          <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Basketball Meetup</h3>
            <p className="text-gray-600">Date: November 15, 2024</p>
            <p className="text-gray-600">Location: City Sports Complex</p>
            <p className="mt-2">Meet other basketball enthusiasts and play some pickup games.</p>
          </div>
          <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Tennis Workshop</h3>
            <p className="text-gray-600">Date: November 20, 2024</p>
            <p className="text-gray-600">Location: Community Tennis Courts</p>
            <p className="mt-2">Learn new skills and techniques with our professional coach.</p>
          </div>
        </div>

        {/* Why Choose TeamUp Section */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-4">Why Choose TeamUp?</h2>
          <ul className="list-disc list-inside">
            <li>Connect with local sports enthusiasts.</li>
            <li>Participate in organized events and tournaments.</li>
            <li>Find and create pickup games in your area.</li>
            <li>Improve your skills with workshops and training.</li>
            <li>Enjoy a friendly and inclusive community.</li>
          </ul>
        </div>

        {/* Testimonials Section */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
  <h2 className="text-2xl font-bold text-center mb-4 mt-8">What Our Members Say</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {testimonials.map((testimonial) => (
      <div key={testimonial.id} className="border rounded-lg p-4 bg-white shadow-md">
        <h3 className="text-xl font-semibold">{testimonial.name}</h3>
        <p className="text-gray-600">{testimonial.content}</p>
        <p className="mt-2 text-gray-500 italic">- {testimonial.sport}</p>
      </div>
    ))}
  </div>
</div>

      </div>
    </div>
  );
};

export default Home;

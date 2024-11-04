import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const LandingPage = () => {
  const navigate = useNavigate();

  // Function to handle navigation based on section
  const handleNavigation = (e, path) => {
    e.preventDefault();
    const element = document.getElementById(path.substring(1)); // Get element by ID
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(path); // Redirect if no element found
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="bg-black text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">Team-Up</div>
          <ul className="flex space-x-6">
            <li><a href="#" onClick={(e) => handleNavigation(e, '/')} className="hover:text-gray-400 transition duration-300">Home</a></li>
            <li><a href="#" onClick={(e) => handleNavigation(e, '#about-section')} className="hover:text-gray-400 transition duration-300">About Us</a></li>
            <li><a href="#" onClick={(e) => handleNavigation(e, '#contact-section')} className="hover:text-gray-400 transition duration-300">Contact</a></li>
            <li><a href="#" onClick={(e) => handleNavigation(e, '/login')} className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-100 transition duration-300">Log In / Register</a></li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">Team-Up</h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-6">Where all players meet</p>
              <p className="text-gray-700 mb-8">Join our vibrant community of sports enthusiasts. Find teammates, organize games, and elevate your athletic experience with Team-Up.</p>
              <a href="#" onClick={(e) => handleNavigation(e, '/')} className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition duration-300 inline-block">Get Started</a>
            </div>
            <div className="md:w-1/2">
              <img src="https://images.pexels.com/photos/945471/pexels-photo-945471.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Basketball Placeholder" className="rounded-lg shadow-xl w-full h-auto" />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div id="about-section" className="bg-gray-100 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Why Choose Team-Up?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                <h3 className="text-xl font-semibold mb-4">Connect with Players</h3>
                <p className="text-gray-600">Find like-minded athletes in your area and form lasting connections.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                <h3 className="text-xl font-semibold mb-4">Organize Games</h3>
                <p className="text-gray-600">Easily set up matches, practices, or tournaments with our intuitive tools.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                <h3 className="text-xl font-semibold mb-4">Improve Your Skills</h3>
                <p className="text-gray-600">Learn from others, share tips, and elevate your game to the next level.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact-section" className="bg-gray-200 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Get in Touch</h2>
            <p className="text-center text-lg text-gray-600">Reach out to us for any inquiries or support.</p>
            {/* Optionally, you can add a contact form here */}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-4">Team-Up</h3>
              <p className="mb-4">Bringing athletes together, one game at a time.</p>
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition duration-300"><FaFacebook size={24} /></a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition duration-300"><FaTwitter size={24} /></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition duration-300"><FaInstagram size={24} /></a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition duration-300"><FaLinkedin size={24} /></a>
              </div>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" onClick={(e) => handleNavigation(e, '/')} className="hover:text-gray-400 transition duration-300">Home</a></li>
                <li><a href="#" onClick={(e) => handleNavigation(e, '#about-section')} className="hover:text-gray-400 transition duration-300">About Us</a></li>
                <li><a href="#" onClick={(e) => handleNavigation(e, '#contact-section')} className="hover:text-gray-400 transition duration-300">Contact</a></li>
                <li><a href="#" onClick={(e) => handleNavigation(e, '/privacy')} className="hover:text-gray-400 transition duration-300">Privacy Policy</a></li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
              <p className="mb-2">Email: info@teamup.com</p>
              <p className="mb-2">Phone: (123) 456-7890</p>
              <p>Address: Sports Street, Athleticville, AT KMIT</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center">
            <p>&copy; 2023 Team-Up. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

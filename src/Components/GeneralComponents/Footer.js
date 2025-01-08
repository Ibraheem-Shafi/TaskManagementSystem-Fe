import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">About Us</h2>
            <p>Our website provides quality content and resources to help you achieve your goals.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
            <ul>
              <li><a href="#home" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white">About</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white">Services</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
            <div>
              <a href="https://facebook.com" aria-label="Facebook" className="text-gray-400 hover:text-white mr-4">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="text-gray-400 hover:text-white mr-4">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="text-gray-400 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p>&copy; 2024 YourWebsite. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import Header from './GeneralComponents/Header';
import Footer from './GeneralComponents/Footer';

function About() {
  return (
    <>
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">About Us</h1>
        <p className="text-lg text-gray-700 mb-4">
          Welcome to MyApp! We are dedicated to delivering the best experience to our users through our innovative platform.
        </p>
        <p className="text-lg text-gray-700">
          We believe in constant improvement and value the feedback of our users.
        </p>
      </div>
      <Footer />
    </>
  );
}

export default About;

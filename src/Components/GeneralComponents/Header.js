import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-blue-500 text-white py-4">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-bold">MyApp</div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <NavLink exact to="/" activeClassName="text-yellow-300" className="hover:text-yellow-200">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" activeClassName="text-yellow-300" className="hover:text-yellow-200">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" activeClassName="text-yellow-300" className="hover:text-yellow-200">
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
        <NavLink to="/login">
          <button className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition">
            Login
          </button>
        </NavLink>
      </div>
    </header>
  );
}

export default Header;

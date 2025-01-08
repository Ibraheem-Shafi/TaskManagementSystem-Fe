import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Get the userId from localStorage when the component mounts
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);
    console.log(storedUserId)
  }, []);

  return (
    <header className="bg-blue-500 text-white py-4">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-bold">MyApp</div>
        {userId ?
          (<Link to={`/dashboard/${userId}`}>
            <button className="bg-green-500 text-white  px-6 py-2 rounded-lg hover:bg-green-600 transition">
              Dashboard
            </button>
          </Link>)
        :
          (<Link to="/login">
            <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition">
              Login
            </button>
          </Link>)
        }
        
      </div>
    </header>
  );
}

export default Header;

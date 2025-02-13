import {BrowserRouter as Router, Routes , Route } from 'react-router-dom';

import './App.css';

import PrivateRoute from './PrivateRoute';

import Home from './Components/Home';

import Signup from './Components/User/Signup';
import Login from './Components/User/Login';
import Dashboard from './Components/User/Dashboard';

function App() {
  return (
    <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            {/* <Route path="/dashboard/:userId" element={<Dashboard />} /> */}
            <Route
              path="/dashboard/:userId"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
  );
}

export default App;

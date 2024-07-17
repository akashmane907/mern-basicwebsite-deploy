import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../store/auth';
import '../index.css';


function Navbar() {
  const { isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header>
        <div className='container'>
          <div className="Logo-brand">
            <NavLink to="/">Logo</NavLink>
          </div>

          <div className="hamburger" onClick={toggleMenu}>
            &#9776;
          </div>

          <nav>
            <ul className={isOpen ? 'active' : ''}>
              <li><NavLink to="/" onClick={toggleMenu}>Home</NavLink></li>
              <li><NavLink to="/about" onClick={toggleMenu}>About</NavLink></li>
              <li><NavLink to="/service" onClick={toggleMenu}>Service</NavLink></li>
              <li><NavLink to="/contact" onClick={toggleMenu}>Contact</NavLink></li>
              {isLoggedIn ? (
               <li><NavLink to="/logout" className="logout-button" onClick={toggleMenu}>Logout</NavLink></li>
              ):(
                <>
                    <li><NavLink to="/register" onClick={toggleMenu}>Register</NavLink></li>
                    <li><NavLink to="/login" onClick={toggleMenu}>Login</NavLink></li>
                </>

              )}

            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Navbar;

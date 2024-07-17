import React from 'react';
import { Navigate, NavLink, Outlet } from 'react-router-dom';
import { FaUsers } from "react-icons/fa";
import { SiGooglemessages } from "react-icons/si";
import { GrServices } from "react-icons/gr";
import { IoMdLogOut } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import {useAuth} from "../../store/auth";




const AdminLayout = () => {

  const {user, isLoading} = useAuth();

  if(isLoading){
    return <h1>Loading...</h1>; // Display loading message while waiting for data to load.
  }
  if (!user.isAdmin) {
    
    return <Navigate to='/' />;
  }
  return (
    <>
      <header>
        <div className='container'>
          <nav>
            <ul>
            <li>
                <NavLink to="/"><FaHome /> Home</NavLink>
               </li>
              <li>
                <NavLink to="/admin/users"><FaUsers/> Users</NavLink>
              </li>    
              <li>
                <NavLink to="/admin/contacts"><SiGooglemessages /> Contacts</NavLink>
              </li>
              <li>
                <NavLink to="/admin/services"><GrServices /> Services</NavLink>
              </li>
              <li>
                <NavLink to="/admin/logout"><IoMdLogOut />
                Logout</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default AdminLayout;

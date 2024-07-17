import React, { useEffect, useState } from 'react';
import './Admin-users.css';
import { Link } from "react-router-dom";
import{ toast} from 'react-toastify';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const getAllUsersData = async () => {
    try {
      const response = await fetch(`${window.location.origin}/api/admin/users`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user information');
      }

      const data = await response.json();
      console.log('users', data);
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${window.location.origin}/api/admin/users/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        toast.error('Failed to delete user');
      }
      toast.success('User deleted successfully');

      const data = await response.json();
      console.log('delete data', data);

      // Remove deleted user from state
      setUsers((prevUsers) => prevUsers.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  return (
    <section className='admin-users-section'>
      <div className='container'>
        <h1>Admin Users Data</h1>
      </div>
      <div className='container admin-users'>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <Link to={`/admin/users/${user._id}/edit`} className="link-button">Edit</Link>
                </td>
                <td>
                  <button onClick={() => deleteUser(user._id)} className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminUsers;

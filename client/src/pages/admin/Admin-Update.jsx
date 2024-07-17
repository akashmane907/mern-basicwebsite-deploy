import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Admin-Update.css';
import{ toast} from 'react-toastify';

const AdminUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${window.location.origin}/api/admin/users/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${window.location.origin}/api/admin/users/update/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      toast.success('Updated user successfully');

      navigate('/admin/users');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <section className='admin-update-section'>
      <div className='container-admin'>
        <h1>Update User</h1>
        <form onSubmit={handleSubmit} className='admin-update-form'>
          <div className='form-group'>
            <label>Username</label>
            <input type='text' name='username' value={user.username} onChange={handleChange} required />
          </div>
          <div className='form-group'>
            <label>Email</label>
            <input type='email' name='email' value={user.email} onChange={handleChange} required />
          </div>
          <div className='form-group'>
            <label>Phone</label>
            <input type='text' name='phone' value={user.phone} onChange={handleChange} required />
          </div>
          <button type='submit' className='update-btn'>Update</button>
        </form>
      </div>
    </section>
  );
};

export default AdminUpdate;

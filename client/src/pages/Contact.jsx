import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/auth';
import './Contact.css';
import{ toast} from 'react-toastify';

function Contact() {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    message: '',
  });
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setUserData({
        username: user.username || '',
        email: user.email || '',
        message: `Hello, I'm ${user.username || ''} and I'm reaching out to you. My email is ${user.email || ''}. Please let me know if you have any questions or need further assistance.`,
      });
    }
  }, [user]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${window.location.origin}/api/form/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error('Error sending contact form');
      }
      // Clear form inputs after successful submission
      setUserData({
        username: '',
        email: '',
        message: '',
      });
      toast.success('data submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred!. Please try again.');
    }
  };

  return (
    <main>
      <div className='section-contact'>
        <div className='container grid grid-two-cols'>
          <div className='contact-image'>
            <img src='/contact.jpg' alt='contact' />
          </div>
          <div className='registration-form'>
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type='text'
                  name='username'
                  placeholder='Username'
                  id='username'
                  required
                  autoComplete='off'
                  value={userData.username}
                  onChange={handleInput}
                />
              </div>
              <div>
                <label htmlFor="email">E-mail</label>
                <input
                  type='email'
                  name='email'
                  placeholder='Email'
                  id='email'
                  required
                  autoComplete='off'
                  value={userData.email}
                  onChange={handleInput}
                />
              </div>
              <div>
                <label htmlFor="message">Message</label>
                <textarea
                  name='message'
                  placeholder='Message'
                  id='message'
                  required
                  autoComplete='off'
                  value={userData.message}
                  onChange={handleInput}
                />
              </div>
              <button type='submit' className='btn btn-submit'>Submit</button>
            </form>
          </div>
        </div>
        <div className='map-container'>
          <iframe
            title='Map'
            width='100%'
            height='250'
            frameBorder='0'
            style={{ border: 0, padding: '20px 0' }}
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7539.37810354353!2d72.82020290772938!3d19.12129246177331!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9e13ef12003%3A0x5767a74a751ccaf9!2sRajiv%20Gandhi%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1720620476928!5m2!1sen!2sin'
            allowFullScreen=''
            aria-hidden='false'
            tabIndex='0'
          ></iframe>
        </div>
      </div>
    </main>
  );
}

export default Contact;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import './Register.css';
import{ toast} from 'react-toastify';

function Register() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    phone: '',
    password: ''
  });

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${window.location.origin}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });

       const res_data = await response.json();
       console.log("res from server", res_data.extraDetails);


      if (response.ok) {


        // Store the JWT token in local storage
        storeTokenInLS(res_data.token);

        setUser({ username: '', email: '', phone: '', password: '' });
        navigate('/');

        toast.success('Registration successful');
        console.log('User data submitted:', user);
      } else {
        if (Array.isArray(res_data.extraDetails)) {
          // Display the first error in the array
          toast.error(res_data.extraDetails[0]);
        } else {
          toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
        }
      }
     } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred during registration');
    }
  };

  return (
    <>
      <section>
        <main>
          <div className='section-registration'>
            <div className='container grid grid-two-cols'>
              <div className='registration-image'>
                <img src='/register.png' alt='Registration' />
              </div>
              <div className='registration-form'>
                <h2>Register</h2>
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
                      value={user.username}
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
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">Phone</label>
                    <input
                      type='tel'
                      name='phone'
                      placeholder='Phone'
                      id='phone'
                      required
                      autoComplete='off'
                      value={user.phone}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <input
                      type='password'
                      name='password'
                      placeholder='Password'
                      id='password'
                      required
                      autoComplete='off'
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>
                  <br />
                  <button type='submit' className='btn btn-submit'>Register</button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
}

export default Register;

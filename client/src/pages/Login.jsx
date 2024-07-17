import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useAuth } from '../store/auth';
import{ toast} from 'react-toastify';

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { storeTokenInLS } = useAuth();
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${window.location.origin}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });

      if (response.ok) {
        const data = await response.json();
        storeTokenInLS(data.token);
        setUser({ email: '', password: '' });
        navigate('/');
       toast.success('logged in successfully');
        console.log('User data submitted:', user,data.token);
      } else {
        const error = await response.json();
        toast.error(error.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert(`Failed to log in: ${error.message}`);
    }
  };

  return (
    <>
      <section>
        <main>
          <div className='section-login'>
            <div className='container grid grid-two-cols'>
              <div className='login-image'>
                <img src='/login.jpg' alt='login-image' />
              </div>
              <div className='login-form'>
                <h2>Login Form</h2>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type='email'
                      name='email'
                      placeholder='email'
                      id='email'
                      required
                      autoComplete='off'
                      value={user.email}
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
                  <button type='submit'>Login</button>
                </form>
                <p>Don't have an account? <a href='/register'>Sign up</a></p>
                <p>Forgot Password? <a href='/forgot-password'>Reset</a></p>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
}

export default Login;

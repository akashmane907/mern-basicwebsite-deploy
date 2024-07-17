import React from 'react';
import { useAuth } from '../store/auth';
import './Home.css';

const Home = () => {
  const { user } = useAuth(); // Access user from auth context

  return (
    <main>
      <section className='section-hero'>
        <div className='containecolsr grid grid-two-'>
          <div className='hero-image'>
            <img src='/hero.jpg' alt='hero' />
          </div>
          <div className='hero-content'>
            <h1>Hellow! {user && user.username ? user.username : ''}, Welcome to My Website</h1>
            <p>
              This is a simple website built using React, Node.js, Express, and MongoDB. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis quo distinctio dolorum natus quia ipsa perferendis ea quibusdam, illum magni quas, harum ut optio, et totam vel modi iste sequi.
            </p>
            <div className='btn-group'>
              <a href="/contact">
                <button className='btn'>Connect Now</button>
              </a>
              <a href="/services">
                <button className='btn'>Services</button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className='section-analytics'>
        <div className='analytical-grid'>
          <div className='analytics-box'>
            <h2>50+</h2>
            <p>Registered Companies</p>
          </div>
          <div className='analytics-box'>
            <h2>10,000+</h2>
            <p>Happy Clients</p>
          </div>
          <div className='analytics-box'>
            <h2>500+</h2>
            <p>Skilled Developers</p>
          </div>
          <div className='analytics-box'>
            <h2>24/7</h2>
            <p>Expert Support</p>
          </div>
        </div>
      </section>

      <section className='section-hero'>
        <div className='container grid grid-two-cols'>
          <div className='hero-content'>
            <p>We are here to help you</p>
            <h1>Get Started Today</h1>
            <p>Lorem Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero error quis nam nostrum, corporis eligendi omnis? Numquam, aliquam sint. Laboriosam?ipsum, dolor sit amet consectetur adipisicing elit. Maiores quo, veniam pariatur dolorum consectetur totam impedit, provident deleniti rerum laboriosam, repellendus ducimus sapiente! Accusantium mollitia aspernatur beatae obcaecati dignissimos neque?</p>
            <div className='btn-group'>
              <a href="/contact">
                <button className='btn'>Connect Now</button>
              </a>
              <a href="/about">
                <button className='btn btn-alt'>Learn More</button>
              </a>
            </div>
          </div>
          <div className='hero-image1'>
            <img src='/hero1.jpg' alt='hero' />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;

import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className='section-about'>
      <div className='container'>
        <div className='grid grid-two-cols'>
          <div className='about-content'>
            <h1>About Us</h1>
            <p>We are a leading developer company committed to delivering innovative software solutions. Our team of experts specializes in various technologies to provide comprehensive services to our clients.</p>
            <h2>What We Do</h2>
            <ul>
              <li>Custom Software Development</li>
              <li>Mobile App Development</li>
              <li>Web Development</li>
              <li>Cloud Solutions</li>
              <li>IT Consulting</li>
            </ul>
            <div className='btn-group'>
              <a href="/contact">
                <button className='btn'>Contact Us</button>
              </a>
            </div>
          </div>
          <div className='about-image'>
            <img src='/about.jpg' alt='About Us' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';
import './Service.css';

function Service() {
  const { user } = useAuth();
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${window.location.origin}/api/data/service`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Ensure that data.msg is an array
        setServices(Array.isArray(data.msg) ? data.msg : []);
      } catch (error) {
        console.error('Error fetching services:', error);
        setServices([]); // Set to an empty array on error
      }
    };

    fetchServices();
  }, []);

  return (
    <section className='section-service'>
      <div className='container'>
        <h1 className='main-heading'>Service</h1>
      </div>
      <div className='card-grid'>
        {services.map((curElem, index) => {
          const { price, description, provider, service } = curElem;
          return (
            <div className='card' key={index}>
              <div className='card-img'>
                <img src='hero.jpg' alt={service} width={100} />
              </div>
              <div className='card-details'>
                <div className='grid grid-two-cols'>
                  <p>{provider}</p>
                  <p>{price}</p>
                </div>
                <h2>{service}</h2>
                <p>{description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Service;

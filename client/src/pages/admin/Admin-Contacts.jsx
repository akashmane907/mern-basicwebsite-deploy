import React, { useEffect, useState } from 'react';
import './Admin-Contacts.css';
import { toast } from 'react-toastify';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);

  const deleteContact = async (id) => {
    try {
      const response = await fetch(`${window.location.origin}/api/admin/contacts/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }

      const data = await response.json();
      console.log('Deleted contact', data);

      // Remove deleted contact from state
      setContacts((prevContacts) => prevContacts.filter(contact => contact._id !== id));
      toast.success('Contact deleted successfully');
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error('Failed to delete contact');
    }
  };

  useEffect(() => {
    const getAllContactsData = async () => {
      try {
        const response = await fetch(`${window.location.origin}/api/admin/contacts`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch contacts information');
        }

        const data = await response.json();
        console.log('contacts', data);
        setContacts(data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    getAllContactsData(); // Call the fetch function directly inside useEffect

  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <section className='admin-users-section'>
      <div className='container-contacts'>
        <h1>Admin Contacts Data</h1>
      </div>
      <div className='container admin-users'>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Message</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={index}>
                <td>{contact.username}</td>
                <td>{contact.email}</td>
                <td>{contact.message}</td>
                <td>
                  <button onClick={() => deleteContact(contact._id)} className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminContacts;

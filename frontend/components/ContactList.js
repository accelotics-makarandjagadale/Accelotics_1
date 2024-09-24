"use client"; 

import { useState, useEffect } from 'react';
import { deleteContact, fetchContacts } from '../lib/api'; 

export default function ContactList() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const loadContacts = async () => {
      const data = await fetchContacts();
      setContacts(data);
    };
    loadContacts();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      const response = await deleteContact(id);
      if (response.ok) {
        setContacts(contacts.filter(contact => contact.id !== id));  
        alert('Contact deleted successfully');
      } else {
        alert('Failed to delete contact');
      }
    }
  };

  return (
    <div>
      <h2>Contact List</h2>
      {contacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(contact => (
              <tr key={contact.id}>
                <td>{contact.first_name}</td>
                <td>{contact.last_name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone_number}</td>
                <td>{contact.message}</td>
                <td>
                  <button onClick={() => handleDelete(contact.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
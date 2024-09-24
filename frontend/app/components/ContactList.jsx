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
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>Contact List</h2>
      {contacts.length === 0 ? (
        <p style={{ color: '#777' }}>No contacts found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '2px solid #ccc', padding: '10px' }}>First Name</th>
              <th style={{ borderBottom: '2px solid #ccc', padding: '10px' }}>Last Name</th>
              <th style={{ borderBottom: '2px solid #ccc', padding: '10px' }}>Email</th>
              <th style={{ borderBottom: '2px solid #ccc', padding: '10px' }}>Phone</th>
              <th style={{ borderBottom: '2px solid #ccc', padding: '10px' }}>Message</th>
              <th style={{ borderBottom: '2px solid #ccc', padding: '10px' }}>File</th> {/* New column for files */}
              <th style={{ borderBottom: '2px solid #ccc', padding: '10px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(contact => (
              <tr key={contact.id} style={{ textAlign: 'left' }}>
                <td style={{ borderBottom: '1px solid #eee', padding: '10px' }}>{contact.first_name}</td>
                <td style={{ borderBottom: '1px solid #eee', padding: '10px' }}>{contact.last_name}</td>
                <td style={{ borderBottom: '1px solid #eee', padding: '10px' }}>{contact.email}</td>
                <td style={{ borderBottom: '1px solid #eee', padding: '10px' }}>{contact.phone_number}</td>
                <td style={{ borderBottom: '1px solid #eee', padding: '10px' }}>{contact.message}</td>
                <td style={{ borderBottom: '1px solid #eee', padding: '10px' }}>
                  {contact.file ? (
                    <a href={contact.file} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'underline' }}>
                      Download File
                    </a>
                  ) : (
                    <span style={{ color: '#777' }}>No file uploaded</span>
                  )}
                </td>
                <td style={{ borderBottom: '1px solid #eee', padding: '10px' }}>
                  <button 
                    onClick={() => handleDelete(contact.id)} 
                    style={{ 
                      backgroundColor: '#f44336', 
                      color: '#fff', 
                      border: 'none', 
                      padding: '8px 16px', 
                      cursor: 'pointer', 
                      borderRadius: '4px' 
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

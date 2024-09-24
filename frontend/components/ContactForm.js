"use client";

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8000/api/contacts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Contact saved successfully!');
        setFormData({
          first_name: '',
          middle_name: '',
          last_name: '',
          email: '',
          phone_number: '',
          message: '',
        });
      } else {
        alert('Error saving contact');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while submitting the form');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <input
        type="text"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        placeholder="First Name"
        required
        style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
      />
      <input
        type="text"
        name="middle_name"
        value={formData.middle_name}
        onChange={handleChange}
        placeholder="Middle Name"
        style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
      />
      <input
        type="text"
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
        placeholder="Last Name"
        required
        style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
        style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
      />
      <input
        type="tel"
        name="phone_number"
        value={formData.phone_number}
        onChange={handleChange}
        placeholder="Phone Number"
        required
        style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Message"
        required
        style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
      />
      <button type="submit" style={{ width: '100%', backgroundColor: '#007bff', color: 'white', padding: '10px', borderRadius: '4px', cursor: 'pointer' }}>
        Submit
      </button>
    </form>
  );
}

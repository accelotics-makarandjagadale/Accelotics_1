"use client";
import { useState } from "react";

export default function ContactForm() {
  const [experiences, setExperiences] = useState([
    { id: Date.now(), formData: getInitialFormData() }
  ]);

  function getInitialFormData() {
    return {
      first_name: "",
      middle_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      message: "",
      file_upload: null,
    };
  }

  const handleChange = (id, e) => {
    const { name, value, files } = e.target;
    setExperiences((prevExperiences) =>
      prevExperiences.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              formData: {
                ...exp.formData,
                [name]: files ? files[0] : value,
              },
            }
          : exp
      )
    );
  };

  const addExperience = () => {
    setExperiences((prevExperiences) => [
      ...prevExperiences,
      { id: Date.now(), formData: getInitialFormData() },
    ]);
  };

  const deleteExperience = (id) => {
    setExperiences((prevExperiences) =>
      prevExperiences.filter((exp) => exp.id !== id)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      experiences.forEach(async (exp) => {
        const formDataToSend = new FormData();
        for (const key in exp.formData) {
          if (exp.formData[key] !== null) {
            formDataToSend.append(key, exp.formData[key]);
          }
        }

        const res = await fetch("http://localhost:8000/create/", {
          method: "POST",
          body: formDataToSend,
        });

        const responseData = await res.json();
        console.log(responseData);

        if (res.ok) {
          alert("Contact saved successfully!");
        } else {
          alert("Error saving contact: " + (responseData.detail || "Unknown error"));
        }
      });
    } catch (err) {
      console.error(err);
      alert("An error occurred while submitting the form");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      {experiences.map((exp, index) => (
        <div key={exp.id} style={experienceStyle}>
          <div style={fieldContainer}>
            <div style={{ flex: 1 }}>
              <label>First Name</label>
              <input
                type="text"
                name="first_name"
                value={exp.formData.first_name}
                onChange={(e) => handleChange(exp.id, e)}
                style={inputStyle}
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>Middle Name</label>
              <input
                type="text"
                name="middle_name"
                value={exp.formData.middle_name}
                onChange={(e) => handleChange(exp.id, e)}
                style={inputStyle}
              />
            </div>
          </div>

          <div style={fieldContainer}>
            <div style={{ flex: 1 }}>
              <label>Last Name</label>
              <input
                type="text"
                name="last_name"
                value={exp.formData.last_name}
                onChange={(e) => handleChange(exp.id, e)}
                style={inputStyle}
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={exp.formData.email}
                onChange={(e) => handleChange(exp.id, e)}
                style={inputStyle}
                required
              />
            </div>
          </div>

          <div style={fieldContainer}>
            <div style={{ flex: 1 }}>
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone_number"
                value={exp.formData.phone_number}
                onChange={(e) => handleChange(exp.id, e)}
                style={inputStyle}
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>Message</label>
              <textarea
                name="message"
                value={exp.formData.message}
                onChange={(e) => handleChange(exp.id, e)}
                style={{ ...inputStyle, height: "80px" }}
                required
              />
            </div>
          </div>

          <div style={fieldContainer}>
            <div style={{ flex: 1 }}>
              <label>File Upload</label>
              <input
                type="file"
                name="file_upload"
                onChange={(e) => handleChange(exp.id, e)}
                style={inputStyle}
              />
            </div>
            {experiences.length > 1 && (
              <button
                type="button"
                onClick={() => deleteExperience(exp.id)}
                style={deleteButtonStyle}
              >
                Delete Experience
              </button>
            )}
          </div>
        </div>
      ))}

      <button type="button" onClick={addExperience} style={addButtonStyle}>
        Add Another Experience
      </button>

      <button type="submit" style={submitButtonStyle}>
        Submit
      </button>
    </form>
  );
}

// Styles
const formStyle = {
  maxWidth: "600px",
  margin: "auto",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  backgroundColor: "#f9f9f9",
};

const experienceStyle = {
  backgroundColor: "#f0f0f0",
  padding: "15px",
  marginBottom: "20px",
  borderRadius: "8px",
};

const fieldContainer = {
  display: "flex",
  gap: "10px",
  marginBottom: "10px",
};

const inputStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  backgroundColor: "#eaeaea",
  width: "100%",
};

const deleteButtonStyle = {
  padding: "10px",
  backgroundColor: "red",
  color: "white",
  borderRadius: "8px",
  cursor: "pointer",
};

const addButtonStyle = {
  padding: "10px",
  backgroundColor: "green",
  color: "white",
  borderRadius: "8px",
  marginBottom: "20px",
  cursor: "pointer",
  width: "100%",
};

const submitButtonStyle = {
  padding: "10px",
  backgroundColor: "#007bff",
  color: "white",
  borderRadius: "10px",
  cursor: "pointer",
  width: "100%",
};

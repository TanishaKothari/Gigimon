"use client";
import { v4 } from "uuid";
import { useEffect, useState, useRef } from "react";
import Link from 'next/link';

const JOB_OPTIONS = [
  "Tutor",
  "Plumber",
  "Carpenter",
  "Painter",
  "Electrician",
  "Mechanic",
  "Gardener",
  "Cleaner",
  "Cook",
  "Babysitter",
  "Mason",
  "Welder",
  "AC Technician",
  "Tailor",
  "Mover"
];

export default function JobsForm() {
  const [userId, setUserId] = useState(null);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let storedId = localStorage.getItem("user_id");
    if (!storedId) {
      storedId = v4();
      localStorage.setItem("user_id", storedId);
    }
    setUserId(storedId);
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const handleChange = (event) => {
    const { value, checked } = event.target;
    setSelectedJobs((prev) =>
      checked ? [...prev, value] : prev.filter((job) => job !== value)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    for (const job of selectedJobs) {
      await fetch('http://localhost:5000/insert-need', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          need_name: job,
          username: name,
          location,
          email
        })
      });
    }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
    setSelectedJobs([]);
    setDropdownOpen(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem"
    }}>

        <div style={{
        position: "absolute",
        top: "0.5rem",
        right: "1rem",
        zIndex: 20
      }}>
        <Link href="/" style={{
          color: "#2563eb",
          textDecoration: "underline",
          fontWeight: 500,
          fontSize: "1rem"
        }}>
          Home
        </Link>
      </div>

      <div style={{
        background: "#fff",
        borderRadius: "1.2rem",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
        padding: "2.5rem 2rem",
        maxWidth: "420px",
        width: "100%"
      }}>
        <h1 style={{
          textAlign: "center",
          fontWeight: 700,
          fontSize: "2rem",
          marginBottom: "1.5rem",
          color: "#2563eb",
          letterSpacing: "0.02em"
        }}>
          What service do you need?
        </h1>
        <label>
          My name is:
          <input 
          type="text" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          style={{
            border: "1px solid gray",   // gray border
            borderRadius: "6px",        // rounded corners
            marginBottom: "8px",
            marginLeft: "4px",
            padding: "6px"              // little inner padding so text isn’t squished
          }}
          required />
        </label>
        <br></br>
        <label>
          My address is:
          <input 
          type="text" 
          value={location} 
          onChange={e => setLocation(e.target.value)} 
          style={{
            border: "1px solid gray",   // gray border
            borderRadius: "6px",        // rounded corners
            marginBottom: "8px",
            marginLeft: "4px",
            padding: "6px"              // little inner padding so text isn’t squished
          }}
          required />
        </label>
        <br></br>
        <label>
          My email is:
          <input 
          type="email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          style={{
            border: "1px solid gray",   // gray border
            borderRadius: "6px",        // rounded corners
            marginBottom: "8px",
            marginLeft: "4px",
            padding: "6px"              // little inner padding so text isn’t squished
          }}
          required />
        </label>
        <br></br>
        
        <form onSubmit={handleSubmit}>
          <label style={{
            fontWeight: 500,
            fontSize: "1.1rem",
            color: "#374151",
            marginBottom: "0.7rem",
            display: "block"
          }}>
            I need a... 
          </label>
          <div style={{ position: "relative", margin: "1rem 0" }} ref={dropdownRef}>
            <div
              onClick={() => setDropdownOpen((open) => !open)}
              style={{
                border: "1.5px solid #c7d2fe",
                borderRadius: "0.7rem",
                padding: "0.7rem 1rem",
                minWidth: "220px",
                cursor: "pointer",
                background: "#f3f4f6",
                fontSize: "1rem",
                color: "#374151",
                transition: "border 0.2s",
                boxShadow: dropdownOpen ? "0 2px 8px rgba(59,130,246,0.08)" : "none"
              }}
            >
              {selectedJobs.length === 0
                ? <span style={{ color: "#9ca3af" }}>Select jobs...</span>
                : selectedJobs.join(", ")}
              <span style={{ float: "right", color: "#60a5fa" }}>▼</span>
            </div>
            {dropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  zIndex: 10,
                  background: "#fff",
                  border: "1.5px solid #c7d2fe",
                  borderRadius: "0.7rem",
                  width: "100%",
                  maxHeight: "220px",
                  overflowY: "auto",
                  marginTop: "0.2rem",
                  boxShadow: "0 4px 16px rgba(59,130,246,0.10)"
                }}
              >
                {JOB_OPTIONS.map((job) => (
                  <label key={job} style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0.5rem 1rem",
                    cursor: "pointer",
                    fontSize: "1rem",
                    color: "#374151",
                    background: selectedJobs.includes(job) ? "#dbeafe" : "transparent",
                    borderRadius: "0.5rem",
                    margin: "0.1rem 0"
                  }}>
                    <input
                      type="checkbox"
                      value={job}
                      checked={selectedJobs.includes(job)}
                      onChange={handleChange}
                      style={{
                        accentColor: "#2563eb",
                        marginRight: "0.7rem",
                        width: "1.1rem",
                        height: "1.1rem"
                      }}
                    />
                    {job}
                  </label>
                ))}
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={selectedJobs.length === 0}
            style={{
              width: "100%",
              background: selectedJobs.length === 0 ? "#93c5fd" : "linear-gradient(90deg, #38bdf8 0%, #2563eb 100%)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "1.1rem",
              padding: "0.8rem 0",
              border: "none",
              borderRadius: "0.7rem",
              boxShadow: "0 2px 8px rgba(59,130,246,0.08)",
              cursor: selectedJobs.length === 0 ? "not-allowed" : "pointer",
              marginTop: "1.2rem",
              transition: "background 0.2s"
            }}
          >
            Submit
          </button>
          {submitted && (
            <div style={{
              marginTop: "1.2rem",
              background: "#d1fae5",
              color: "#047857",
              borderRadius: "0.5rem",
              padding: "0.7rem",
              textAlign: "center",
              fontWeight: 500,
              fontSize: "1rem"
            }}>
              Needs submitted successfully! Searching for matches...
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
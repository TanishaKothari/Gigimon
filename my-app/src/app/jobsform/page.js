"use client";
import Image from "next/image";
import Link from 'next/link';
import { v4 } from "uuid";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    let storedId = localStorage.getItem("user_id");
    if (!storedId) {
      storedId = v4();
      localStorage.setItem("user_id", storedId);
    }
    setUserId(storedId);
  }, []);

  const handleChange = (event) => {
    const { value, checked } = event.target;
    setSelectedJobs((prev) =>
      checked ? [...prev, value] : prev.filter((job) => job !== value)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    for (const job of selectedJobs) {
      await fetch('http://localhost:5000/insert-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, job_name: job }),
      });
    }
  }

  return (
    <div className="">
      <h1 className="text-center">Jobs form</h1>
      <form onSubmit={handleSubmit}>
        <label>Select jobs you can do:</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", margin: "1rem 0" }}>
          {JOB_OPTIONS.map((job) => (
            <label key={job} style={{ minWidth: "120px" }}>
              <input
                type="checkbox"
                value={job}
                checked={selectedJobs.includes(job)}
                onChange={handleChange}
              />
              {job}
            </label>
          ))}
        </div>
        <button type="submit" style={{ marginTop: "1rem" }}>Submit</button>
      </form>
    </div>
  );
}
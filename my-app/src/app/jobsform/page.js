"use client";
import Image from "next/image";
import Link from 'next/link';
import { v4 } from "uuid";
import { useEffect, useState } from "react";

export default function JobsForm() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    let storedId = localStorage.getItem("user_id");
    if (!storedId) {
      storedId = v4();
      localStorage.setItem("user_id", storedId);
    }
    setUserId(storedId);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const job = event.target.elements.job.value;
    await fetch('http://localhost:5000/insert-job', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, job_name: job }),
    });
  }

  return (
    <div className="">
      <h1 className="text-center">Jobs form</h1>
      <form onSubmit={handleSubmit}>
        <textarea name="job" placeholder="Enter jobs you can do" required></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
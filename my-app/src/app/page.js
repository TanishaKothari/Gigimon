"use client"

import Image from "next/image";
import Link from 'next/link';
import { useEffect, useState } from "react";
import MapClientWrapper from "./MapClient";
import NeedCard from "./needCard";

export default function Home() {
  const [needs, setNeeds] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/get-needs")
      .then(res => res.json())
      .then(data => setNeeds(data));
  }, []);

  return (
    <div className="h-screen grid grid-rows-[auto_1fr] grid-cols-3">
      <div className="col-span-3 bg-[var(--color-primary)] h-[75px] flex relative items-center">

        <Image
        src="/gigimon.png"
        alt="Logo"
        height={100}      
        width={100}        
        style={{ width: "auto", height: "100%", padding: "5px" }}
        ></Image>
        
        <h1 className="text-white text-3xl" style={{ fontFamily: "var(--font-retro)" }}>help your community</h1>
      </div>

      <div className="col-span-2">
        <MapClientWrapper/>
      </div>
        
      <div className="col-span-1 grid grid-rows-[2fr_1fr] h-full">
        
        <div id="list" className="bg-[var(--color-quaternary)] flex flex-col gap-2 p-2 overflow-y-auto min-h-0 h-full" style={{ minHeight: 0 }}>
          {needs.map((need, idx) => (
            <NeedCard
              key={idx}
              name={need.name}
              job={`I need ${need.job}`}
              location={need.location}
              email={need.email}
            />
          ))}
          <NeedCard
          name="Samantha"
          job="I need something quickly!"
          location="101 Hell Avenue"
          email="sammy@gmail.com"> 
          </NeedCard>
          <NeedCard
          name="Samantha"
          job="I need something quickly!"
          location="101 Hell Avenue"
          email="sammy@gmail.com"> 
          </NeedCard>
          
        </div>

        <div id="buttons" className="grid grid-rows-2 bg-[var(--color-primary)] place-items-center">
          <div>
            <div className="">
              <Link href="/jobsform" className="bg-[var(--color-tertiary)] text-[var(--color-secondary)] font-bold py-2 px-6 rounded-lg border-2 border-[var(--color-secondary)] hover:bg-[var(--color-quaternary)] transition">Jobs form</Link>
            </div>
          </div>

          <div>
            <Link href="/needsform" className="bg-[var(--color-tertiary)] text-[var(--color-secondary)] font-bold py-2 px-6 rounded-lg border-2 border-[var(--color-secondary)] hover:bg-[var(--color-quaternary)] transition">Needs form</Link>
          </div>
        </div>

      </div>
      
    </div>
  );
}

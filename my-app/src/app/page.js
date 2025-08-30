import Image from "next/image";
import Link from 'next/link';

import MapClientWrapper from "./MapClient";
import NeedCard from "./needCard";

export default function Home() {
  return (
    <div className="h-screen grid grid-rows-[auto_1fr] grid-cols-3">
      <div className="col-span-3 bg-[var(--color-primary)] h-[75px] flex relative">
        
        <Image
        src="/gigimon.png"
        alt="Logo"
        height={100}      
        width={100}        
        style={{ width: "auto", height: "100%" }}
        ></Image>
        <h1 className="text-white text-3xl" style={{ fontFamily: "var(--font-retro)" }}>help your community</h1>
      </div>

      <div className="col-span-2">
        <MapClientWrapper/>
      </div>

      <div className="col-span-1 grid grid-rows-[2fr_1fr] h-full">
        <div className="bg-[var(--color-quaternary)] flex flex-col gap-2 p-2">

          <NeedCard
          name="Anne K"
          job="I need plumbing!"
          location="Baulkam St"
          email="annek@gmail.com"></NeedCard>

          <div className="w-full bg-white p-4 rounded-lg shadow">
            <p>I need tutoring!</p>
          </div>

        </div>

        <div className="grid grid-rows-2 bg-[var(--color-primary)] place-items-center">
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

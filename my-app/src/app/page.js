import Image from "next/image";
import Link from 'next/link';

import MapClientWrapper from "./MapClient";

export default function Home() {
  return (
    <div className="h-screen grid grid-rows-[auto_1fr] grid-cols-3">
      <div className="col-span-3 bg-[var(--color-primary)] h-[50px] flex">
        <h1 className="text-white text-3xl">GIGIMON</h1>
      </div>

      <div className="col-span-2 bg-amber-50">
        <MapClientWrapper/>
      </div>

      <div className="col-span-1 bg-amber-100 grid grid-rows-[2fr_1fr]">
        <div className="bg-gray-200 flex">
        </div>

        <div className="grid grid-rows-2 bg-amber-500 place-items-center">
          <div>
            <div className="">
              <Link href="/jobsform" className="bg-amber-500 text-white font-semibold py-2 px-6 rounded-lg border-2 border-amber-600 hover:bg-amber-600 transition">Jobs form</Link>
            </div>
          </div>

          <div>
            <Link href="/needsform" className="bg-amber-500 text-white font-semibold py-2 px-6 rounded-lg border-2 border-amber-600 hover:bg-amber-600 transition">Needs form</Link>
          </div>
        </div>

      </div>
      
    </div>
  );
}

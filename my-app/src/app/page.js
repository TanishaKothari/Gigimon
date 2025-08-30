import Image from "next/image";
import Link from 'next/link';


export default function Home() {
  return (
    <div className="h-screen grid grid-rows-[auto_1fr] grid-cols-3">
      <div className="col-span-3 bg-[var(--color-primary)] h-[50px] flex">
        <h1 className="text-white text-3xl">GIGIMON</h1>
      </div>

      <div className="col-span-2 bg-amber-50">
        <p>what</p>
      </div>

      <div className="col-span-1 bg-amber-100 grid grid-rows-[2fr_1fr]">
        <div className="bg-gray-200 flex"></div>

        <div className="bg-amber-500 flex"></div>


      </div>




      <p className="text-center">Home Page</p>
      <Link href="/jobsform">Jobs form</Link>
      <br></br>
      <Link href="/needsform">Needs form</Link>
    </div>
  );
}

import Image from "next/image";
import Link from 'next/link';


export default function Home() {
  return (
    <div className="">
      <p className="text-center">Home Page</p>
      <Link href="/jobsform">Jobs form</Link>
      <br></br>
      <Link href="/needsform">Needs form</Link>
    </div>
  );
}

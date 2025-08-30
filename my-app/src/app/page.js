import Image from "next/image";
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="">
      <p className="text-center">Home Page</p>
      <Link href="/jobsform">Jobs form</Link>
    </div>
  );
}

import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <p className="text-center">Home Page</p>
      <Link href="/jobsform">Jobs form</Link>
    </div>
  );
}

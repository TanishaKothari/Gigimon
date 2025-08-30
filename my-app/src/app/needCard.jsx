// components/NeedCard.jsx
export default function NeedCard({ name, job, location, email }) {
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow">
      <p className="font-semibold">{name} says:</p>
      <p>{job}</p>
      <p className="text-gray-500">{location}</p>
      <p className="text-gray-500">{email}</p>
    </div>
  );
}
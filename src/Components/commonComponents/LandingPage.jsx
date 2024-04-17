import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 mt-10">
      <h1 className="text-4xl font-bold mb-8">Welcome to PetPulse</h1>
      <p className="text-lg mb-8">Your ultimate pet care companion.</p>
      <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 m-2">
        Login
      </Link>
      <Link to="/Dashboard" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 m-2">
        Dashboard
      </Link>
    </div>
  );

}

export default LandingPage;

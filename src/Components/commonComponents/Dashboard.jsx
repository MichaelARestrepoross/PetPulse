import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ handleLogout }) => {
  const { user } = useOutletContext(); // Access user data provided by the Outlet's context
  const navigate = useNavigate();
  return (
    <div className="bg-gray-800 text-white" >
      <section className="bg-gray-800 text-white py-20 px-5 md:px-20 h-auto">
        {user && (
          <h1>
            Welcome, {user.username[0].toUpperCase()}
            {user.username.slice(1).toLowerCase()}
          </h1>
        )}
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-5">
                Welcome to PetPulse
              </h1>
              <p className="text-lg md:text-xl mb-8">
                Embark on an enriching journey with PetPulse,
                where you can nurture your pet's well-being with ease. 
                Whether you're a devoted pet parent seeking comprehensive care 
                or an animal enthusiast exploring new horizons, PetPulse offers 
                everything you need. From creating personalized reminders for 
                your pet's health and happiness to receiving live alerts, 
                PetPulse empowers you to be the best pet caregiver you can be.
              </p>
              <button
                href="#"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded inline-block"
                onClick={() => navigate("/pets")}
              >
                Get Started
              </button>
            </div>
            <div>
              <img
                src="https://res.cloudinary.com/dm8xhvx4t/image/upload/v1713284645/pet-owner-a-man-is-sitting-on-a-chair-and-hugging-a-cat-a-cat-and-a-dog-are-resting-with-their-owner-flat-illustration-vector_i7xghq.jpg"
                alt="Students Learning"
                className="w-full rounded shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
      <button onClick={handleLogout} >Logout</button>
    </div >
  );
};

export default Dashboard;

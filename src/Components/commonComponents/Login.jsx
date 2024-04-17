import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_URL;

const Login = ({ setToggleLogin }) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  function handleChange(event) {
    setUser({ ...user, [event.target.id]: event.target.value });
  }
  // This function is being used in two places. It can be extracted to a helpers.js file

  async function postFetch(user) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(user),
    };

    try {
      const res = await fetch(`${URL}/api/auth/login`, options);
      const data = await res.json();

      if (!res.ok) {
        alert("Login failed");
        setUser({ username: "", password: "" });
        throw new Error("Registration failed");
      }

      if (data.token) {

        const userData = {
          id: data.user.id,
          username: data.user.username,
          // email: data.user.email
        };

        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("token", data.token);

        await setToggleLogin(true);
        navigate("/dashboard");
      } else {
        console.log("Login Failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }

  // Login Function
  async function handleSubmit(e) {
    e.preventDefault();
    if (!user.username || !user.password) {
      alert("You must enter a username and password");
      return;
    }
    postFetch(user);
  }

  //Demo User Login Function
  async function handleDemoSignIn(e) {
    e.preventDefault();
    const user = { username: "demo", password: "password" };
    postFetch(user);
  }

  return (
    <div className="min-h-screen flex flex-col items-center mt-20">
      <h1 className="text-4xl font-bold mb-8">Login</h1>
      <button
        onClick={handleDemoSignIn}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-8"
      >
        Demo User
      </button>

      <h3 className="mb-8">You may fill in your Credentials and login below</h3>
      <form onSubmit={handleSubmit} className="mb-8">
        <label htmlFor="username" className="block mb-2">
          Username
          <input
            id="username"
            value={user.username}
            type="text"
            placeholder="Enter your username"
            autoComplete="username"
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 block w-full"
          />
        </label>

        <label htmlFor="password" className="block mb-4">
          Password
          <input
            id="password"
            value={user.password}
            type="password"
            placeholder="Enter your password"
            onChange={handleChange}
            autoComplete="current-password"
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 block w-full"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        >
          Submit
        </button>
      </form>
      <p>
        No Account? <Link to="/register" className="text-blue-500">Register</Link>
      </p>
    </div>
  );
};

export default Login;

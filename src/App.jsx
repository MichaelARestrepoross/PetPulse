import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

//Common Components
import ProtectedRoute from "./Components/commonComponents/ProtectedRoute";
import Register from "./Components/commonComponents/Login";
import Login from "./Components/commonComponents/Login";
import Dashboard from "./Components/commonComponents/Dashboard";
import NavBar from "./Components/commonComponents/NavBar";
import LandingPage from "./Components/commonComponents/LandingPage";
import AboutTheDevs from "./Components/commonComponents/AboutTheDevs";

//Components
import PetIndex from "./Components/PetIndex";
import PetForm from "./Components/PetForm";
import PetDetailed from "./Components/PetDetailed";
import ReminderIndex from "./Components/ReminderIndex";
import ReminderForm from "./Components/ReminderForm";

function App() {
  const navigate = useNavigate();
  const [toggleLogin, setToggleLogin] = useState(false);

  async function handleLogout() {
    localStorage.removeItem("token");

    await setToggleLogin(false);

    navigate("/login");
  }

  return (
    <>
      <NavBar
        handleLogout={handleLogout}
        toggleLogin={toggleLogin}
        setToggleLogin={setToggleLogin}
      />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={<Login setToggleLogin={setToggleLogin} />}
        />
        <Route
          path="/register"
          element={<Register setToggleLogin={setToggleLogin} />}
        />
          <Route
            path="/about"
            element={<AboutTheDevs handleLogout={handleLogout} />}
          />

        <Route element={<ProtectedRoute />}>
          {/* Place protected routes here */}
          <Route
            path="/dashboard"
            element={<Dashboard handleLogout={handleLogout} />}
          />
          <Route
            path="/Pets"
            element={<PetIndex handleLogout={handleLogout} />}
          />
          

        </Route>
      </Routes>
    </>
  );
}

export default App;

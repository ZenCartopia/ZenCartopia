import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Welcome from "./components/Welcome";
import Navigation from "./components/Navigation";
import SignInPage from "./components/SignInPage";
import "./index.css";
import { SiHomepage } from "react-icons/si";
import Homepage from "./components/HomePage";
import UserAuth from "./components/UserAuth";
import Register from "./components/Register";
import Shirt from "./clothings/Shirt";
import Hoodies from "./clothings/Hoodies";
import Hats from "./clothings/Hats";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        {/* Include the Navigation component */}
        <Navigation />
        <Routes>
          {/* Define the route for UserAuth */}
          {/* Root route Welcome page */}
          <Route path="/" element={<Welcome />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/userauth" element={<UserAuth />} />
          <Route path="/signinpage" element={<SignInPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/homePage" element={<Homepage />} />
          {/* All the clothing links here */}
          <Route path="/shirt" element={<Shirt />} /> {/* Shirt page */}
          <Route path="/hoodies" element={<Hoodies />} /> {/* Hoodies page */}
          <Route path="/hats" element={<Hats />} /> {/* Hats page */}
        </Routes>
      </Router>
    </>
  );
}

export default App;

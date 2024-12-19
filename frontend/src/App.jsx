import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import Welcome from "./components/Welcome";
import Navigation from "./components/Navigation";
import SignInPage from "./components/SignInPage";
import Homepage from "./components/HomePage";
import UserAuth from "./components/UserAuth";
import Register from "./components/Register";
import Shirt from "./clothings/Shirt";
import Hoodies from "./clothings/Hoodies";
import Hats from "./clothings/Hats";
import Cart from "./components/Cart";
import { CartProvider } from "./components/CartContext";
import Search from "./components/Search";

function App() {
  const [searchQuery, setSearchQuery] = useState(""); // State to track search query

  return (
    <CartProvider>
      <Router>
        <Navigation onSearch={setSearchQuery} />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/userauth" element={<UserAuth />} />
          <Route path="/signinpage" element={<SignInPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/homePage" element={<Homepage />} />
          <Route
            path="/hoodies"
            element={<Hoodies searchQuery={searchQuery} />}
          />
          <Route path="/shirt" element={<Shirt searchQuery={searchQuery} />} />
          <Route path="/hats" element={<Hats searchQuery={searchQuery} />} />
          <Route
            path="/search"
            element={<Search searchQuery={searchQuery} />}
          />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;

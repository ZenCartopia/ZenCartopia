import React from "react";
import Cards from "../components/Cards.jsx";
import "../style/Cards.css";
import hoodie1 from "../assets/hoodie1.png";
import hoodie2 from "../assets/hoodie2.png";
import hoodie3 from "../assets/hoodie3.png";
import hoodie4 from "../assets/hoodie4.png";
import hoodie5 from "../assets/hoodie5.png";

function Hoodies() {
  return (
    <div className="card-container">
      <Cards
        image={hoodie1}
        title={"Phoenix"}
        price={50}
        description={"100% cotton"}
      />
      <Cards
        image={hoodie2}
        title={"Spirit Breaker"}
        price={50}
        description={"100% cotton"}
      />
      <Cards
        image={hoodie3}
        title={"Morphling Hoodie"}
        price={50}
        description={"80% cotton and 20% polyester, Hand Wash"}
      />
      <Cards
        image={hoodie4}
        title={"Troll Warlord Hoodie"}
        price={60}
        description={"100% cotton"}
      />
      <Cards
        image={hoodie5}
        title={"Ember Spirit Hoodie"}
        price={60}
        description={"100% Organic Cotton, Machine Wash"}
      />
    </div>
  );
}

export default Hoodies;

import React from "react";
import Cards from "../components/Cards.jsx";
import "../style/Cards.css";
import shirt1 from "../assets/shirt1.png";
import shirt2 from "../assets/shirt2.png";
import shirt3 from "../assets/shirt3.png";
import shirt4 from "../assets/shirt4.png";
import shirt5 from "../assets/shirt5.png";

function Shirt() {
  return (
    <div className="card-container">
      <Cards
        image={shirt1}
        title={"Invoker"}
        price={20}
        description={"100% cotton"}
      />
      <Cards
        image={shirt2}
        title={"Civil Engineering"}
        price={20}
        description={"100% cotton"}
      />
      <Cards
        image={shirt3}
        title={"Marci"}
        price={15}
        description={"80% cotton and 20% polyester, Hand Wash"}
      />
      <Cards
        image={shirt4}
        title={"Make it rain"}
        price={25}
        description={"100% cotton"}
      />
      <Cards
        image={shirt5}
        title={"Phantom Assassin"}
        price={20}
        description={"100% Organic Cotton, Machine Wash"}
      />
    </div>
  );
}

export default Shirt;

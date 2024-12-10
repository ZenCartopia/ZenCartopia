import React from "react";
import Cards from "../components/Cards.jsx";
import "../style/Cards.css";
import hat1 from "../assets/hat1.png";
import hat2 from "../assets/hat2.png";
import hat3 from "../assets/hat3.png";

function Hats() {
  return (
    <div className="card-container">
      <Cards
        image={hat1}
        title={"Dota 2 Tidehunter"}
        price={"$45"}
        description={"Bucket Hat"}
      />
      <Cards
        image={hat2}
        title={"Oakita"}
        price={"$35"}
        description={"Baseball Hat"}
      />
      <Cards
        image={hat3}
        title={"Dota 2 Hat"}
        price={"$30"}
        description={"Baseball Cap"}
      />
    </div>
  );
}

export default Hats;

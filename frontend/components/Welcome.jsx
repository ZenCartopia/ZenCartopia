import React from "react";
import Navigation from "./Navigation";
import ImageCarousel from "./ImageCarousel";

function Welcome() {
  return (
    <div>
      <div className="flex flex-col items-center mt-6 justify-center pt-20">
        <ImageCarousel /> {/* Include the carousel */}
      </div>
    </div>
  );
}

export default Welcome;

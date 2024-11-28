import React, { useState } from "react";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpeg";
import img3 from "../assets/3.jpeg";

export default function ImageStackCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [img1, img2, img3];

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const handlePreviousSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? images.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className="relative w-full max-w-2xl h-72 overflow-hidden rounded-lg shadow-lg bg-gray-100">
      {/* Image Stack */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePreviousSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 z-20"
      >
        &#8592; {/* Left Arrow */}
      </button>
      <button
        onClick={handleNextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 z-20"
      >
        &#8594; {/* Right Arrow */}
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-gray-800" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

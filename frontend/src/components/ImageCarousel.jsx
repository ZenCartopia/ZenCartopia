import React, { useEffect, useState } from "react";
import img1 from "/public/assets/1.png";
import img2 from "/public/assets/2.png";
import img3 from "/public/assets/3.png";

export default function ImageStackCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [img1, img2, img3];

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  useEffect(() => {
    const handleWelcomePageLoad = () => {
      const lastVisitedPage = localStorage.getItem("currPage");

      if (!lastVisitedPage) {
        localStorage.setItem("lastPage", "none");
      } else if (lastVisitedPage !== "/welcome") {
        localStorage.setItem("lastPage", lastVisitedPage);
      }
      localStorage.setItem("currPage", "/welcome");
    };
    handleWelcomePageLoad();
  }, []);

  const handlePreviousSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? images.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl mx-auto p-6 gap-6">
      {/* Left Content */}
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-[80px] font-extrabold mb-4 text-gray-800 font-[cursive]">
          Welcome to ZenCartopia
        </h1>
        <p className="text-gray-600 mb-6 font-bold">
          Level Up Your Style! <hr></hr>
          Welcome to ZenCartopia, where fashion meets the gamer within. Explore
          our epic collection of game-inspired classics, trendsetting gear, and
          everyday essentials, crafted to celebrate every version of your gaming
          persona. Whether you're gearing up for victory, embracing comfort, or
          making a bold statement, you'll find something that resonates with
          your unique style and passion for the game.
        </p>
      </div>

      {/* Right Carousel */}
      <div className="relative flex-1 max-w-6xl h-80 overflow-hidden rounded-lg shadow-lg bg-gray-100">
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
    </div>
  );
}

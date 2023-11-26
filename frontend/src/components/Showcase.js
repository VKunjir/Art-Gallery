import React, { useState, useEffect } from 'react';

const Showcase = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // const handlePrevSlide = () => {
    //     setCurrentSlide((prevSlide) => (prevSlide > 0 ? prevSlide - 1 : 4));
    // };

    const handleNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide < 4 ? prevSlide + 1 : 0));
    };

    useEffect(() => {
        // Auto-scroll every 3 seconds
        const intervalId = setInterval(() => {
            handleNextSlide();
        }, 3000);

        // Clear the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array ensures the effect runs only once on mount

    return (
        <div className="carousel-container relative overflow-hidden w-[500px] h-[500px] rounded-lg m-5">
            <div className="carousel-wrapper flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(${-currentSlide * 100}%)` }}>
                <img src="https://art.thewalters.org/images/art/PS4_37.1158_PF_DD_AT23_44414-tms.jpg" alt="Slide 1" className="w-full" />
                <img src="https://art.thewalters.org/images/art/PL1_37.1089_Fnt_TR_T03IV.jpg" alt="Slide 2" className="w-full" />
                <img src="https://art.thewalters.org/images/art/PS4_37.1158_PF_DD_AT23_44414-tms.jpg" alt="Slide 3" className="w-full" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Jan_Vermeer_van_Delft_-_The_Glass_of_Wine_-_Google_Art_Project.jpg/1024px-Jan_Vermeer_van_Delft_-_The_Glass_of_Wine_-_Google_Art_Project.jpg" alt="Slide 4" className="w-full" />
                <img src="https://art.thewalters.org/images/art/PS4_37.1158_PF_DD_AT23_44414-tms.jpg" alt="Slide 5" className="w-full" />
            </div>
            {/* <button onClick={handlePrevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-300 px-2 py-1 cursor-pointer">
        Previous
      </button>
      <button onClick={handleNextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-300 px-2 py-1 cursor-pointer">
        Next
      </button> */}
        </div>
    );
};

export default Showcase;

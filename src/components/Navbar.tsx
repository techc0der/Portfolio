import { useGSAP } from '@gsap/react';
import React, { useEffect, useState, useRef, forwardRef } from 'react';
import { IoSunnyOutline } from "react-icons/io5";
import { WiMoonFull } from "react-icons/wi";
import gsap from 'gsap';

const Navbar = forwardRef((props, ref) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const sunny = useRef(null);

  // GSAP continuous spin for the sun icon
  useGSAP(() => {
    gsap.to(sunny.current, { rotation: 360, duration: 2, ease: "linear", repeat: -1 });
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

    // Example: later replace with weather API fetch
    // const getTemp = setInterval(fetchWeather, 60000);

    return () => {
      clearInterval(timer);
      // clearInterval(getTemp);
    };
  }, []);

  const textClass = "text-lg";

  return (
    <div
      ref={ref}
      className="w-full fixed flex justify-between bg-black text-white px-[5rem] py-[2rem]"
    >
      {/* Left side */}
      <div className="flex justify-center gap-6 items-center">
        <div className={textClass}>
          {currentTime.toLocaleTimeString('en-US', { hour12: true }).split(' ')[0]}
        </div>
        <IoSunnyOutline ref={sunny} className="h-6 w-6" aria-label="Sunny Icon" />
        <div className={textClass}>19 °C</div>
      </div>

      {/* Right side */}
      <div>
        <ul className="flex justify-center gap-6 items-center">
          <li><a href="#" className={textClass}>LINKEDIN</a></li>
          <li><a href="#" className={textClass}>RESUME</a></li>
          <li><a href="#" className={textClass}>EMAIL</a></li>
        </ul>
      </div>
    </div>
  );
});

export default Navbar;

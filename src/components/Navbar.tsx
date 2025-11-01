import { useGSAP } from '@gsap/react';
// FIX 1: Removed unused 'React' import
import { useEffect, useState, useRef, forwardRef } from 'react';
import { IoSunnyOutline } from "react-icons/io5";
// FIX 1: Removed unused 'WiMoonFull' import
import gsap from 'gsap';

// FIX 3: Typed forwardRef to HTMLDivElement and fixed unused 'props'
const Navbar = forwardRef<HTMLDivElement>((_props, ref) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const sunny = useRef<HTMLSpanElement>(null); // Ref is now on a span

  // GSAP continuous spin for the sun icon
  useGSAP(() => {
    // Add a check to make sure the ref is not null
    if (sunny.current) {
      gsap.to(sunny.current, { rotation: 360, duration: 2, ease: "linear", repeat: -1 });
    }
  }, { scope: sunny }); // Scoped the animation to the ref

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const textClass = "text-lg";

  return (
    <div
      ref={ref} // This ref is from forwardRef
      className="w-full fixed flex justify-between bg-black text-white px-[5rem] py-[2rem]"
    >
      {/* Left side */}
      <div className="flex justify-center gap-6 items-center">
        <div className={textClass}>
          {currentTime.toLocaleTimeString('en-US', { hour12: true }).split(' ')[0]}
        </div>
        
        {/* FIX 4: Wrapped icon in a <span> and applied the ref here */}
        <span ref={sunny} className="flex items-center justify-center">
          <IoSunnyOutline className="h-6 w-6" aria-label="Sunny Icon" />
        </span>

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
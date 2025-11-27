import { useGSAP } from '@gsap/react';
import { useEffect, useState, useRef, forwardRef } from 'react';
import { IoSunnyOutline } from "react-icons/io5";
import Navlist from '../tags/Navlist';
import gsap from 'gsap';

const Navbar = forwardRef<HTMLDivElement>((_props, ref) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const sunny = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (sunny.current) {
      gsap.to(sunny.current, { rotation: 360, duration: 2, ease: "linear", repeat: -1 });
    }
  }, { scope: sunny });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const textClass = "text-lg";

  return (
    <div
      ref={ref}
      className="w-full fixed flex justify-between bg-black text-white px-[5rem] py-[2rem]"
    >
      <div className="flex justify-center gap-6 items-center">
        <div className={textClass}>
          {currentTime.toLocaleTimeString('en-US', { hour12: true }).split(' ')[0]}
        </div>

        <span ref={sunny} className="flex items-center justify-center">
          <IoSunnyOutline className="h-6 w-6" aria-label="Sunny Icon" />
        </span>

        <div className={textClass}>19 °C</div>
      </div>

      <div>
        <ul className="flex justify-center gap-6 items-center">
          <Navlist />
        </ul>
      </div>
    </div>
  );
});

export default Navbar;
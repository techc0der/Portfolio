  import { useRef } from 'react'; // <-- Import useRef
  import './App.css';
  import gsap from 'gsap';
  import { useGSAP } from '@gsap/react';
  import Navbar from './components/Navbar';
  import HeroSection from './components/HeroSection';

import About from './components/About';
import ProjectCard from './components/ProjectCard';
import Projects from './components/Projects';

  function App() {
    const navRef = useRef(null);
      useGSAP(() => {
        if (!navRef.current) return;
        gsap.to(navRef.current,
          { y: -100,
            opacity: 0,
            scrollTrigger: {
              trigger: navRef.current,
              scroller: "body",
              start: "top 0%",
              end: "top -20%",
              scrub: 1,
            }
          },
          );
      }, []);
    return (
      <div className="App w-full relative">
        <Navbar ref={navRef} />
        <HeroSection />
        <Projects/>
      </div>
    );
  }

  export default App;
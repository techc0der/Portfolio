import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// 1. Register GSAP Plugin
gsap.registerPlugin(ScrollToPlugin);

const Navlist: React.FC = () => {
    const containerRef = useRef<HTMLUListElement>(null);
    const navItems = ["HOME", "RESUME", "PROJECTS", "CONTACT"];

    const { contextSafe } = useGSAP({ scope: containerRef });

    // --- HOVER ANIMATIONS ---
    const handleMouseEnter = contextSafe((e: React.MouseEvent<HTMLAnchorElement>) => {
        const target = e.currentTarget;
        gsap.to(target, {
            textShadow: "0 0 20px #00ff00, 0 0 40px #00ff00",
            color: '#00ff00',
            duration: 0.3,
            ease: "power2.out"
        });
    });

    const handleMouseLeave = contextSafe((e: React.MouseEvent<HTMLAnchorElement>) => {
        const target = e.currentTarget;
        gsap.to(target, {
            color: "#ffffff",
            textShadow: "0 0 0px transparent",
            duration: 0.5,
            ease: "power2.out",
            overwrite: true
        });
    });

    // --- SCROLL LOGIC ---
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault(); // Stop instant jump
        gsap.to(window, {
            duration: 1,
            scrollTo: { y: targetId, offsetY: 80 }, // offsetY handles sticky navs
            ease: "power3.inOut"
        });
    };

    return (
        <ul
            ref={containerRef}
            className="flex gap-8 list-none bg-black items-start"
        >
            {navItems.map((item) => {
                const isResume = item === "RESUME";
                const targetId = `#${item.toLowerCase()}`;
                
                // Ensure 'resume.pdf' is in your /public folder
                const resumeLink = "/Sandip_Suthar_CV.pdf"; 

                return (
                    <li key={item}>
                        <a
                            href={isResume ? resumeLink : targetId}
                            
                            // --- RESUME SPECIFIC LOGIC ---
                            // Opens in new tab
                            target={isResume ? "_blank" : "_self"} 
                            // Security best practice for _blank
                            rel={isResume ? "noopener noreferrer" : undefined} 
                            // Forces download with this specific filename
                            download={isResume ? "Sandip_Suthar_CV.pdf" : undefined} 
                            // -----------------------------

                            className="block text-white text-md font-bold uppercase tracking-wider cursor-pointer select-none"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            
                            // Only run smooth scroll if it is NOT the resume
                            onClick={(e) => {
                                if (!isResume) {
                                    handleScroll(e, targetId);
                                }
                            }}
                        >
                            {item}
                        </a>
                    </li>
                );
            })}
        </ul>
    );
};

export default Navlist;
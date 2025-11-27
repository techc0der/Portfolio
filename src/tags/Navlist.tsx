import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Navlist: React.FC = () => {
    const containerRef = useRef<HTMLUListElement>(null);
    const navItems = ["HOME", "RESUME", "PROJECTS", "CONTACT"];

    // 1. Setup GSAP Context
    const { contextSafe } = useGSAP({ scope: containerRef });

    // 2. Define the Hover Enter (Start Flicker)
    const handleMouseEnter = contextSafe((e: React.MouseEvent<HTMLAnchorElement>) => {
        const target = e.currentTarget;

        // Animate Color
        gsap.to(target, {
            textShadow: "0 0 20px #00ff00, 0 0 40px #00ff00",
            color: '#00ff00',
            duration: 0.3,
            ease: "power2.out"
        });

        

        // Optional: If you kept the ::before layer, you would target it here too.
        // For simplicity, we are applying the effect directly to the text.
    });

    // 3. Define the Leave Event (Smooth Remove)
    const handleMouseLeave = contextSafe((e: React.MouseEvent<HTMLAnchorElement>) => {
        const target = e.currentTarget;

        // overwrite: true is CRITICAL. It stops the infinite flicker immediately
        // and starts this new animation from the current value.
        gsap.to(target, {
            color: "#ffffff", // Back to white (or your default color)
            textShadow: "0 0 0px transparent", // Smoothly collapse shadow
            duration: 0.5,
            ease: "power2.out",
            overwrite: true
        });
    });

    return (
        <ul
            ref={containerRef}
            className="flex  gap-8 list-none  bg-black items-start"
        >
            {navItems.map((item) => (
                <li key={item}>
                    <a
                        href={`#${item.toLowerCase()}`}
                        // Remove CSS hover classes, let GSAP handle it
                        className="block text-white text-md font-bold uppercase tracking-wider cursor-pointer select-none"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        {item}
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default Navlist;
import { useRef } from 'react';
import ProjectCard from './ProjectCard';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Move static data outside component to prevent re-creation on every render
const PROJECT_DATA = [
    {
        title: "Luxe Furniture Store",
        description: "A comprehensive furniture e-commerce platform.",
        image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=800&q=80",
        tags: ['MERN', 'Redux', 'Stripe', 'Tailwind'],
        repoLink: "https://github.com/techc0der/OnlineShoppingWebsite-Mern-Stack-",
    },
    {
        title: "Pro Task Manager",
        description: "Kanban-style project management tool.",
        image: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&w=800&q=80",
        tags: ['MERN', 'Socket.io', 'DnD Kit', 'Zustand'],
        repoLink: "https://github.com/techc0der/Task-Manager-MERN-Stack",
    },
    {
        title: "Developer Portfolio",
        description: "Interactive portfolio with 3D elements.",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
        tags: ['MERN', 'GSAP', 'Three.js', 'Framer'],
        repoLink: "#",
    }
];

const Projects = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                // "top top" means "When top of section hits top of viewport"
                // This prevents the section from pinning too early (under the nav)
                start: "top 40%", 
                end: "top top", // Increased scroll distance for smoother playback
                scrub: true,
                pin: true,
                // anticipatePin helps prevent a tiny "jump" when pinning starts
                anticipatePin: 1, 
            }
        });

        tl.from(headerRef.current, {
            y: 50, // Reduced movement slightly for cleaner look
            opacity: 0,
            scale: 0.8, // 0.4 might be too small to read initially
            ease: "power2.out",
            duration: 1
        })
        .to(headerRef.current, {
            y: -20,
            scale: 1,
            opacity: 1,
            ease: "power2.out",
            delay: 0.8,
            duration: 0.5
        })
        .from(".project-card", {
            y: 100,
            opacity: 0,
            scale: 0.9,
            duration: 1,
            stagger: 0.3,
            ease: "power2.out"
        }, "-=0.1"); // Overlap slightly earlier for better flow

    }, { scope: containerRef });

    return (
        <section 
            id='projects' 
            ref={containerRef} 
            // removed min-h-screen, let content define height + padding
            className="bg-black py-20 min-h-screen w-full relative"
        >
            <h1
                className='text-6xl font-bold text-white mb-12 text-center'
                ref={headerRef}
            >
                Projects
            </h1>

            <div className='w-full flex flex-wrap gap-10 justify-center items-center px-10'>
                {PROJECT_DATA.map((project, index) => (
                    <div key={index} className="project-card">
                        <ProjectCard {...project} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
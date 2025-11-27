import  { useRef } from 'react';
import ProjectCard from './ProjectCard';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
    title: string;
    description: string;
    image: string;
    tags: string[];
    repoLink: string;
}

const Projects = () => {

    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLHeadingElement>(null);

    const projectData: Project[] = [
{
            title: "Luxe Furniture Store",
            description: "A comprehensive furniture e-commerce platform. Features user auth, product filtering, a shopping cart with persistent state, and Stripe payment integration.",
            image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=800&q=80",
            tags: ['MERN', 'Redux', 'Stripe', 'Tailwind'],
     
            repoLink: "https://github.com/techc0der/OnlineShoppingWebsite-Mern-Stack-",
        },
        {
            title: "Pro Task Manager",
            description: "A collaborative Kanban-style project management tool. Supports drag-and-drop tasks, real-time updates via Socket.io, and team workspaces.",
            image: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&w=800&q=80",
            tags: ['MERN', 'Socket.io', 'DnD Kit', 'Zustand'],
            repoLink: "https://github.com/techc0der/Task-Manager-MERN-Stack",
        },
        {
            title: "Developer Portfolio",
            description: "A highly interactive portfolio website showcasing projects and skills. Built with advanced animations and 3D elements to demonstrate frontend mastery.",
            image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
            tags: ['MERN', 'GSAP', 'Three.js', 'Framer'],
            repoLink: "#",
        }
    ];

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current, 
                start: "top 10%", 
                end: "+=1000", 
                scrub: 1, 
                pin: true, 
            }
        });


        tl.from(headerRef.current, {
            y: 100,
            opacity: 0,
            scale: 0.4,
            ease: "power2.out",
            duration: 1 
        })
      
        .to(headerRef.current, {
            y: -20, 
            scale: 1,
            opacity: 1,
            ease: "power2.out",
            duration: 0.5
        })
        .from(".project-card", {
            y: 100,
            opacity: 0,
            scale: 0.9,
            duration: 1,
            stagger: 0.3,
            ease: "power2.out"
        }, "-=0.2"); 

    }, { scope: containerRef }); 

    return (
        <div ref={containerRef} className="bg-[#000000] py-20 min-h-screen  overflow-hidden">
            
            <h1 
                className='text-6xl font-bold text-white mb-12 text-center' 
                ref={headerRef}
            >
                Projects
            </h1>
            
            <div className='w-full flex flex-wrap gap-10 justify-center items-center px-10'>
                {projectData.map((project, index) => (
                    <div key={index} className="project-card">
                        <ProjectCard {...project} />
                    </div>
                ))}
            </div>
            
        </div>
    );
};

export default Projects;
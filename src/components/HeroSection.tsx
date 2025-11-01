import React, { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MyArrowSvg from '../SVG/MyArrowSvg'; // Assuming this is your custom SVG component
import Lenis from 'lenis';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
    // --- Refs and State ---
    const heroRef = useRef(null);
    const headerRef = useRef(null);
    const textRef = useRef(null);
    const videoHeaderRef = useRef(null);
    const mernHeaderRef = useRef(null);
    const rupeeRef1 = useRef(null);
    const rupeeRef2 = useRef(null);
    const aboutMernRef = useRef(null);
    const arrowRef = useRef(null);
    const cursorRef = useRef(null);
    const scrollBtnRef = useRef(null);
    const cursorTextRef = useRef(null);
    const cursorEyeRef = useRef(null);
    const lenisRef = useRef(null);

    // Timelines
    const videoTimeline = useRef();
    const mernTimeline = useRef();
    const rupeeTimeline = useRef();
    const cursorTextTimeline = useRef();

    // ✅ Refactored State: Single state for cursor mode
    const [cursorState, setCursorState] = useState('default'); // 'default', 'mern', 'video'

    // ✅ Refactored State: Declarative text for animation
    const [introText] = useState(
        "Hi, I’m Sandip Suthar, a passionate full-stack developer with expertise in the MERN stack and Java backend development. I specialize in building scalable, efficient, and user-friendly web applications that solve real-world problems and deliver exceptional digital experiences."
    );

    // --- Lenis Smooth Scroll Setup ---
    useEffect(() => {
        const lenis = new Lenis();
        lenisRef.current = lenis;

        // ✅ Simplified RAF loop using GSAP's ticker for perfect sync
        const update = (time) => {
            lenis.raf(time * 1000);
        }

        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);

        // Cleanup on component unmount
        return () => {
            gsap.ticker.remove(update);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    // --- Custom Cursor Movement ---
    useEffect(() => {
        const moveCursor = (e) => {
            gsap.to(cursorRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3,
                ease: 'power2.out'
            });
        };
        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);

    // --- Cursor State Animations ---
    useGSAP(() => {

        switch (cursorState) {
            case 'mern':
                gsap.to(cursorRef.current, {
                    // ... mern cursor styles (height, width, etc.)
                    height: 45,
                    width: 160,
                    borderRadius: '29px',
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    border: '2px solid #000',
                    filter: 'blur(0px)',
                    backdropFilter: 'blur(0px)',
                    duration: 0.5,
                    ease: 'power2.out',
                });
                break;

            case 'video':
                gsap.to(cursorRef.current, {
                    // ... video cursor styles
                    scale: 3,
                    width: '1.75rem',
                    height: '1.75rem',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 0, 0.5)',
                    filter: 'blur(0px)',
                    backdropFilter: 'blur(0px)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
                break;

            default: // 'default' state
                gsap.to(cursorRef.current, {
                    // ... default cursor styles
                    delay: 0.1,
                    scale: 1,
                    width: '1.75rem',
                    height: '1.75rem',
                    backgroundColor: 'rgba(255, 255, 255)',
                    backdropFilter: 'blur(4px)',
                    filter: 'blur(2px)',
                    borderRadius: '50%',
                    border: 'none',
                    duration: 0.3,
                    ease: 'power2.out'
                });
                break;
        }

    }, [cursorState]);

    // --- Event Handlers ---
    const handleVideoEnter = () => {
        videoTimeline.current.play();
        setCursorState('video');
    };

    const handleVideoLeave = () => {
        videoTimeline.current.reverse();
        setCursorState('default');
    };

    const handleMernLeave = () => {
        mernTimeline.current.reverse();
        gsap.to([cursorTextRef.current, cursorEyeRef.current], {
            opacity: 0,
            duration: 0.1 ,
            ease: 'power2.out',
            overwrite: 'auto' // This is the key!
        });
        setCursorState('default');
    };

    const handleMernEnter = () => {
        mernTimeline.current.play();
        gsap.to([cursorTextRef.current, cursorEyeRef.current], {
            opacity: 1,
            delay: 0.3,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto' // This is the key!
        });
        setCursorState('mern');
    }; 

    const handleRupeeEnter = () => {
        if (rupeeTimeline.current) {
            rupeeTimeline.current.play();
        }
    };

    const handleRupeeLeave = () => {
        if (rupeeTimeline.current) {
            rupeeTimeline.current.reverse();
        }
    };

    const handleScrollDown = () => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo('#next-section', {
                duration: 1.5,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
        }
    };

    // --- Main GSAP Animations ---
    useGSAP(() => {
        // Paused Timelines
        videoTimeline.current = gsap.timeline({ paused: true })
            .to(videoHeaderRef.current, { borderRadius: 0, filter: 'blur(2px)', duration: 0.2, ease: 'power2.inOut' })
            .to('.frame-h', { width: '1.5rem', duration: 0.2, ease: 'power2.inOut' }, 0)
            .to('.frame-v', { height: '1.5rem', duration: 0.2, ease: 'power2.inOut' }, 0);

        mernTimeline.current = gsap.timeline({ paused: true })
            .to(mernHeaderRef.current, { filter: 'blur(10px)', backdropFilter: 'blur(30px)', duration: 0.27, ease: 'power2.out', background: 'rgba(255, 255, 0, 0.5)' })
            .to(aboutMernRef.current, { opacity: 1, x: 50, duration: 0.27, ease: 'power2.out' }, "<")
            .to(arrowRef.current, { opacity: 1, y: 20, duration: 0.27, ease: 'power2.out' }, "<")
            .to('.frame1-h', { width: '1.5rem', duration: 0.27, ease: 'power2.inOut' }, 0)
            .to('.frame1-v', { height: '1.5rem', duration: 0.27, ease: 'power2.inOut' }, 0);

        rupeeTimeline.current = gsap.timeline({ paused: true })
            .to([rupeeRef1.current, rupeeRef2.current], { opacity: 1, duration: 0 })
            .to(rupeeRef1.current, { x: 70, opacity: 1, duration: 0.35, ease: 'power2.inOut' }, "<")
            .to(rupeeRef2.current, { x: 70, opacity: 1, duration: 0.35, ease: 'power2.inOut' }, "<");

        // Text animation logic is now declarative, so we just select the spans
        const spans = gsap.utils.toArray(textRef.current.querySelectorAll('span'));
        
        // ✅ Initialize the cursor text timeline here
        cursorTextTimeline.current = gsap.timeline({ paused: true })
            .to([cursorTextRef.current, cursorEyeRef.current], {
                opacity: 1,
                duration: 0.3, // A nice, quick fade
                ease: 'power2.out'
            });

        // ScrollTrigger Timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: heroRef.current,
                start: "end 25%",
                end: "+=170%",
                pin: true,
                scrub: 1.5,
            }
        });
        
        tl.to(headerRef.current, { scale: 0.8, opacity: 0.5, duration: 1 })
            .to(headerRef.current, { y: -300, opacity: 0, duration: 2 })
            .to(headerRef.current, { y: -600, duration: 0 })
            .to(scrollBtnRef.current, { y: -100, opacity: 0, duration: 1.5 }, "<")
            .set(spans, { fontFamily: 'Playpen Sans, cursive' }, "<")
            .from(spans, { opacity: 0, stagger: 0.09, duration: 2 }, "<")
            .to(arrowRef.current, { y: 200, opacity: 0, duration: 2 }, "<")
            .to(textRef.current, { opacity: 0, duration: 3, scale: 0.8 });

    }, { scope: heroRef }); // ✅ Scoping animations to the component

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed flex justify-center items-center gap-1 px-2 top-0 left-0 w-7 h-7 bg-white rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-50"
            >
                <img src="/image/eyes.png" className='h-5' alt="" ref={cursorEyeRef} />
                <span ref={cursorTextRef} className="text-black text-md font-bold">
                    See My Work
                </span>
            </div>

            <div className="flex flex-col h-screen justify-center items-center gap-5 text-white bg-black overflow-hidden">
                <div className='relative flex flex-col items-center gap-10' ref={heroRef}>
                    <div className='flex flex-col items-center pt-10' ref={headerRef}>
                        <h1
                            ref={mernHeaderRef}
                            onMouseEnter={handleMernEnter}
                            onMouseLeave={handleMernLeave}
                            className='header text-9xl font-extrabold cursor-pointer'
                        >
                            MERN
                        </h1>
                        <span ref={aboutMernRef} className='aboutMern absolute -top-20 -left-20 opacity-0 w-[360px]'>
                            <h1 className='leading-5 text-white text-md p-2 flex'>
                                The MERN stack is a popular technology toolkit for building full-stack web applications, consisting of MongoDB, Express.js, React, and Node.js. It enables developers to create seamless, data-driven experiences with a consistent JavaScript-based environment.
                            </h1>
                            <span className="frame1-h absolute -right-2 -top-2 h-0.5 w-0 bg-yellow-300"></span>
                            <span className="frame1-v absolute -right-2 -top-2 w-0.5 h-0 bg-yellow-300"></span>
                            <span className="frame1-h absolute -left-2 -bottom-2 h-0.5 w-0 bg-yellow-300"></span>
                            <span className="frame1-v absolute -left-2 -bottom-2 w-0.5 h-0 bg-yellow-300"></span>
                        </span>
                        <span ref={arrowRef} className='absolute -top-32 left-86 opacity-0 w-[200px]'>
                            <MyArrowSvg size={'150'} />
                        </span>
                        <h1 className='header text-[130px] font-extrabold flex items-center'>
                            DEVEL
                            <div
                                className='relative inline-block h-[120px] w-[240px] mt-2 mx-4'
                                onMouseEnter={handleVideoEnter}
                                onMouseLeave={handleVideoLeave}
                            >
                                <div className='h-full w-full overflow-hidden'>
                                    <video
                                        src="/video/headerVideo.mp4"
                                        autoPlay muted loop playsInline
                                        className="w-full h-full object-cover object-left-top rounded-4xl"
                                        ref={videoHeaderRef}
                                    ></video>
                                </div>
                                <span className="frame-h absolute -left-2 -top-2 h-0.5 w-0 bg-yellow-300"></span>
                                <span className="frame-v absolute -right-2 -top-2 w-0.5 h-0 bg-yellow-300"></span>
                                <span className="frame-h absolute -left-2 -bottom-2 h-0.5 w-0 bg-yellow-300"></span>
                                <span className="frame-v absolute -right-2 -bottom-2 w-0.5 h-0 bg-yellow-300"></span>
                                <span className="frame-h absolute -right-2 -top-2 h-0.5 w-0 bg-yellow-300"></span>
                                <span className="frame-v absolute -left-2 -top-2 w-0.5 h-0 bg-yellow-300"></span>
                                <span className="frame-h absolute -right-2 -bottom-2 h-0.5 w-0 bg-yellow-300"></span>
                                <span className="frame-v absolute -left-2 -bottom-2 w-0.5 h-0 bg-yellow-300"></span>
                                {/* ... other frame spans ... */}
                            </div>
                            PE
                            <div className='relative'>
                                <div className='absolute h-2 w-5 top-6 left-3 bg-amber-50 opacity-0' ref={rupeeRef1}></div>
                                <div className='absolute h-2 w-5 top-10.5 left-2 bg-amber-50 opacity-0' ref={rupeeRef2}></div>
                                <img src='/image/rupee_image.png' ref={rupeeTimeline} onMouseEnter={handleRupeeEnter}
                                    onMouseLeave={handleRupeeLeave} className='h-[150px] w-[120px] ml-3 mt-2' alt='Rupee icon' />
                            </div>
                        </h1>
                    </div>
                    {/* ✅ DECLARATIVE TEXT RENDERING */}
                    <p className='absolute text-4xl top-[20%] text-center font-light text-neutral-300 -z-10 leading-14 font-playpen' ref={textRef}>
                        {introText.split(' ').map((char, index) => (
                            <span key={index} className="inline-block">
                                {char === ' ' ? '\u00A0' : `${char}\u00A0`}
                            </span>
                        ))}
                    </p>
                </div>

                <div
                    ref={scrollBtnRef}
                    onClick={handleScrollDown}
                    className="absolute bottom-10 flex flex-col items-center gap-2 cursor-pointer"
                >
                    <span className="text-sm tracking-widest">SCROLL</span>
                    <div className="w-0.5 h-8 bg-white animate-bounce"></div>
                </div>
            </div>

            <div id="next-section" className="h-screen w-full bg-black flex justify-center items-center">
                {/* Content for the next section */}
            </div>
        </>
    );
}

export default HeroSection;
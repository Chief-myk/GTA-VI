import React, { useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { FaArrowDown } from "react-icons/fa";

const App = () => {
  const [showContent, setShowContent] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.to('.vimaskgroup', {
      rotate: 10,
      duration: 2,
      ease: 'power2.inOut',
      transformOrigin: 'center center',
    }).to('.vimaskgroup', {
      scale: 10,
      duration: 2,
      opacity: 0,
      delay: -1.8,
      ease: 'Expo.easeInOut',
      transformOrigin: 'center center',
      onComplete: () => {
        document.querySelector('.svg').style.display = 'none';
        setShowContent(true);
      }
    });

    if (showContent) {
      gsap.fromTo("#girl",
        { y: 5000, opacity: 0 },
        {
          y: 400,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out'
        }
      );

      // Add subtle animations for text
      gsap.fromTo(".text h1",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          delay: 0.5,
          ease: 'back.out'
        }
      );

      // Scroll down button animation
      gsap.fromTo(".scroll-down",
        { y: -10 },
        {
          y: 10,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        }
      );
      
      // Initial animations for content elements
      gsap.to('.content', {
        duration: 2,
        delay: -0.5,
        scale: 1,
        rotate: 0,
        ease: 'power2.inOut',
      });
      
      gsap.to('#bg', {
        duration: 2,
        delay: -0.8,
        scale: 1.3,
        rotate: 0,
        ease: 'power2.inOut',
      });
      
      gsap.to('#sky', {
        duration: 2,
        delay: -1.2,
        scale: 1.2,
        rotate: 0,
        ease: 'power2.inOut',
      });
      
      gsap.to('#text', {
        duration: 2,
        delay: -1.2,
        scale: 1,
        rotate: 0,
        ease: 'power2.inOut',
      });
    }
  }, [showContent]);

  // Mouse movement effect
  useGSAP(() => {
    if (showContent) {
      const main = document.querySelector('.content');
      const handleMouseMove = (e) => {
        const x = ((e.clientX / window.innerWidth) - 0.5) * 30;
        gsap.to('#text', {
          x: `${x * 0.5}%`,
          duration: 0.5,
          ease: 'power1.out'
        });
        gsap.to('#sky', {
          x: `${x * 0.5}%`,
          duration: 0.5,
          ease: 'power1.out'
        });
        gsap.to('#bg', {
          x: `${x * 0.5}%`,
          duration: 0.5,
          ease: 'power1.out'
        });
        gsap.to('#girl', {
          x: `${x * 0.5}%`,
          duration: 0.5,
          ease: 'power1.out'
        });
      };

      main?.addEventListener('mousemove', handleMouseMove);

      return () => {
        main?.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [showContent]);

  return (
    <>
      <div className='svg w-full h-screen flex items-center justify-center left-0 top-0 bg-black fixed z-[100] overflow-hidden'>
        <svg viewBox='0 0 800 600' preserveAspectRatio='xMidYMid slice'>
          <defs>
            <mask id='vimask'>
              <rect width='100%' height='100%' fill='black' />
              <g className='vimaskgroup'>
                <text x="50%" y='50%' textAnchor='middle' dominantBaseline='central' fontSize='200' fill='white' fontFamily='Arial, Black'>
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image width="100%" height="100%" href='/bg.png' preserveAspectRatio='xMidYMid slice' mask='url(#vimask)' />
        </svg>
      </div>

      {showContent && (
        <div className='content overflow-hidden rotate-[-10deg] scale-[1.7] w-full min-h-screen bg-black text-white overflow-x-hidden'>
          {/* Navbar with scroll effect */}
          <div className={`fixed w-full py-5 px-3 md:py-5 md:px-10 flex items-center z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-sm' : ''}`}>
            <div className="logo flex gap-2 items-center cursor-pointer hover:scale-105 transition-transform duration-200">
              <div className="lines flex flex-col gap-1">
                <div className="line w-10 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                <div className="line w-7 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                <div className="line w-4 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              </div>
              <h3 className="text-4xl leading-none bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
                RockStar
              </h3>
            </div>
          </div>

          {/* Hero section */}
          <section className='w-full h-screen images relative overflow-hidden flex justify-center items-end'>
            <img id='sky' src="./sky.png" className='scale-[1.6] rotate-[-15deg] absolute w-full h-full object-cover top-0 left-0' alt="sky background" />
            <img id='bg' src="./bg.png" className='scale-[1.8] absolute rotate-[-20deg] w-full h-full object-cover top-0 left-0' alt="main background" />
            <img
              src='./girlbg.png'
              id='girl'
              className='relative sm:bottom-[10%] md:bottom-[-10%] bottom-[30%] scale-[1] sm:scale-[0.5] md:scale-[0.65] opacity-0 z-5 hover:scale-[1.05] transition-transform duration-500 cursor-pointer'
              alt="character"
            />

            <div id="text" className='absolute rotate-[-10deg] scale-[1.7] text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white text font-bold top-40 sm:top-20 left-1/2 leading-none -translate-x-1/2 z-4 text-center'>
              <h1 className='-ml-0 sm:-ml-10 md:-ml-100'>grand</h1>
              <h1 className='ml-0 sm:ml-10 md:ml-100'>theft</h1>
              <h1 className='-ml-0 sm:-ml-10 md:-ml-100'>auto</h1>
            </div>
          </section>

          {/* Scroll down indicator */}
          <div className='fixed bottombar bottom-0 left-0 w-full py-2 px-3 md:px-10 z-40 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between'>
            <div className='flex items-center gap-4 scroll-down cursor-pointer hover:text-pink-400 transition-colors duration-200'>
              <FaArrowDown className="animate-bounce" />
              <h3 className='text-xl md:text-2xl font-bold font-[Helvetica_Now_Display] text-white'>
                Scroll Down
              </h3>
            </div>
            <img
              className="h-[40px] md:h-[50px] hover:scale-110 transition-transform duration-200"
              src="./ps5.png"
              alt="PlayStation 5 logo"
            />
          </div>

          {/* Content section */}
          <div className='w-full min-h-screen flex flex-col lg:flex-row px-5 md:px-5 items-center justify-center bg-black text-white '>
            <div className='left-side w-full lg:w-1/2  flex items-center justify-center'>
              <img className='' src="./imag.png" alt="Game content" />
            </div>
            <div className='right-side w-full lg:w-1/2 h-full lg:pl-10 mb-24 lg:mb-0'>
              <h3 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-4'>Still Running</h3>
              <h3 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6'>Not Hunting</h3>
              <p className='text-base md:text-lg mt-5 font-[roboto] ]'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores dolorum, consequatur debitis obcaecati odio nobis eveniet. Illum nihil facilis consequuntur sapiente dolorum quos maiores nemo harum nesciunt eveniet facere, quasi, eligendi vero consectetur quaerat officia.
              </p>
              <p className='text-base md:text-lg mt-5 font-[roboto]'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores dolorum, consequatur debitis obcaecati odio nobis eveniet. Illum nihil facilis consequuntur sapiente dolorum quos maiores nemo harum nesciunt eveniet facere, quasi, eligendi vero consectetur quaerat officia.
              </p>
              <button className='mt-10 font-[sans-serif] hover:scale-105 transition-transform duration-200'>
                <a href="https://www.rockstargames.com/games/V" target="_blank" rel="noopener noreferrer" className='px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg inline-block'>
                  Visit Rockstar Games
                </a>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
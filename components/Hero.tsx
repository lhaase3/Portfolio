'use client';

import MagicButton from "./ui/MagicButton"
import { Spotlight } from "./ui/spotlight"
import { TextGenerateEffect } from "./ui/TextGenerateEffect"
import { FaLocationArrow } from "react-icons/fa";
import { TypewriterEffect, TypewriterEffectSmooth } from "./ui/TypeWriter";
import { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import Link from "next/link";
// import resume from "@/components/resume";

// const Hero = () => {
//   return (
//     <div className='pb-20 pt-36'>
//         <div>
//             <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill="white"/>
//             <Spotlight className="top-10 left-full h-[80vh] x-[50vw]" fill="purple"/>
//             <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="blue"/>
//         </div>

//         <div className="h-screen w-full dark:bg-black-100 bg-white  dark:bg-grid-white/[0.03] bg-grid-black/[0.2] flex items-center justify-center absolute top-0 left-0">
//             {/* Radial gradient for the container to give a faded look */}
//             <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"/>
//       </div>

//       <div className="flex justify-center relative my-20 z-10">
//         <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
//           {/* <h2 className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
//             Dynamic Web magic with Next.js
//           </h2> */}

//           <TextGenerateEffect 
//             className="text-center text-[40px] md:text-5xl lg:text-6xl"
//             words="Hello, I am Logan" 
            
//           />
//           <p className="text-center tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
//             A Computer Science major at University of Colorado Boulder
//           </p>

//           <a href="#about">
//             <MagicButton
//               title="Show my work"
//               icon={<FaLocationArrow />}
//               position='right'
//             />
//           </a>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Hero



const Hero = () => {
    const [copied, setCopied] = useState(false);
    const email = "loganhaase3@gmail.com";
  
    // Function to copy email to clipboard
    const copyEmail = () => {
      navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };
  
    return (
      <div className="pb-20 pt-36">
        {/* Spotlights for cool visual effects */}
        <div>
          <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill="white"/>
          <Spotlight className="top-10 left-full h-[80vh] x-[50vw]" fill="purple"/>
          <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="blue"/>
        </div>
  
        {/* Background Grid Effect */}
        <div className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black/[0.2] flex items-center justify-center absolute top-0 left-0">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"/>
        </div>
  
        {/* Main Content */}
        <div className="flex flex-col items-center justify-center relative my-20 z-10">
          <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
            {/* Typing Animation for Name */}
            <TextGenerateEffect 
              className="text-center text-[40px] md:text-5xl lg:text-6xl"
              words="Hello, I am Logan"
            />
            <p className="text-center tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
              A Computer Science major at University of Colorado Boulder
            </p>
  
            {/* Social Buttons Section */}
            <div className="flex space-x-4 my-4">
              {/* Resume Button */}
              <Link href="/resume">
                <MagicButton title="My Resume" icon={<FaLocationArrow />} position="right" />
            </Link>
  
              {/* LinkedIn Button */}
              <a href="https://www.linkedin.com/in/logan-haase-8a15a1280/" target="_blank" rel="noopener noreferrer">
                <MagicButton title="LinkedIn" icon={<FaLinkedin />} position="right" />
              </a>
  
              {/* GitHub Button */}
              <a href="https://github.com/lhaase3" target="_blank" rel="noopener noreferrer">
                <MagicButton title="GitHub" icon={<FaGithub />} position="right" />
              </a>
  
              {/* Email Copy Button */}
              <button onClick={copyEmail}>
                <MagicButton
                  title={copied ? "Copied!" : "Email"}
                  icon={<FaEnvelope />}
                  position="right"
                />
              </button>
            </div>
  
            {/* Call to Action */}
            {/* <a href="#about">
              <MagicButton title="Show my work" icon={<FaLocationArrow />} position="right" />
            </a> */}
          </div>
        </div>
      </div>
    );
  };
  
  export default Hero;
'use client';

import { cn } from "@/lib/utils";
import { BackgroundGradientAnimation } from "./GradientBG";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
    //   className={cn(
    //     "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
    //     className
    //   )}
    className={cn(
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  id,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  id?: number;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {

return (
    <div
      className={cn(
        "row-span-1 relative overflow-hidden rounded-3xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
        className
      )}
      style={{
        background: 'rgb(2,0,36)',
        backgroundImage: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(89,89,124,1) 26%, rgba(0,212,255,1) 100%)',
      }}
    >
      
      <div className={`${id == 6 && 'flex justify-center'} h-full`}>
        <div className="w-full h-full absolute">
          {img && (
            <img
              src={img}
              alt={img}
              //className={cn(imgClassName, 'object-cover object-center')}
              className={cn(imgClassName, 'w-full h-full object-cover')}
              //style={id === 1 ? { objectPosition: 'left center' } : undefined}
              //style={id === 1 ? { objectPosition: 'center'} : undefined}
              style = {{
                transform: 'scale(1.1)',
                transition: 'transform 0.3s ease-in-out',
              }}
              // className={cn(imgClassName, 'w-full h-full object-cover')}
            />
          )}
        </div>
  
        {/* Spare Image Section */}
        {spareImg && (
          <div className={`absolute right-0 -bottom-5 ${id === 5 ? 'w-full opacity-80' : ''}`}>
            <img
              src={spareImg}
              alt={spareImg}
              className="object-cover object-center w-full h-full"
            />
          </div>
        )}

        {spareImg && id === 4 && (
          <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl">
            <img
              src={spareImg}
              alt="surfing"
              className="w-full h-full object-cover object-bottom"
            />
          </div>
        )}


  
        {/* Background Gradient Animation for id === 6 */}
        {id === 6 && (
          <BackgroundGradientAnimation>
            <div className="absolute z-50 flex items-center justify-center text-white font-bold">
              {/* Add content here if needed */}
            </div>
          </BackgroundGradientAnimation>
        )}
  
        {/* Text Content */}
        <div className={cn(titleClassName, 'group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex-col px-5 p-5 lg:p-10')}>
          <div className="font-sans font-extralight text-[#c1c2d3] text-sm md:text-sx lg:text-base z-10">
            {description}
          </div>
          <div className="font-sans font-bold text-lg lg:text-3xl max-w-96 z-10">
            {title}
          </div>

          {/* Tech Stack Section (id === 3) */}
          {id === 3 && (
            <div className="flex gap-1 lg:gap-5 w-fit absolute top-1/2 -translate-y-1/2 -right-3 lg:-right-2">
              <div className="flex flex-col gap-3 lg:gap-2">
                {['C', 'Python', 'JavaScript'].map((item) => (
                  <span key={item} className="py-2 lg:py-4 lg:px-3 px-3 text-xs lg:text-base opacity-50 lg:opacity-100 rounded-lg text-center bg-[#10132E]">
                    {item}
                  </span>
                ))}
                <span className="py-4 px-3 rounded-lg text-center bg-[#272e6f]"/>
              </div>
              <div className="flex flex-col gap-3 lg:gap-2">
              <span className="py-4 px-3 rounded-lg text-center bg-[#272e6f]"/>
                {['C++', 'SQL', 'Java'].map((item) => (
                  <span key={item} className="py-2 lg:py-4 lg:px-3 px-3 text-xs lg:text-base opacity-50 lg:opacity-100 rounded-lg text-center bg-[#10132E]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
          </div>
      </div>
    </div>
  );  
};

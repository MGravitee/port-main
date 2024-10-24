import {
    AnimatePresence,
    MotionValue,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
  } from "framer-motion";
  import { useEffect, useRef, useState } from "react";
  
  import { ThemeSwitch } from "../darkmode/DarkModeBtn";

  const DeskNav = () => {
    return (
      
        <SideStaggerNavigation />
      
    );
  };
  
  // Total number of lines on the side of the page
  const NUM_LINES = 22;
  // Position key will place the title on the Nth
  // line of the sidebar
  const navItems = [
    { position: 4, title: "Home" },
    { position: 8, title: "Work" },
    { position: 12, title: "About" },
    { position: 16, title: "Contact" },
    { position: 20, title: <ThemeSwitch /> },
  ];
  
  const SideStaggerNavigation = () => {
    const [isHovered, setIsHovered] = useState(false);

    const mouseY = useMotionValue(Infinity);
  
    return (
      <motion.nav
      //these effect the focus/hover on the side nav

        onMouseMove={(e) => {
          mouseY.set(e.clientY);
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          mouseY.set(Infinity);
          setIsHovered(false);
        }}
        onFocus={() => {
          setIsHovered(true);       
        }}
        onBlur={() =>{
          setIsHovered(false); 
        }}
        

        className="fixed hidden lg:flex right-0 top-0 h-screen flex-col items-end justify-between py-4 pl-8"
      >
        <ul className="fixed hidden lg:flex right-0 top-0 h-screen flex-col items-end justify-between py-4 pl-8">
            {Array.from(Array(NUM_LINES).keys()).map((i) => {
            const linkContent = navItems.find((item) => item.position === i + 1);
    
            return (
                <LinkLine
                title={linkContent?.title}
                isHovered={isHovered}
                mouseY={mouseY}
                key={i}
                />
            );
            })}
        </ul>
      </motion.nav>
    );
  };
  
  const SPRING_OPTIONS = {
    mass: 1,
    stiffness: 200,
    damping: 15,
  };
  
  const LinkLine = ({
    mouseY,
    isHovered,
    title,
  }: {
    mouseY: MotionValue;
    title: string | JSX.Element;
    isHovered: boolean;
  }) => {
    const ref = useRef<HTMLLIElement>(null);
    const distance = useTransform(mouseY, (val) => {
      const bounds = ref.current?.getBoundingClientRect();
  
      return val - (bounds?.y || 0) - (bounds?.height || 0) / 2;
    });
  
    // Styles for non-link lines
    const lineWidthRaw = useTransform(distance, [-80, 0, 80], [15, 100, 15]);
    const lineWidth = useSpring(lineWidthRaw, SPRING_OPTIONS);
  
    // Styles for link lines
    const linkWidth = useSpring(25, SPRING_OPTIONS);
  
    useEffect(() => {
      if (isHovered) {
        linkWidth.set(120);
      } else {
        linkWidth.set(25);
      }
    }, [isHovered]);
  
    if (title ==="Home") {
      return (
        <a href="#home">
          <motion.li
            ref={ref}
            className="group relative bg-current transition-colors hover:bg-neutral-500"
            style={{ width: linkWidth, height: 2 }}
          >
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute left-0 top-0 z-10 w-full pt-2 font-bold uppercase text-current transition-colors group-hover:text-neutral-500"
                >
                  {title}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.li>
        </a>
      );
    } 
    if (title ==="Work") {
        return (
          <a href="#work-section">
            <motion.li
              ref={ref}
              className="group relative bg-current transition-colors hover:bg-neutral-500"
              style={{ width: linkWidth, height: 2 }}
            >
              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute left-0 top-0 z-10 w-full pt-2 font-bold uppercase text-current transition-colors group-hover:text-neutral-500"
                  >
                    {title}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.li>
          </a>
        );
    }
    if (title ==="About") {
      return (
        <a href="#about-section">
          <motion.li
            ref={ref}
            className="group relative bg-current transition-colors hover:bg-neutral-500"
            style={{ width: linkWidth, height: 2 }}
          >
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute left-0 top-0 z-10 w-full pt-2 font-bold uppercase text-current transition-colors group-hover:text-neutral-500"
                >
                  {title}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.li>
        </a>
      );
    }
    if (title ==="Contact") {
      return (
        <a href="#contact-section">
          <motion.li
            ref={ref}
            className="group relative bg-current transition-colors hover:bg-neutral-500"
            style={{ width: linkWidth, height: 2 }}
          >
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute left-0 top-0 z-10 w-full pt-2 font-bold uppercase text-current transition-colors group-hover:text-neutral-500"
                >
                  {title}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.li>
        </a>
      );
    }
    if (title === <ThemeSwitch />) {
      return (
        <a href="#contact-section">
          <motion.li
            ref={ref}
            className="group relative bg-current transition-colors hover:bg-neutral-500"
            style={{ width: linkWidth, height: 2 }}
          >
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute left-0 top-0 z-10 w-full pt-2 font-bold uppercase text-current transition-colors group-hover:text-neutral-500"
                >
                  {title}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.li>
        </a>
      );
    } else {
      return (
        <motion.li
          ref={ref}
          className="relative bg-current"
          style={{ width: lineWidth, height: 2 }}
        />
      );
    }
  };
  
  export default DeskNav;
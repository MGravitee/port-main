import React from "react";
import { motion } from "framer-motion";

const Example = () => {
  return (
    <section className="grid place-content-center bg-indigo-500 py-24">
      <MarqueeButton>Start your journey!</MarqueeButton>
    </section>
  );
};

interface Props {
    children: any;
    link: string;
}

const ScrollingLink: React.FC<Props> = ({ link, children }) => {

  return (
    <motion.a
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.95,
      }}
      href={link} // setting link here
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Navigates to the site"
      role="link"
      className="relative overflow-hidden bg-inherit p-4 text-sm md:text-lg lg:text-xl font-black uppercase text-current  border border-inherit rounded-bl-lg rounded-tr-lg"
    >
      <motion.span
        className="flex content-center"
        initial={{ x: "0%" }}
        animate={{
          x: "calc(-100% - 6px)",
        }}
        transition={{
          ease: "linear",
          duration: 5,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        {children} •
      </motion.span>

      <motion.span
        initial={{ x: "calc(-100% - 6px)" }}
        animate={{
          x: "calc(-200% - 12px)",
        }}
        transition={{
          ease: "linear",
          duration: 5,
          repeat: Infinity,
          repeatType: "loop",
        }}
        className="absolute left-4 top-4 flex content-center"
      >
        {children} •
      </motion.span>
      <motion.span
        initial={{ x: "calc(100% + 6px)" }}
        animate={{
          x: "0%",
        }}
        transition={{
          ease: "linear",
          duration: 5,
          repeat: Infinity,
          repeatType: "loop",
        }}
        className="absolute left-4 top-4 flex content-center"
      >
        {children} •
      </motion.span>
      <motion.span
        initial={{ x: "calc(200% + 12px)" }}
        animate={{
          x: "calc(100% + 6px)",
        }}
        transition={{
          ease: "linear",
          duration: 5,
          repeat: Infinity,
          repeatType: "loop",
        }}
        className="absolute left-4 top-4 flex content-center"
      >
        {children} •
      </motion.span>
    </motion.a>
  );
};

export default ScrollingLink;
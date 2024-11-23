import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface Props {
    children: any;
    link: string;
}

const ScrollingLink: React.FC<Props> = ({ link, children }) => {
    //for reduced animation
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.a
            whileHover={{
                scale: shouldReduceMotion ? 1 : 1.05,
            }}
            whileTap={{
                scale: shouldReduceMotion ? 1 : 0.95,
            }}
            href={link} // setting link here
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Navigates to ${children}`}
            role="link"
            className="relative overflow-hidden bg-inherit p-4 text-sm md:text-lg lg:text-xl font-black uppercase text-current  border border-inherit rounded-md rounded-bl-lg rounded-tr-lg accessibility-class"
        >
            {!shouldReduceMotion ? (
                <>
                    <motion.span
                        className="flex content-center accessibility-class"
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
                        className="absolute left-4 top-4 flex content-center justify-center align-middle accessibility-class"
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
                        className="absolute left-4 top-4 flex content-center justify-center align-middle accessibility-class no-motion"
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
                        className="absolute left-4 top-4 flex content-center justify-center align-middle accessibility-class"
                    >
                        {children} •
                    </motion.span>
                </>
            ) : (
                <span>{children}</span>
            )}
        </motion.a>
    );
};

export default ScrollingLink;

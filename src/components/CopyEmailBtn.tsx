import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { optionsLink } from "../toolbelt/api";

// Email to be copied
const TARGET_TEXT = "Copy Email";


//thank you Gabbie for helping me hunt down how to properly pass props via components in typescript, my hero
    interface Props {
      email:string;
    }

const CopyEmailBtn: React.FC<Props> = ({email}) => {
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const [text, setText] = useState(TARGET_TEXT);
    const [copied, setCopied] = useState(false);
    

      //values for animation
    const CYCLES_PER_LETTER = 2;
    const SHUFFLE_TIME = 50;
    const CHARS = "!@#$%^&*():{};|,.<>/?";
    

    // function that copies email and show "Email Copied"
    const handleCopy = () => {
        navigator.clipboard.writeText(email).then(() => {
            setCopied(true);
            setText("Email Copied");
            setTimeout(() => {
                setCopied(false);
                setText(TARGET_TEXT); // resetting back to default state after 5 seconds
            }, 5000);
        });
    };

    // function to scramble the button text on hover
    const scramble = () => {
        let pos = 0;

        intervalRef.current = setInterval(() => {
            const scrambled = TARGET_TEXT.split("")
                .map((char, index) => {
                    if (pos / CYCLES_PER_LETTER > index) {
                        return char;
                    }
                    const randomCharIndex = Math.floor(
                        Math.random() * CHARS.length
                    );
                    const randomChar = CHARS[randomCharIndex];
                    return randomChar;
                })
                .join("");

            setText(scrambled);
            pos++;

            if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
                stopScramble();
            }
        }, SHUFFLE_TIME);
    };

    // function to stop scrambling
    const stopScramble = () => {
        clearInterval(intervalRef.current || undefined);
        if (!copied) {
            setText(TARGET_TEXT); // reset to original only if email hasn't been copied
        }
    };

    return (
        <motion.button
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.975 }}
            onMouseEnter={!copied ? scramble : undefined} // scramble only if not copied
            onMouseLeave={!copied ? stopScramble : undefined}
            onClick={handleCopy} // copy email on click
            className="group relative overflow-hidden rounded-bl-lg rounded-tr-lg border-2 border-neutral-500 bg-inherit px-4 py-2 font-mono font-medium uppercase text-current transition-colors hover:text-orange-600"
        >
            <div className="relative z-10 flex items-center gap-2">
                <span>{text}</span>
            </div>
            <motion.span
                initial={{ y: "100%" }}
                animate={{ y: "-100%" }}
                transition={{
                    repeat: Infinity,
                    repeatType: "mirror",
                    duration: 1,
                    ease: "linear",
                }}
                className="duration-300 absolute inset-0 z-0 scale-125 bg-gradient-to-t from-indigo-400/0 from-40% via-orange-600/100 to-orange-600/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
            />
        </motion.button>
    );
};

export default CopyEmailBtn;

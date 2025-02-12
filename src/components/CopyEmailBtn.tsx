import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

//thank you for the guys at hover.dev for inspiration for this component.

// Email to be copied
const TARGET_TEXT = "Copy Email";

interface Props {
    email: string;
}

const CopyEmailBtn: React.FC<Props> = ({ email }) => {
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const [text, setText] = useState(TARGET_TEXT);
    const [copied, setCopied] = useState(false);

    //values for animation
    const CYCLES_PER_LETTER = 2;
    const SHUFFLE_TIME = 50;
    const CHARS = "!@#$%^&*():{};|,.<>/?";

    // cleanup function to clear interval to prevent memory leaks when/if component unmounts. Being a one page
    // layout I don't think that will ever be an issue BUT I feel it's not bad habit to get into

    useEffect(() => {
        return () => {
            clearInterval(intervalRef.current || undefined);
        };
    }, []);

    // function that copies email and then shows "Email Copied"
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
            onMouseEnter={!copied ? scramble : undefined}
            onMouseLeave={!copied ? stopScramble : undefined}
            onFocus={!copied ? scramble : undefined}
            onBlur={!copied ? stopScramble : undefined}
            onClick={handleCopy} // copy email on click
            className="group relative overflow-hidden rounded-bl-lg rounded-tr-lg border-2 w-fit border-neutral-500 bg-content1 shadow-medium rounded-medium px-4 py-2 font-mono font-medium uppercase text-current transition-colors hover:text-[#ff8f1f] no-motion"
        >
            <div className="relative z-10 flex items-center gap-2 no-motion">
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
                className="duration-300 absolute inset-0 z-0 scale-125 bg-gradient-to-t from-indigo-400/0 from-40% via-orange-600/100 to-orange-600/0 to-60% opacity-0 transition-opacity group-hover:opacity-100 no-motion"
            />
        </motion.button>
    );
};

export default CopyEmailBtn;

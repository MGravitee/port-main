import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { optionsLink } from "../toolbelt/api";

// Email to be copied
const TARGET_TEXT = "Copy Email";

const CopyEmailBtn: React.FC = () => {
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const [text, setText] = useState(TARGET_TEXT);
    const [copied, setCopied] = useState(false);
    const [contactData, setData] = useState(null);
    const [isLoaded, setLoadStatus] = useState(false);

    interface contactData {
        email_link: string;
        github_link: string;
        linkedin_link: string;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(optionsLink);
                if (!response.ok) {
                    throw new Error("contactData fetch failed");
                }
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error(error);
            }
            fetchData();
        };
    }, [optionsLink]);

    console.log(contactData);

    //values for animation

    const CYCLES_PER_LETTER = 2;
    const SHUFFLE_TIME = 50;
    const CHARS = "!@#$%^&*():{};|,.<>/?";
    const EMAIL = "mgravitee@gmail.com";

    // Function to copy email and show "Email Copied"
    const handleCopy = () => {
        navigator.clipboard.writeText(EMAIL).then(() => {
            setCopied(true);
            setText("Email Copied");
            setTimeout(() => {
                setCopied(false);
                setText(TARGET_TEXT); // resetting back to default state after seconds
            }, 5000);
        });
    };

    // Function to scramble the button text on hover
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

    // Function to stop scrambling
    const stopScramble = () => {
        clearInterval(intervalRef.current || undefined);
        if (!copied) {
            setText(TARGET_TEXT); // Reset to original only if email hasn't been copied
        }
    };

    return (
        <motion.button
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.975 }}
            onMouseEnter={!copied ? scramble : undefined} // Scramble only if not copied
            onMouseLeave={!copied ? stopScramble : undefined}
            onClick={handleCopy} // Copy email on click
            className="group relative overflow-hidden rounded-bl-lg rounded-tr-lg border-[1px] border-neutral-500 bg-neutral-700 px-4 py-2 font-mono font-medium uppercase text-neutral-300 transition-colors hover:text-indigo-300"
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
                className="duration-300 absolute inset-0 z-0 scale-125 bg-gradient-to-t from-indigo-400/0 from-40% via-indigo-400/100 to-indigo-400/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
            />
        </motion.button>
    );
};

export default CopyEmailBtn;

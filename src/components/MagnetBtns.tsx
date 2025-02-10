import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useSpring,
} from "framer-motion";
import { useRef } from "react";
import { GitHubIcon, LinkedInIcon } from "../icons/Icons";

interface Props {
    link: string;
}

export const MagnetButtonGit: React.FC<Props> = ({ link }) => {
    const ref = useRef<HTMLAnchorElement | null>(null); // Change to anchor element
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x, {
        mass: 3,
        stiffness: 400,
        damping: 50,
    });
    const ySpring = useSpring(y, {
        mass: 3,
        stiffness: 400,
        damping: 50,
    });

    const transform = useMotionTemplate`translateX(${xSpring}px) translateY(${ySpring}px)`;

    const handleMouseMove = (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        if (!ref.current) return;

        const { height, width, left, top } =
            ref.current.getBoundingClientRect();

        x.set(e.clientX - (left + width / 2));
        y.set(e.clientY - (top + height / 2));
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.a
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="group relative grid h-[220px] w-[220px] place-content-center rounded-full transition-colors duration-700 ease-out"
            href={link} // setting link here
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Navigates to my GitHub profile"
            role="link"
        >
            <GitHubIcon size={40} className="ml-1.5 mb-2" />
            GitHub
            <div className="pointer-events-none absolute inset-0 z-0 scale-0 rounded-full bg-content1-foreground border-2 border-content1 transition-transform duration-700 ease-out group-hover:scale-100" />
            <motion.svg
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                }}
                style={{
                    top: "50%",
                    left: "50%",
                    x: "-50%",
                    y: "-50%",
                }}
                width="200"
                height="200"
                className="pointer-events-none absolute z-10"
            >
                <path
                    id="circlePath"
                    d="M100,100 m-100,0 a100,100 0 1,0 200,0 a100,100 0 1,0 -200,0"
                    fill="none"
                />
                <text>
                    <textPath
                        href="#circlePath"
                        fill="black"
                        className="fill-content1 text-xl font-light uppercase opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
                    >
                        GitHub Profile_____ GitHub Profile_____ GitHub Profile_____      
                    </textPath>
                </text>
            </motion.svg>
        </motion.a>
    );
};

export const MagnetButtonLnkd: React.FC<Props> = ({ link }) => {
    const ref = useRef<HTMLAnchorElement | null>(null); // Change to anchor element
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x, {
        mass: 3,
        stiffness: 400,
        damping: 50,
    });
    const ySpring = useSpring(y, {
        mass: 3,
        stiffness: 400,
        damping: 50,
    });

    const transform = useMotionTemplate`translateX(${xSpring}px) translateY(${ySpring}px)`;

    const handleMouseMove = (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        if (!ref.current) return;

        const { height, width, left, top } =
            ref.current.getBoundingClientRect();

        x.set(e.clientX - (left + width / 2));
        y.set(e.clientY - (top + height / 2));
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.a
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="group relative grid h-[220px] w-[220px] place-content-center rounded-full transition-colors duration-700 ease-out"
            href={link} // setting link here
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Navigates to my LinkedIn profile"
            role="link"
        >
            <LinkedInIcon size={40} className="ml-3 mb-2" />
            LinkedIn
            <div className="pointer-events-none absolute inset-0 z-0 scale-0 rounded-full bg-content1 border-2 border-content1-foreground transition-transform duration-700 ease-out group-hover:scale-100" />
            <motion.svg
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                }}
                style={{
                    top: "50%",
                    left: "50%",
                    x: "-50%",
                    y: "-50%",
                }}
                width="200"
                height="200"
                className="pointer-events-none absolute z-10"
            >
                <path
                    id="circlePath"
                    d="M100,100 m-100,0 a100,100 0 1,0 200,0 a100,100 0 1,0 -200,0"
                    fill="none"
                />
                <text>
                    <textPath
                        href="#circlePath"
                        fill="black"
                        className="fill-content1-foreground text-xl font-light uppercase opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
                    >
                        LinkedIn Profile___ LinkedIn Profile___ LinkedIn Profile____ 
                    </textPath>
                </text>
            </motion.svg>
        </motion.a>
    );
};

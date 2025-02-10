import { useEffect, useRef, useState } from "react";
import {
    AnimatePresence,
    MotionValue,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";

const DeskNav = () => {
    return <SideStaggerNavigation />;
};

// Total number of lines on the side of the page
const NUM_LINES = 22;
// Position key will place the title on the Nth
// line of the sidebar
const navItems = [
    { position: 8, title: "Work" },
    { position: 12, title: "About" },
    { position: 16, title: "TCOB" },
];

const SideStaggerNavigation = () => {
    const [isHovered, setIsHovered] = useState(false);
    const mouseY = useMotionValue(Infinity);

    return (
        <motion.nav
            aria-label="Side navigation"
            role="navigation"
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
            onBlur={() => {
                setIsHovered(false);
            }}
            className="fixed hidden lg:flex right-0 top-0 h-screen flex-col items-end justify-between py-4 pl-8 cursor-none xl:right-1"
        >
            <ul className="fixed hidden lg:flex right-0 top-0 h-screen flex-col items-end justify-between py-4 pl-8 xl:right-1">
                {Array.from(Array(NUM_LINES).keys()).map((i) => {
                    const linkContent = navItems.find(
                        (item) => item.position === i + 1
                    );

                    return (
                        <LinkLine
                            title={linkContent?.title}
                            isHovered={isHovered}
                            isFocused={isHovered}
                            mouseY={mouseY}
                            key={i}
                        />
                    );
                })}
            </ul>
        </motion.nav>
    );
};

//framer motion spring options
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
    title: string | undefined;
    isHovered: boolean;
    isFocused: boolean;
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

    //adjusts the size of link lines depending on hover
    useEffect(() => {
        if (isHovered) {
            linkWidth.set(120);
        } else {
            linkWidth.set(25);
        }
    }, [isHovered]);

    if (title === "Work") {
        return (
            <motion.li
                ref={ref}
                className="group relative bg-current transition-colors hover:bg-neutral-500 accessibility-class"
                style={{ width: linkWidth, height: 2 }}
                aria-label="Navigation Link to work section"
            >
                <a href="#work-section">
                    <AnimatePresence>
                        {isHovered && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute left-0 top-0 z-10 w-full pt-2 font-bold uppercase text-current transition-colors group-hover:text-neutral-500 accessibility-class"
                            >
                                {title}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </a>
            </motion.li>
        );
    }
    if (title === "About") {
        return (
            <motion.li
                ref={ref}
                className="group relative bg-current transition-colors hover:bg-neutral-500 accessibility-class"
                style={{ width: linkWidth, height: 2 }}
                aria-label="Navigation Link to work section"
            >
                <a href="#about-section">
                    <AnimatePresence>
                        {isHovered && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute left-0 top-0 z-10 w-full pt-2 font-bold uppercase text-current transition-colors group-hover:text-neutral-500 accessibility-class"
                            >
                                {title}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </a>
            </motion.li>
        );
    }
    if (title === "TCOB") {
        return (
            <motion.li
                ref={ref}
                className="group relative bg-current transition-colors hover:bg-neutral-500 accessibility-class"
                style={{ width: linkWidth, height: 2 }}
                aria-label="Navigation Link to tricks of the trade section"
                title="Taking Care of Business"
            >
                <a href="#tools-section">
                    <AnimatePresence>
                        {isHovered && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute left-0 top-0 z-10 w-full pt-2 font-bold uppercase text-current transition-colors group-hover:text-neutral-500 accessibility-class"
                            >
                                {title}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </a>
            </motion.li>
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

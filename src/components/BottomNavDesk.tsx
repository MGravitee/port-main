import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { WorkIcon, AboutIcon } from "../icons/Icons";
import { ThemeSwitch } from "../darkmode/DarkModeBtn";

const BottomNavDesk = () => {
    const [selected, setSelected] = useState(0);

    return (
        <nav
            className=" hidden lg:flex flex-col fixed left-20 bottom-[30%] w-fit -translate-x-[50%] z-10 bg-transparent
    group-hover:backdrop-brightness-20 border-content1 shadow-medium rounded-medium backdrop-blur-xl backdrop-opacity-20 hover:bg-content1 hover:bg-opacity-75 transition-all"
        >
            <ul className="h-fit w-fit p-4 flex flex-col items-center gap-12">
                <NavItem
                    selected={selected === 1}
                    id={1}
                    setSelected={setSelected}
                    href="#work-section"
                >
                    <WorkIcon className="nav-item nav-item ml-2" />
                    Work
                </NavItem>
                <NavItem
                    selected={selected === 2}
                    id={2}
                    setSelected={setSelected}
                    href="#about-section"
                >
                    <AboutIcon className="nav-item ml-3" />
                    About
                </NavItem>
                <NavItem
                    selected={selected === 4}
                    id={4}
                    setSelected={setSelected}
                    href="#"
                >
                    <ThemeSwitch />
                </NavItem>
            </ul>
        </nav>
    );
};

const NavItem = ({
    children,
    href,
    selected,
    id,
    setSelected,
}: {
    children: any;
    selected: boolean;
    id: number;
    setSelected: Dispatch<SetStateAction<number>>;
    href: string;
}) => {
    return (
        <motion.li
            onClick={() => setSelected(id)}
            whileHover={{ scale: 1.05 }}
            whileFocus={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 text-md w-fit border-current rounded-md transition-colors relative"
        >
            <a href={href} className="relative justify-center z-10">
                {children}
            </a>
            <AnimatePresence>
                {selected && (
                    <motion.a
                        className="absolute inset-0  rounded-md bg-invert z-0"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                    ></motion.a>
                )}
            </AnimatePresence>
        </motion.li>
    );
};

export default BottomNavDesk;

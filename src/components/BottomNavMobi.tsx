import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { HomeIcon, ContactIcon, WorkIcon, AboutIcon } from "../icons/Icons";
import { ThemeSwitch } from "../darkmode/DarkModeBtn";

const BottomNavMobi = () => {
    const [selected, setSelected] = useState(0);

    return (
        <nav className="fixed h-20 bottom-[3rem] flex w-[310px]  md:w-[400px] justify-center left-[50%] -translate-x-[50%] items-center gap-4 border-[1px] border-inherit shadow-medium rounded-medium rounded-bl-lg rounded-tr-lg p-2 text-sm z-[99] lg:hidden text-white backdrop-blur-2xl backdrop-brightness-50 ">
            <ul className="h-fit w-[19.375rem] p-4 md:w-[25rem] flex justify-around items-center gap-2">
                <NavItem
                    selected={selected === 0}
                    id={0}
                    setSelected={setSelected}
                    href="#home"
                >
                    <HomeIcon className="nav-item ml-2" />
                    Home
                </NavItem>
                <NavItem
                    selected={selected === 1}
                    id={1}
                    setSelected={setSelected}
                    href="#work-section"
                >
                    <WorkIcon className="nav-item nav-item ml-1.5" />
                    Work
                </NavItem>
                <NavItem
                    selected={selected === 2}
                    id={2}
                    setSelected={setSelected}
                    href="#about-section"
                >
                    <AboutIcon className="nav-item ml-2" />
                    About
                </NavItem>
                <NavItem
                    selected={selected === 3}
                    id={3}
                    setSelected={setSelected}
                    href="#contact-section"
                >
                    <ContactIcon className="nav-item ml-3.5" />
                    Contact
                </NavItem>
                <NavItem
                    selected={selected === 4}
                    id={4}
                    setSelected={setSelected}
                    href=""
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
    href: string | undefined;
}) => {
    return (
        <motion.li
            onClick={() => setSelected(id)}
            whileHover={{ scale: 1.05 }}
            whileFocus={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 text-md w-12 border-current flex justify-center rounded-md text-center content-center transition-colors relative"
        >
            <a href={href} className="relative z-10">
                {children}
            </a>
            <AnimatePresence>
                {selected && (
                    <motion.a
                        className="absolute inset-0 rounded-md z-0"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                    ></motion.a>
                )}
            </AnimatePresence>
        </motion.li>
    );
};

export default BottomNavMobi;

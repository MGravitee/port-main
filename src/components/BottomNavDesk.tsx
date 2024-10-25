import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { HomeIcon, ContactIcon, WorkIcon, AboutIcon } from "../icons/Icons";
import { ThemeSwitch } from "../darkmode/DarkModeBtn";

const BottomNavDesk = () => {
  const [selected, setSelected] = useState(0);

  return (
  
    <nav className=" hidden lg:flex flex-col fixed left-20 bottom-56 w-fit -translate-x-[50%] ">
        <ul className="h-fit w-fit p-4 md:flex lg:flex-col justify-around items-center gap-4">
            <NavItem selected={selected === 0} id={0} setSelected={setSelected} href="#home">
                <HomeIcon className="nav-item ml-2.5" />
                Home
            </NavItem>
            <NavItem selected={selected === 1} id={1} setSelected={setSelected} href="#work-section">
                <WorkIcon className="nav-item nav-item ml-2" />
                Work
            </NavItem>
            <NavItem selected={selected === 2} id={2} setSelected={setSelected} href="#about-section">
                <AboutIcon className="nav-item ml-3" />
                About
            </NavItem>
            <NavItem selected={selected === 3} id={3} setSelected={setSelected} href="#contact-section">
                <ContactIcon className="nav-item ml-4" />
                Contact
            </NavItem>
            <NavItem selected={selected === 4} id={4} setSelected={setSelected} href="#">
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
    <motion.a
      href={href} // Use href for anchor links
      onClick={() => setSelected(id)}
      whileHover={{ scale: 1.05 }}
      whileFocus={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="p-3 text-md w-fit border-current rounded-md transition-colors relative"
    >
      <li className="relative justify-center z-10">{children}</li>
      <AnimatePresence>
        {selected && (
          <motion.li
            className="absolute inset-0  rounded-md bg-invert z-0"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          ></motion.li>
        )}
      </AnimatePresence>
    </motion.a>
  );
};

export default BottomNavDesk;
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";


const BottomNav = () => {
  const [selected, setSelected] = useState(0);

  return (
    // NOTE: In prod, you'd likely set height to h-screen and fix to the viewport
    <nav className="w-fit p-4 flex flex-row items-center gap-2 sticky bottom-0">
      <ul className="w-fit p-4 flex flex-row items-center gap-2">
        <NavItem selected={selected === 0} id={0} setSelected={setSelected}>
          Home
        </NavItem>
        <NavItem selected={selected === 1} id={1} setSelected={setSelected}>
        Work
        </NavItem>
        <NavItem selected={selected === 2} id={2} setSelected={setSelected}>
          About
        </NavItem>
        <NavItem selected={selected === 3} id={3} setSelected={setSelected}>
          Contact
        </NavItem>
      </ul>
    </nav>
  );
};

const NavItem = ({ children, selected, id, setSelected }) => {
  return (
    <motion.button
      className="p-3 text-sm bg-slate-800 hover:bg-slate-700 rounded-md transition-colors relative"
      onClick={() => setSelected(id)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <li className="block relative z-10">{children}</li>
      <AnimatePresence>
        {selected && (
          <motion.li
            className="absolute inset-0 rounded-md bg-indigo-600 z-0"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          ></motion.li>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default BottomNav;
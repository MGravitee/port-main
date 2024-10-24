import { motion } from "framer-motion";
import { HomeIcon, ContactIcon, WorkIcon, AboutIcon } from "../icons/Icons";
import { ThemeSwitch } from "../darkmode/DarkModeBtn";

const BottomNav = () => {
    return (
        <nav className="fixed  h-fit bottom-8 flex w-fit left-[50%] -translate-x-[50%] items-center gap-6 border-[1px] border-current rounded-bl-lg rounded-tr-lg p-2 text-sm z-[999999] lg:hidden">
            <NavItem href="#home">
                <HomeIcon className="nav-item" />
                Home
            </NavItem>
            <NavItem href="#work-section">
                <WorkIcon className="nav-item nav-item" />
                Work
            </NavItem>
            <NavItem href="#about-section">
                <AboutIcon className="nav-item" />
                About
            </NavItem>
            <NavItem href="#contact-section">
                <ContactIcon className="nav-item" />
                Contact
            </NavItem>
            <NavItem href="#">
                <ThemeSwitch />
                Switch
            </NavItem>
        </nav>
    );
};

const NavItem = ({ children, href }: { children: any; href: string }) => {
    return (
        <a href={href} className="block overflow-hidden">
            <motion.div
                whileHover={{ y: -40 }}
                transition={{ ease: "backInOut", duration: 0.5 }}
                className="h-[40px]"
            >
                <span className="flex flex-col h-[40px] items-center">
                    {children}
                </span>
                <span className="flex flex-col h-[40px] items-center text-neutral-500">
                    {children}
                </span>
            </motion.div>
        </a>
    );
};

export default BottomNav;

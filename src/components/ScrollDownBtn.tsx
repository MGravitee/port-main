import { FC } from "react";

const scrollOffset:number = 20;

const ScrollDownBtn: FC = () => {

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        // Get the ref to the ProjectSection and scroll to it
        const projectSection = document.getElementById("work-section");

        if (projectSection) {
            const sectionPosition = projectSection.getBoundingClientRect().top + window.scrollY - scrollOffset;

            window.scrollTo({
                top: sectionPosition,
            });
        }
    }

    return (
        <button className="p-3 absolute bottom-[12rem] left-[50%] -translate-x-[50%] lg:hidden z-10"  aria-label="Scroll down button to move to Featured Work Section" onClick={ handleClick }>
            <span className="scroll-indicator no-motion"></span>
            <span className="scroll-indicator no-motion"></span>
            <span className="scroll-indicator no-motion"></span>
            <p className="scroll-text mt-7">Scroll Down</p>
        </button>
    )
}

export default ScrollDownBtn;
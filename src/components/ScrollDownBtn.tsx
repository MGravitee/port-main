import { FC } from "react";

const scrollOffset:number = 60;

const ScrollDownBtn: FC = () => {

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        // Get the ref to the ProjectSection and scroll to it
        const projectSection = document.getElementById("work-section");

        if (projectSection) {
            const sectionPosition = projectSection.getBoundingClientRect().top + window.scrollY - scrollOffset;

            window.scrollTo({
                top: sectionPosition,
                behavior: "smooth"
            });
        }
    }

    return (
        <button className="p-3 absolute bottom-[170px] md:bottom-[80px] right-0 lg:hidden" aria-label="Scroll down" onClick={ handleClick }>
            <span className="scroll-indicator"></span>
            <span className="scroll-indicator"></span>
            <span className="scroll-indicator"></span>
            <p className="scroll-text">Scroll Down</p>
        </button>
    )
}

export default ScrollDownBtn;
import { useEffect, useState } from "react";
import anime from "animejs/lib/anime.es.js";

const DotGrid2 = () => {
    const [gridDimensions, setGridDimensions] = useState({ width: 40, height: 100 });

    // Function to calculate grid dimensions based on viewport size
    const calculateGridDimensions = () => {
        const cols = Math.floor(window.innerWidth / 50); // Adjust the divisor for desired dot size
        const rows = Math.floor(window.innerHeight / 50); // Adjust the divisor for desired dot size
        setGridDimensions({ width: cols, height: rows });
    };

    useEffect(() => {
        calculateGridDimensions(); // Set initial grid dimensions

        // Update grid dimensions on window resize
        window.addEventListener("resize", calculateGridDimensions);
        return () => {
            window.removeEventListener("resize", calculateGridDimensions);
        };
    }, []);

    const handleDotClick = (e) => {
        anime({
            targets: ".dot-point",
            scale: [
                { value: 1.35, easing: "easeOutSine", duration: 250 },
                { value: 1, easing: "easeInOutQuad", duration: 500 },
            ],
            translateY: [
                { value: -15, easing: "easeOutSine", duration: 250 },
                { value: 1, easing: "easeInOutQuad", duration: 500 },
            ],
            opacity: [
                { value: 1, easing: "easeOutSine", duration: 250 },
                { value: 0.5, easing: "easeInOutQuad", duration: 500 },
            ],
            delay: anime.stagger(100, {
                grid: [gridDimensions.width, gridDimensions.height],
                from: e.target.dataset.index,
            }),
        });
    };

    const dots = [];
    let index = 0;

    for (let i = 0; i < gridDimensions.width; i++) {
        for (let j = 0; j < gridDimensions.height; j++) {
            dots.push(
                <div
                    className="group cursor-crosshair rounded-full p-2 transition-colors hover:bg-slate-600"
                    data-index={index}
                    key={`${i}-${j}`}
                >
                    <div
                        className="dot-point h-2 w-2 rounded-full bg-gradient-to-b from-slate-700 to-slate-400 opacity-50 group-hover:from-indigo-600 group-hover:to-white"
                        data-index={index}
                    />
                </div>
            );
            index++;
        }
    }

    return (
        <div
            onClick={handleDotClick}
            style={{ gridTemplateColumns: `repeat(${gridDimensions.width}, 1fr)` }}
            className="absolute top-0 z-0 grid max-w-[100%]"
        >
            {dots}
        </div>
    );
};

export default DotGrid2;
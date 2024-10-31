import { Dispatch, SetStateAction, useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { aboutLink } from "../toolbelt/api";
import { AnimatePresence, motion } from "framer-motion";
import { useWindowSize } from "../toolbelt/useWindowSize";

// Define types for API data
interface AboutData {
    acf: {
        about_content_1: string;
        things_i_enjoy: ThingsIEnjoy[];
    };
}

interface ThingsIEnjoy {
    content: string;
    image: string;
    title: string;
}

function About() {
    const [restData, setData] = useState<AboutData | null>(null);
    const [isLoaded, setLoadStatus] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(aboutLink);
            if (response.ok) {
                const data = await response.json();
                setData(data);
                setLoadStatus(true);
            } else {
                setLoadStatus(false);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {isLoaded && restData ? (
                <>
                    <section id="about-section" className="about-section">
                        <h2 className="text-lg lg:text-3xl font-medium mb-8">
                            Get to Know Me:
                        </h2>
                        <p>{restData.acf.about_content_1}</p>
                    </section>
                    <section className="mt-8">
                        <h2 className="text-lg lg:text-2xl font-medium mb-8">Some Things I Enjoy: </h2>
                        <ScrollingThings things={restData.acf.things_i_enjoy} />
                    </section>
                </>
            ) : (
                <LoadingSpinner />
            )}
        </>
    );
}

// Updated ScrollingThings component
const ScrollingThings = ({ things }: { things: ThingsIEnjoy[] }) => {
    return (
        <div className="p-4 overflow-x-hidden relative">
            <div className="absolute top-0 bottom-0 left-0 w-24 z-10 bg-gradient-to-r from-slate-900 to-transparent" />
                <div className="flex items-center mb-4">
                    {/* Pass things to ThingsList */}
                    <ThingsList list={things} duration={Infinity} />
                </div>
            <div className="absolute top-0 bottom-0 right-0 w-24 z-10 bg-gradient-to-l from-slate-900 to-transparent" />
        </div>
    );
};

//really getting better at typescript interfaces and typing

const ThingsList = ({
    list,
    reverse = false,
    duration = 50,
}: {
    list: ThingsIEnjoy[]; 
    reverse?: boolean;
    duration?: number;
}) => {
    return (
        <motion.div
            initial={{ translateX: reverse ? "-100%" : "0%" }}
            animate={{ translateX: reverse ? "0%" : "-100%" }}
            transition={{ duration, repeat: Infinity, ease: "linear" }}
            className="flex gap-4 px-2 border rounded-lg"
        >
            {list.map((t, index) => {
                return (
                    <article
                        key={index} // Use index as key
                        className="shrink-0 w-[500px] grid grid-cols-[7rem,_1fr] rounded-lg overflow-hidden relative"
                    >
                        <img src={t.image} className="w-full h-44 object-cover" />
                        <div className="bg-s bg-black/40 backdrop-blur-xl p-4">
                            <span className="block font-semibold text-lg text-white mb-1">{t.title}</span>
                            <span className="block text-sm text-white">{t.content}</span>
                        </div>
                    </article>
                );
            })}
        </motion.div>
    );
};

export default About;

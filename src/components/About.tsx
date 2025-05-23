import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { aboutLink } from "../toolbelt/api";
import { motion } from "framer-motion";
import { AboutData, ThingsIEnjoy } from "../types/Interfaces";


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
                    <section
                        id="about-section"
                        className="about-section mb-[8rem] single-section transition-all shadow-medium rounded-md p-4 bg-content1 backdrop-opacity-50"
                    >
                        <h2
                            className="text-2xl md:text-3xl xl:text-4xl font-medium my-8">
                            About Me
                        </h2>
                        <div>
                            <p className="mb-8">
                                {restData.acf.about_content_1}
                            </p>
                            <article
                                className="dangerouslySetHtmlContent max-w flex flex-col justify-center"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        restData.acf.about_content_2 ||
                                        "Coming Soon...",
                                }}
                            />
                        </div>
                        <aside className="mt-4">
                            <h2 className="text-xl lg:text-3xl font-bold mb-10">
                                Some Things I Enjoy:{" "}
                            </h2>
                            <ScrollingThings
                                things={restData.acf.things_i_enjoy}
                            />
                        </aside>
                    </section>
                </>
            ) : (
                <LoadingSpinner />
            )}
        </>
    );
}

// scrolling things for slightly more interesting about section so it isn't just TLDR

const ScrollingThings = ({ things }: { things: ThingsIEnjoy[] }) => {
    return (
        <div className="p-4 overflow-x-hidden relative">
            <div className="absolute top-0 bottom-0 left-0 w-24 z-10 rounded" />
            <div className="flex items-center mb-4">
                {/* passing props to things to ThingsList */}
                <ThingsList list={things} duration={125} />
                <ThingsList list={things} duration={125} />
                <ThingsList list={things} duration={125} />
                <ThingsList list={things} duration={125} />
                <ThingsList list={things} duration={125} />
            </div>
            <div className="absolute top-0 bottom-0 right-0 w-24 z-10 rounded" />
        </div>
    );
};

// im getting better at typing and making interfaces in typescript, thank god
const ThingsList = ({
    list,
    reverse = false,
    duration = 50,
}: {
    list: ThingsIEnjoy[]; // imported from interfaces 
    reverse?: boolean;
    duration?: number;
}) => {
    return (
        <motion.div
            initial={{ translateX: reverse ? "-100%" : "0%" }}
            animate={{ translateX: reverse ? "0%" : "-100%" }}
            transition={{ duration, repeat: Infinity, ease: "linear" }}
            className="flex gap-4 px-2 border-content1-foreground"
        >
            {list.map((t, index) => {
                return (
                    <article
                        key={index} // Using index as key, I know this is a no-no, but in this case as I'm controlling it I know what each is
                        className="shrink-0 w-[500px] grid grid-cols-[10rem,_1fr] rounded-lg overflow-hidden relative"
                    >
                        <img
                            src={t.image}
                            className="w-full h-full object-cover"
                        />
                        <div className="bg-content2 text-current shadow-large p-4 border-content2">
                            <span className="block font-semibold text-lg lg:text-2xl mb-1">
                                <h3>{t.title}</h3>
                            </span>
                            <span className="block text-sm lg:text-medium text-current">
                                <p>{t.content}</p>
                            </span>
                        </div>
                    </article>
                );
            })}
        </motion.div>
    );
};

export default About;

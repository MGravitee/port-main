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
            {isLoaded && !!restData ? (
                <>
                    <section id="about-section" className="about-section">
                        <h2 className="text-lg lg:text-3xl font-medium mb-8">
                            Get to Know Me:
                        </h2>
                        <p>{restData.acf.about_content_1}</p>
                    </section>
                    {/* Pass restData to VerticalAccordion */}
                    <VerticalAccordion items={restData.acf.things_i_enjoy} />
                </>
            ) : (
                <LoadingSpinner />
            )}
        </>
    );
}

interface VerticalAccordionProps {
    items: ThingsIEnjoy[];
}

const VerticalAccordion = ({ items }: VerticalAccordionProps) => {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <section className="p-4">
            <div className="flex flex-col lg:flex-row h-fit lg:h-[600px] w-full max-w-6xl mx-auto shadow overflow-hidden">
                {items.map((item, index) => (
                    <Panel
                        key={index}
                        open={open}
                        setOpen={setOpen}
                        id={index}
                        title={item.title}
                        imgSrc={item.image}
                        description={item.content}
                    />
                ))}
            </div>
        </section>
    );
};

interface PanelProps {
    open: number | null;
    setOpen: Dispatch<SetStateAction<number | null>>;
    id: number;
    title: string;
    imgSrc: string;
    description: string;
}

const Panel = ({ open, setOpen, id, title, imgSrc, description }: PanelProps) => {
    const { width } = useWindowSize();
    const isOpen = open === id;

    return (
        <>
            <button
                className="bg-inherit hover: transition-colors p-3 border-r-[1px] border-b-[1px] border-current flex flex-row-reverse lg:flex-col justify-end items-center gap-4 relative group"
                onClick={() => setOpen(id)}
            >
                <span className="hidden xl:block text-xl rotate-180" style={{ writingMode: "vertical-lr" }}>
                    {title}
                </span>
                <span className="block xl:hidden text-xl">{title}</span>
                <div className="w-6 lg:w-full aspect-square bg-indigo-600 text-white grid place-items-center"></div>
                <span className="w-4 h-4 bg- group-hover:bg-slate-50 transition-colors border-r-[1px] border-b-[1px] lg:border-b-0 lg:border-t-[1px] border-current rotate-45 absolute bottom-0 lg:bottom-[50%] right-[50%] lg:right-0 translate-y-[50%] translate-x-[50%] z-20" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key={`panel-${id}`}
                        variants={width && width > 1024 ? panelVariants : panelVariantsSm}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        style={{
                            backgroundImage: `url(${imgSrc})`,
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                        }}
                        className="w-full h-full overflow-hidden relative bg-black flex items-end"
                    >
                        <motion.div
                            variants={descriptionVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="px-4 py-2 bg-black/40 backdrop-blur-xl text-sm text-white"
                        >
                            <p>{description}</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

// Animation variants
const panelVariants = {
    open: { width: "100%", height: "100%" },
    closed: { width: "0%", height: "100%" },
};

const panelVariantsSm = {
    open: { width: "100%", height: "25rem" },
    closed: { width: "100%", height: "0px" },
};

const descriptionVariants = {
    open: { opacity: 1, y: "0%", transition: { delay: 0.125 } },
    closed: { opacity: 0, y: "100%" },
};

export default About;

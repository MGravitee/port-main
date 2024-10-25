import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Tabs from "./Tabs";
import { GitHubIcon, GlobeIcon } from "../icons/Icons";
import { Feature } from "./Tabs";
import GlowingOutline from "./GlowingOutline";
import comingsoon from "/assets/comingsoon.webp";

type Tool = [string, string];

export interface Project {
    id: string;
    acf: {
        project_title: string;
        project_featured_image: string;
        project_overview: string;
        project_live_link: string;
        project_github_link: string;
        analysis_content: string;
        analysis_image: string;
        design_feature_1: Feature;
        design_feature_2: Feature;
        design_feature_3: Feature;
        dev_feature_1: Feature;
        dev_feature_2: Feature;
    };
    tools: Tool[];
}
interface AccordionProps {
    projects: Project[];
}

const Accordion2: React.FC<AccordionProps> = ({ projects }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    // Variants for the animation of open/close accordion content w/framer motion
    const accordionVariants = {
        open: { height: "auto", opacity: 1 },
        collapsed: { height: 0, opacity: 0 },
    };

    return (
        <div className="accordion">
            {projects.map((project, index) => (
                <div
                    key={project.id}
                    className="accordion-item max-w mb-4 focus:ring-2"
                >
                    <button
                        aria-expanded={activeIndex === index}
                        aria-controls={`content-${index}`}
                        id={`accordion-title-${index}`}
                        className=" relative flex justify-between accordion-title text-left w-full p-4 text-lg font-medium border rounded-bl-lg rounded-tr-lg transition-colors inset-0 z-10"
                        onClick={() => toggleAccordion(index)}
                    >
                        {project.acf.project_title}
                        {/* arrow for open/close */}
                        <motion.span
                            animate={{
                                rotate: activeIndex === index ? 180 : 0,
                            }} // rotating the arrow on open/close
                            transition={{ duration: 0.3 }}
                        >
                            <svg
                                className="w-5 h-5 text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                ></path>
                            </svg>
                        </motion.span>
                        <GlowingOutline />
                    </button>

                    <motion.div
                        id={`content-${index}`}
                        role="region"
                        aria-labelledby={`accordion-title-${index}`}
                        initial={false}
                        animate={activeIndex === index ? "open" : "collapsed"}
                        variants={accordionVariants}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="accordion-content p-4 mt-2 border border-current rounded-bl-lg  border-t-0 overflow-hidden "
                    >
                        <article className="project-details relative">
                            {/* displaying overview, links and tools used */}
                            <h3 className=" mb-4 text-lg lg:text-xl font-medium">
                                Overview:
                            </h3>
                            <p>{project.acf.project_overview}</p>
                            <nav className="flex justify-center gap-3">
                                <a href={project.acf.project_live_link}>
                                    Live Site <GlobeIcon />{" "}
                                </a>
                                <a href={project.acf.project_github_link}>
                                    GitHub <GitHubIcon />{" "}
                                </a>
                            </nav>
                            <div className="tools-list mt-4">
                                <h4 className="font-semibold text-lg">
                                    Tools Used:
                                </h4>
                                <ul className="tools-used flex flex-wrap gap-2 ">
                                    {project.tools.map((tool, index) => (
                                        <li
                                            key={index}
                                            className="flex gap-1 justify-center text-sm items-center border rounded-bl-lg rounded-tr-lg w-32 h-10 single-tool"
                                        >
                                            {tool[0]}
                                            <img
                                                className="max-w-[24px] tool-icon"
                                                src={tool[1]}
                                                alt={`${tool[0]} icon`}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Tabs component with analysis, design, and development features */}
                            <Tabs
                                analysisContent={{
                                    content: project.acf.analysis_content,
                                    imageUrl: project.acf.analysis_image,
                                }}
                                designFeatures={[
                                    {
                                        title: project.acf.design_feature_1
                                            .title,
                                        image: project.acf.design_feature_1
                                            .image,
                                        content:
                                            project.acf.design_feature_1
                                                .content,
                                    },
                                    {
                                        title: project.acf.design_feature_2
                                            .title,
                                        image: project.acf.design_feature_2
                                            .image,
                                        content:
                                            project.acf.design_feature_2
                                                .content,
                                    },
                                    {
                                        title: project.acf.design_feature_3
                                            .title,
                                        image: project.acf.design_feature_3
                                            .image,
                                        content:
                                            project.acf.design_feature_3
                                                .content,
                                    },
                                ]}
                                developmentFeatures={[
                                    {
                                        title: project.acf.dev_feature_1.title,
                                        image: project.acf.dev_feature_1.image,
                                        content:
                                            project.acf.dev_feature_1.content,
                                    },
                                    {
                                        title: project.acf.dev_feature_2.title,
                                        image: project.acf.dev_feature_2.image,
                                        content:
                                            project.acf.dev_feature_2.content,
                                    },
                                ]}
                            />
                        </article>
                    </motion.div>
                </div>
            ))}
        </div>
    );
};

export default Accordion2;

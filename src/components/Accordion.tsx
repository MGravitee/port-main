import React, { useState } from "react";
import { motion } from "framer-motion";
import Tabs from "./Tabs";
import { GitHubIcon, GlobeIcon } from "../icons/Icons";
import ScrollingLink from "./ScrollingLink";
import { Project } from "../types/Interfaces";

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
        <div className="accordion mt-12 flex flex-col">
            {projects.map((project, index) => (
                <div
                    key={project.id}
                    className="accordion-item flex flex-col self-center w-[98%] mb-1 lg:max-w"
                >
                    <button
                        aria-expanded={activeIndex === index}
                        aria-controls={`content-${index}`}
                        id={`accordion-title-${index}`}
                        className={`relative grid grid-cols-[auto_1fr_auto] gap-4 items-center text-left w-full py-4 px-6 text-lg font-medium transition-all bg-content1 shadow-medium rounded-[1rem] hover:bg-content2 ${
                            activeIndex === index
                                ? "rounded-bl-none rounded-br-none shadow-small"
                                : ""
                        }`}
                        onClick={() => toggleAccordion(index)}
                    >
                        {/* icon */}
                        <span className="w-10 h-10 flex items-center justify-center">
                            <img
                                src={project.acf.project_icon}
                                alt="Project logo/icon"
                                className="w-full h-full object-contain"
                            />
                        </span>

                        {/* title and tagline */}
                        <div>
                            <h3 className="block font-bold">
                                {project.acf.project_title}
                            </h3>
                            <p className="block text-sm text-content3-foreground">
                                {project.acf.project_tagline}
                            </p>
                        </div>

                        {/* arrow for open close */}
                        <motion.span
                            animate={{
                                rotate: activeIndex === index ? 180 : 0,
                            }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center justify-center"
                        >
                            <svg
                                className="w-5 h-5"
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
                    </button>

                    <motion.div
                        id={`content-${index}`}
                        role="region"
                        aria-labelledby={`accordion-title-${index}`}
                        aria-hidden={activeIndex !== index}
                        data-inert={activeIndex !== index ? true : undefined} //learning so much about accessibiity, this is to make sure children aren't focusable if accordion is closed
                        initial={false}
                        animate={activeIndex === index ? "open" : "collapsed"}
                        variants={accordionVariants}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="accordion-content p-4 rounded-large overflow-hidden bg-content1 shadow-medium rounded-tl-none rounded-tr-none transition-colors"
                    >
                        <article className="project-details relative ">
                            {/* displaying overview, links and tools used */}
                            <h4 className=" mb-6 text-lg lg:text-2xl font-medium">
                                Overview:
                            </h4>
                            <p>{project.acf.project_overview}</p>
                            <nav
                                className="flex justify-center gap-2
                            my-12 lg:gap-4 xl:gap-9"
                            >
                                <ScrollingLink
                                    link={project.acf.project_live_link}
                                >
                                    <GlobeIcon className="inline pt-[0.2rem] pr-1" size={24} />{" "}
                                    Live Site
                                </ScrollingLink>

                                <ScrollingLink
                                    link={project.acf.project_github_link}
                                >
                                    <GitHubIcon className="inline pt-1 pr-1" size={24} />{" "}
                                    GitHub
                                </ScrollingLink>
                            </nav>
                            <div className="tools-list mt-4">
                                <h4 className="font-semibold text-lg lg:text-2xl my-8">
                                    Tools Used:
                                </h4>
                                <ul className="tools-used flex justify-center flex-wrap gap-2 ">
                                    {project.tools.map((tool, index) => (
                                        <li
                                            key={index}
                                            className="flex gap-1 md:text-medium justify-center text-sm items-center border-solid bg-content2 shadow-medium rounded-medium border-current rounded-bl-lg rounded-tr-lg w-32 h-10 md:w-36 single-tool relative hover:bg-content3 transition-all"
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
                                    {
                                        title: project.acf.dev_feature_3.title,
                                        image: project.acf.dev_feature_3.image,
                                        content:
                                            project.acf.dev_feature_3.content,
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

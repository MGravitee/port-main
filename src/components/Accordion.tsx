import React, { useState } from "react";
import Tabs from "./Tabs";
interface Tool {
    name: string;
    iconUrl: string;
}

interface Feature {
    title: string;
    imageUrl: string;
    description: string;
}
interface Project {
    id: string;
    acf: {
        project_title: string;
        project_featured_image: string;
        project_overview: string;
        analysis_heading: string;
        analysis_content: string;
        design_feature_1: Feature;
        design_feature_2: Feature;
        design_feature_3: Feature;
        development_feature_1: Feature;
        development_feature_2: Feature;
    };
    tools: Tool[];
}
interface AccordionProps {
    projects: Project[];
}

const Accordion: React.FC<AccordionProps> = ({ projects }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="accordion">
            {projects.map((project, index) => (
                <div key={project.id} className="accordion-item mb-4">
                    <button
                        aria-expanded={activeIndex === index}
                        aria-controls={`content-${index}`}
                        id={`accordion-title-${index}`}
                        className="accordion-title text-left w-full p-4 text-lg font-medium rounded-lg border-2 border-gray-300 transition-colors"
                        onClick={() => toggleAccordion(index)}
                    >
                        {project.acf.project_title}
                    </button>
                    <div
                        id={`content-${index}`}
                        role="region"
                        aria-labelledby={`accordion-title-${index}`}
                        className={`accordion-content p-4 mt-2 border-l-2 border-gray-300 ${
                            activeIndex === index ? "block" : "hidden"
                        }`}
                    >
                        <div className="project-details">
                            <img
                                className="project-feat-img w-full h-auto rounded-lg mb-4"
                                src={project.acf.project_featured_image}
                                alt={project.acf.project_title}
                            />
                            <p>{project.acf.project_overview}</p>
                            <div className="tools-list mt-4">
                                <h4 className="font-semibold text-lg">
                                    Tools Used:
                                </h4>
                                <ul className="tools-used flex flex-wrap">
                                    {project.tools.map((tool, idx) => (
                                        <li
                                            key={idx}
                                            className="flex justify-center items-center border border-solid rounded-bl-lg rounded-tr-lg w-40 h-10 m-2 single-tool"
                                        >
                                            {tool[0]}
                                            <img
                                                className="single-svg pl-2 w-8 h-8"
                                                src={tool[1]}
                                                alt={`${tool[0]} icon`}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Accordion;

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

    return (
        <div className="accordion">
            {projects.map((project, index) => (
                <div key={project.id} className="accordion-item mb-4">
                    <button
                        aria-expanded={activeIndex === index}
                        aria-controls={`content-${index}`}
                        id={`accordion-title-${index}`}
                        className="accordion-title text-left w-full p-4 text-lg font-medium rounded-lg transition-colors"
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
                            {/* displaying overview and tools used */}
                            <p>{project.acf.project_overview}</p>
                            <div className="tools-list mt-4">
                                <h4 className="font-semibold text-lg">
                                    Tools Used:
                                </h4>
                                <ul className="tools-used flex flex-wrap">
                                    {project.tools.map((tool, idx) => (
                                        <li
                                            key={idx}
                                            className="flex justify-center text-sm items-center border border-solid rounded-bl-lg rounded-tr-lg w-36 h-10 m-2 single-tool"
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
                            {/* trying to get features loaded into pages*/}
                            <Tabs
                                analysisContent={project.acf.analysis_content}
                                designFeatures={[
                                    {
                                        title: project.acf.design_feature_1
                                            .design_feature_1_title,
                                        imageUrl:
                                            project.acf.design_feature_1
                                                .design_feature_1_image,
                                        description:
                                            project.acf.design_feature_1
                                                .design_feature_1_content,
                                    },
                                    {
                                        title: project.acf.design_feature_2
                                            .design_feature_2_title,
                                        imageUrl:
                                            project.acf.design_feature_2
                                                .design_feature_2_image,
                                        description:
                                            project.acf.design_feature_2
                                                .design_feature_2_content,
                                    },
                                    {
                                        title: project.acf.design_feature_3
                                            .design_feature_3_title,
                                        imageUrl:
                                            project.acf.design_feature_3
                                                .design_feature_3_image,
                                        description:
                                            project.acf.design_feature_3
                                                .design_feature_3_content,
                                    },
                                ]}
                                developmentFeatures={[
                                    {
                                        title: project.acf.dev_feature_1
                                            .dev_feature_1_title,
                                        imageUrl:
                                            project.acf.dev_feature_1
                                                .dev_feature_1_image,
                                        description:
                                            project.acf.dev_feature_1
                                                .dev_feature_1_content,
                                    },
                                    {
                                        title: project.acf.dev_feature_2
                                            .dev_feature_2_title,
                                        imageUrl:
                                            project.acf.dev_feature_2
                                                .dev_feature_2_image,
                                        description:
                                            project.acf
                                                .dev_feature_2_content,
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Accordion2;

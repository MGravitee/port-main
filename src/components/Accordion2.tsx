import { useState, useEffect } from "react";
import { projectsLink } from "../toolbelt/api";
import LoadingSpinner from "./LoadingSpinner";
import Tabs from "./Tabs";
import { GitHubIcon, GlobeIcon } from "../icons/Icons";
import ScrollingLink from "./ScrollingLink";

import { Accordion, AccordionItem, Avatar } from "@nextui-org/react";

function Accordion2() {
    const [restData, setData] = useState<Project[] | null>(null);
    const [isLoaded, setLoadStatus] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(projectsLink);
            if (response.ok) {
                const data = await response.json();
                setData(data);
                setLoadStatus(true);
            } else {
                setLoadStatus(true); // setting load state to true to avoid infinite spinner (although if they're seeing this then restData has already loaded on main check)
                setData([]); // setting restData state to an empty array to trigger the "no projects" message incase projects come back empty
            }
        };
        fetchData();
    }, [projectsLink]);

    console.log({ restData });

    type Tool = [string, string];

    interface Project {
        id: string;
        acf: {
            project_title: string;
            project_featured_image: string;
            project_icon: string;
            project_tagline: string;
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

    interface Feature {
        title: string;
        image: string;
        content: string;
    }

    return (
        <>
            {isLoaded && restData ? (
                <>
                    <Accordion variant="splitted">
                        {restData.map((project) => (
                            <AccordionItem
                                key={project.id}
                                aria-label={project.acf.project_title}
                                startContent={
                                    <Avatar
                                        isBordered 
                                        radius="sm"
                                        src={project.acf.project_icon}
                                    />
                                }
                                subtitle={project.acf.project_tagline}
                                title={project.acf.project_title}
                            >
                                <article className="project-details relative">
                                    {/* displaying overview, links and tools used */}
                                    <h3 className=" mb-4 text-lg lg:text-xl font-medium">
                                        Overview:
                                    </h3>
                                    <p>{project.acf.project_overview}</p>
                                    <nav
                                        className="flex justify-center gap-2
                            mt-6"
                                    >
                                        <ScrollingLink
                                            link={project.acf.project_live_link}
                                        >
                                            <GlobeIcon
                                                className="inline"
                                                size={24}
                                            />{" "}
                                            Live Site
                                        </ScrollingLink>

                                        <ScrollingLink
                                            link={
                                                project.acf.project_github_link
                                            }
                                        >
                                            <GitHubIcon
                                                className="inline"
                                                size={24}
                                            />{" "}
                                            GitHub
                                        </ScrollingLink>
                                    </nav>
                                    <div className="tools-list mt-4">
                                        <h4 className="font-semibold text-lg">
                                            Tools Used:
                                        </h4>
                                        <ul className="tools-used flex justify-center flex-wrap gap-2 ">
                                            {project.tools.map(
                                                (tool, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex gap-1 md:text-medium justify-center text-sm items-center rounded-bl-lg rounded-tr-lg w-32 h-10 single-tool relative"
                                                    >
                                                        {tool[0]}
                                                        <img
                                                            className="max-w-[24px] tool-icon"
                                                            src={tool[1]}
                                                            alt={`${tool[0]} icon`}
                                                        />
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>

                                    {/* Tabs component with analysis, design, and development features */}
                                    <Tabs
                                        analysisContent={{
                                            content:
                                                project.acf.analysis_content,
                                            imageUrl:
                                                project.acf.analysis_image,
                                        }}
                                        designFeatures={[
                                            {
                                                title: project.acf
                                                    .design_feature_1.title,
                                                image: project.acf
                                                    .design_feature_1.image,
                                                content:
                                                    project.acf.design_feature_1
                                                        .content,
                                            },
                                            {
                                                title: project.acf
                                                    .design_feature_2.title,
                                                image: project.acf
                                                    .design_feature_2.image,
                                                content:
                                                    project.acf.design_feature_2
                                                        .content,
                                            },
                                            {
                                                title: project.acf
                                                    .design_feature_3.title,
                                                image: project.acf
                                                    .design_feature_3.image,
                                                content:
                                                    project.acf.design_feature_3
                                                        .content,
                                            },
                                        ]}
                                        developmentFeatures={[
                                            {
                                                title: project.acf.dev_feature_1
                                                    .title,
                                                image: project.acf.dev_feature_1
                                                    .image,
                                                content:
                                                    project.acf.dev_feature_1
                                                        .content,
                                            },
                                            {
                                                title: project.acf.dev_feature_2
                                                    .title,
                                                image: project.acf.dev_feature_2
                                                    .image,
                                                content:
                                                    project.acf.dev_feature_2
                                                        .content,
                                            },
                                        ]}
                                    />
                                </article>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </>
            ) : (
                <LoadingSpinner />
            )}
        </>
    );
}
export default Accordion2;

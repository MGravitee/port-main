import { useState, useEffect } from "react";
import { projectsLink } from "../toolbelt/api";
import LoadingSpinner from "./LoadingSpinner";
import Accordion2, { Project } from "./Accordion";

function Projects() {
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

    return (
        <>
            {isLoaded ? (
                restData && restData.length > 0 ? (
                    <section
                        id="work-section"
                        className="work-section single-section"
                    >
                        <h2 className="text-xl lg:text-3xl font-medium mb-8">
                            Featured Work:
                        </h2>
                        <h3 className="text-l lg:text-2xl font-medium">
                            Recent projects I've completed
                        </h3>
                        <Accordion2 projects={restData} />
                    </section>
                ) : (
                    <section id="work-section" className="work-section">
                        <h2 className="text-lg lg:text-3xl font-medium mb-8">
                            Featured Work:
                        </h2>
                        <p>
                            No projects to show. Womp Womp. Means my CMS is
                            down.
                        </p>
                    </section>
                )
            ) : (
                <div className="h-screen flex items-center justify-center single-section loading-section">
                    <LoadingSpinner />
                </div>
            )}
        </>
    );
}

export default Projects;

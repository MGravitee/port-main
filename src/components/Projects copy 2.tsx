import { useState, useEffect } from "react";
import { projectsLink } from "../toolbelt/api";
import LoadingSpinner from "./LoadingSpinner";
import Accordion2, { Project } from "./Accordion copy";

function Projects3() {
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

    console.log({restData});
    
    return (
        <>
            {isLoaded ? (
                restData && restData.length > 0 ? (
                    <section id="work-section" className="work-section">
                        <h3>Featured Work:</h3>
                        <Accordion2 projects={restData} />
                    </section>
                ) : (
                    <section id="work-section" className="work-section">
                        <h3>Featured Work:</h3>
                        <p>No projects to show.</p>
                    </section>
                )
            ) : (
                <div className="h-screen flex items-center justify-center">
                    <LoadingSpinner />
                </div>
            )}
        </>
    );
}

export default Projects3;
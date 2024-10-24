import { useState, useEffect } from "react";
import { aboutLink } from "../toolbelt/api";
import LoadingSpinner from "./LoadingSpinner";

function About() {
    const [aboutData, setData] = useState(null);
    const [isLoaded, setLoadStatus] = useState(false);

    interface aboutData {
        acf: {
            about_content_1: string;
            about_content_2: string;
            things_i_enjoy: string;
        };
    }

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
    }, [aboutLink]);

    console.log(aboutData);

    return (
        <>
            {isLoaded ? (
                <>
                    <section id="about-section" className="about-section xl:hidden">
                        <h2>Get to know me</h2>
                        <p>{aboutData.acf.about_content_1}</p>
                        <p>{aboutData.acf.about_content_2}</p>
                    </section>
                </>
            ) : (
                <LoadingSpinner />
            )}
        </>
    );
}

export default About;

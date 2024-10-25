import { useState, useEffect } from "react";
import { aboutLink } from "../toolbelt/api";
import LoadingSpinner from "./LoadingSpinner";

type aboutData = {
    acf: {
        about_content_1: string;
        about_content_2: string;
        things_i_enjoy: string;
    };
}
function About() {
    const [restData, setData] = useState<aboutData | null>(null);
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
    }, [aboutLink]);

    console.log(restData);

    return (
        <>
            {isLoaded && !!restData ? ( //learned about the !! for converting to boolean for an even more explicit check.pretty cool
                <>
                    <section id="about-section" className="about-section">
                        <h2 className="text-lg lg:text-3xl font-medium mb-4">Get to know me</h2>
                        <p>{restData.acf.about_content_1}</p>
                        <p>{restData.acf.about_content_2}</p>
                    </section>
                </>
            ) : (
                <LoadingSpinner />
            )}
        </>
    );
}

export default About;

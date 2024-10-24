import { useEffect, useState } from "react";
import { optionsLink } from "../toolbelt/api";
import { LinkedInIcon, GitHubIcon } from "../icons/Icons";
import LoadingSpinner from "./LoadingSpinner";
import CopyEmailBtn from "./CopyEmailBtn";

function DeskFooter() {

    interface contactData {
        email_link: string;
        github_link: string;
        linkedin_link: string;
    }





    const [contactData, setData] = useState({});
    const [isLoaded, setLoadStatus] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(optionsLink);
            if (response.ok) {
                const data = await response.json();
                setData(data);
                setLoadStatus(true);
            } else {
                setLoadStatus(false);
            }
        };
        fetchData();
    }, [optionsLink]);

    console.log(contactData);

    return (
        <>
            {isLoaded ? (
                <footer id="contact-section" className="mb-14 hidden lg:flex flex-col justify-center gap-5  ">
                    
                    <div
                        className="social-links flex justify-around">
                        <a href={contactData.linkedin_link} target="_blank">
                            <LinkedInIcon size={40} className="hover;"/>
                        </a>
                        
                        <CopyEmailBtn email={contactData.email_link}/>
                        <a href={contactData.github_link} target="_blank">
                            <GitHubIcon size={40} />
                        </a>
                    </div>
                    <div className="copyright-text">
                    <p className="footer-txt text-center text-sm md:text-medium">
                      © Matt Garvey 2024 | All Rights Reserved</p>
                    </div>
                </footer>
            ) : (
                <LoadingSpinner />
            )}
        </>
    );
}

export default DeskFooter;

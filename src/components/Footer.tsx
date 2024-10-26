import { useEffect, useState } from "react";
import { optionsLink } from "../toolbelt/api";
import { LinkedInIcon, GitHubIcon } from "../icons/Icons";
import LoadingSpinner from "./LoadingSpinner";
import CopyEmailBtn from "./CopyEmailBtn";
import { MagnetButtonLnkd, MagnetButtonGit } from "./MagnetBtns";

export function DeskFooter() {

    interface contactData {
        email_link: string;
        github_link: string;
        linkedin_link: string;
    }

    const [restData, setData] = useState<contactData | null>(null);
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

    console.log(restData);

    return (
        <>
            {isLoaded && !!restData ? (
                <footer id="contact-section" className="mb-14 hidden lg:flex flex-col gap-5  ">
                    
                    <div className="social-links flex flex-col w-fit absolute top-40 left-[60%] -translate-x-[50%]">
                        <MagnetButtonLnkd link={restData.linkedin_link} />
                        <MagnetButtonGit link={restData.github_link} />
                    </div>
                    <div className="email-container">
                        <CopyEmailBtn email={restData.email_link}/>
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


export function FooterMobi() {

    interface contactData {
        email_link: string;
        github_link: string;
        linkedin_link: string;
    }

    const [restData, setData] = useState<contactData | null>(null);
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

    return (
        <>
            {isLoaded && !!restData ? (
                <footer
                    id="contact-section"
                    className=" flex flex-col justify-center gap-5 lg:hidden"
                >
                    <div className="contact-heading">
                        <h2 className="contact-title">Get in Touch</h2>
                    </div>
                    <div className="social-links flex justify-around">
                        <a href={restData.linkedin_link} target="_blank">
                            <LinkedInIcon size={40} className="hover;" />
                        </a>
                        <CopyEmailBtn email={restData.email_link} />
                        <a href={restData.github_link} target="_blank">
                            <GitHubIcon size={40} />
                        </a>
                    </div>
                    <div className="copyright-text">
                        <p className="footer-txt text-center mt-28">
                            © Matt Garvey 2024 | All Rights Reserved
                        </p>
                    </div>
                </footer>
            ) : (
                <LoadingSpinner />
            )}
        </>
    );
}
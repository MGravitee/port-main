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
                <footer className="mb-14 hidden lg:flex flex-col gap-5 z-10 ">
                    <div className="social-links flex justify-between">
                        <CopyEmailBtn email={restData.email_link} />
                        <nav className="flex gap-10">
                            <a href={restData.linkedin_link} target="_blank" className="hover:scale-110 transition-all">
                                <LinkedInIcon size={40} />
                            </a>
                            <a href={restData.github_link} target="_blank" className="hover:scale-110 transition-all">
                                <GitHubIcon size={40} />
                            </a>
                        </nav>
                    </div>
                    <div className="copyright-text">
                        <p className="footer-txt text-center text-sm">
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
                        <h2 className="contact-title text-2xl md:text-3xl xl:text-4xl font-medium mb-8">
                            Get in Touch
                        </h2>
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
                        <p className="footer-txt text-center text-sm mt-28 mb-2">
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

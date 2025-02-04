import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@heroui/react";
import { uxLink } from "../toolbelt/api";
import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { UXData } from "../types/Interfaces";

export default function UXModal() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [restData, setData] = useState<UXData[] | null>(null);
    const [isLoaded, setLoadStatus] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(uxLink);
            if (response.ok) {
                const data = await response.json();
                setData(data);
                setLoadStatus(true);
            } else {
                setLoadStatus(false);
            }
        };
        fetchData();
    }, [uxLink]);

    console.log({ restData });

    //function to travel to project when clicking view project button on modal
    const viewProjectClick = () => {
        const url = "https://mattgravitee.com/007/";
        window.open(url, "_blank"); // Wow this is way less annoying than having to contantly be using noopener norefer
    };

    return (
        <>
            {isLoaded && restData ? (
                <>
                    {restData.map((UXData) => (
                        <div key={UXData.id} className="modal-item max-w">
                            <Button
                                className="ux-button h-20 relative grid grid-cols-[auto_1fr_auto] gap-4 items-center text-left w-full py-4 px-6 text-lg font-medium transition-colors bg-content1 shadow-medium rounded-[1rem] hover:bg-content2"
                                onPress={onOpen}
                            >
                                {/* icon */}
                                <span className="w-12 h-12 flex items-center justify-center">
                                    <img
                                        src={UXData.acf.icon}
                                        alt="Project logo/icon"
                                        className="w-full h-full object-contain"
                                    />
                                </span>

                                {/* title and tagline */}
                                <div>
                                    <h3 className="block font-bold">
                                        {UXData.acf.title}
                                    </h3>
                                    <p className="block text-sm text-content3-foreground">
                                        {UXData.acf.tagline}
                                    </p>
                                </div>
                            </Button>
                            <Modal
                                backdrop="opaque"
                                isOpen={isOpen}
                                motionProps={{
                                    variants: {
                                        enter: {
                                            y: 0,
                                            opacity: 1,
                                            transition: {
                                                duration: 0.5,
                                                ease: "easeOut",
                                            },
                                        },
                                        exit: {
                                            y: -20,
                                            opacity: 0,
                                            transition: {
                                                duration: 0.4,
                                                ease: "easeIn",
                                            },
                                        },
                                    },
                                }}
                                size={"5xl"}
                                scrollBehavior={"inside"}
                                onOpenChange={onOpenChange}
                                placement={"top"}
                                classNames={{
                                    backdrop:
                                        "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
                                }}
                            >
                                <ModalContent className="transition-all">
                                    {(onClose) => (
                                        <>
                                            <ModalHeader className="grid grid-cols-[auto_1fr_auto] gap-4 items-center text-left">
                                                {/* icon */}
                                                <span className="w-12 h-12 flex items-center justify-center">
                                                    <img
                                                        src={UXData.acf.icon}
                                                        alt="Project logo/icon"
                                                        className="w-full h-full object-contain"
                                                    />
                                                </span>

                                                {/* title and tagline */}
                                                <div>
                                                    <h3 className="block font-bold text-lg lg:text-xl">
                                                        {UXData.acf.title_long}
                                                    </h3>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody>
                                                <article>
                                                    <h4 className="font-semibold text-lg lg:text-xl my-8">
                                                        Overview:
                                                    </h4>
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html:
                                                                UXData.acf
                                                                    .overview ||
                                                                "Coming Soon...",
                                                        }}
                                                    />
                                                    <div className="tools-list mt-4 mb-8">
                                                        <h4 className="font-semibold text-lg lg:text-xl my-8">
                                                            Tools Used:
                                                        </h4>
                                                        <ul className="tools-used flex justify-center flex-wrap gap-2 ">
                                                            <li className="flex gap-1 md:text-medium justify-center text-sm items-center border-solid bg-content2 shadow-medium rounded-medium border-current rounded-bl-lg rounded-tr-lg w-32 h-10 md:w-36 single-tool relative hover:bg-content3 transition-all">
                                                                {
                                                                    UXData.acf
                                                                        .tool_text_1
                                                                }
                                                                <img
                                                                    className="max-w-[24px] tool-icon"
                                                                    src={
                                                                        UXData
                                                                            .acf
                                                                            .tool_img_1
                                                                    }
                                                                    alt={`${
                                                                        UXData
                                                                            .acf
                                                                            .tool_text_1
                                                                    } icon`}
                                                                />
                                                            </li>
                                                            <li className="flex gap-1 md:text-medium justify-center text-sm items-center border-solid bg-content2 shadow-medium rounded-medium border-current rounded-bl-lg rounded-tr-lg w-32 h-10 md:w-36 single-tool relative hover:bg-content3 transition-all">
                                                                {
                                                                    UXData.acf
                                                                        .tool_text_2
                                                                }
                                                                <img
                                                                    className="max-w-[24px] tool-icon"
                                                                    src={
                                                                        UXData
                                                                            .acf
                                                                            .tool_img_2
                                                                    }
                                                                    alt={`${
                                                                        UXData
                                                                            .acf
                                                                            .tool_text_2
                                                                    } icon`}
                                                                />
                                                            </li>
                                                            <li className="flex gap-1 md:text-medium justify-center text-sm items-center border-solid bg-content2 shadow-medium rounded-medium border-current rounded-bl-lg rounded-tr-lg w-32 h-10 md:w-36 single-tool relative hover:bg-content3 transition-all">
                                                                {
                                                                    UXData.acf
                                                                        .tool_text_3
                                                                }
                                                                <img
                                                                    className="max-w-[24px] tool-icon"
                                                                    src={
                                                                        UXData
                                                                            .acf
                                                                            .tool_img_3
                                                                    }
                                                                    alt={`${
                                                                        UXData
                                                                            .acf
                                                                            .tool_text_3
                                                                    } icon`}
                                                                />
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="media-wrapper flex justify-center w-full mb-8">
                                                        <video
                                                            key={
                                                                UXData.acf.video
                                                            }
                                                            className="w-full h-auto rounded-md aspect-video"
                                                            autoPlay
                                                            loop
                                                            muted
                                                            preload="auto"
                                                        >
                                                            <source
                                                                src={
                                                                    UXData.acf
                                                                        .video
                                                                }
                                                                type="video/mp4"
                                                            />
                                                            Your browser does
                                                            not support the
                                                            video tag.
                                                        </video>
                                                    </div>
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html:
                                                                UXData.acf
                                                                    .content_1 ||
                                                                "Coming Soon...",
                                                        }}
                                                    />
                                                </article>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button
                                                    color="danger"
                                                    variant="light"
                                                    onPress={onClose}
                                                >
                                                    Close
                                                </Button>
                                                <Button
                                                    color="warning"
                                                    //want it to close the modal and open the link to project
                                                    onPress={() => {
                                                        viewProjectClick();
                                                        onClose();
                                                    }}
                                                >
                                                    View Project
                                                </Button>
                                            </ModalFooter>
                                        </>
                                    )}
                                </ModalContent>
                            </Modal>
                        </div>
                    ))}
                </>
            ) : (
                <LoadingSpinner />
            )}
        </>
    );
}

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@nextui-org/react";
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

    const viewProjectClick = () => {
        // Replace with your desired link
        const url = "https://mattgravitee.com/007/";
        window.open(url, "_blank"); // Opens the link in a new tab
    };

    return (
        <>
            {isLoaded && restData ? (
                <>
                    <section>
                        {restData.map((UXData) => (
                            <div key={UXData.id} className="modal-item max-w">
                                <Button
                                    className="ux-button h-20 shadow-md grid grid-cols-[auto_1fr_auto] gap-4 items-center text-left w-fit py-4 px-6 text-lg font-medium"
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
                                    <ModalContent>
                                        {(onClose) => (
                                            <>
                                                <ModalHeader className="flex flex-col gap-1">
                                                    {UXData.acf.title_long}
                                                </ModalHeader>
                                                <ModalBody>
                                                    <article>
                                                        <div className="media-wrapper flex justify-center w-full">
                                                            <video
                                                                key={
                                                                    UXData.acf
                                                                        .video
                                                                }
                                                                className="w-full h-auto rounded-md aspect-video"
                                                                autoPlay
                                                                loop
                                                                muted
                                                                preload="auto"
                                                            >
                                                                <source
                                                                    src={
                                                                        UXData
                                                                            .acf
                                                                            .video
                                                                    }
                                                                    type="video/mp4"
                                                                />
                                                                Your browser
                                                                does not support
                                                                the video tag.
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
                    </section>
                </>
            ) : (
                <LoadingSpinner />
            )}
        </>
    );
}

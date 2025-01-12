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
import { motion } from "framer-motion";

interface UXData {
    id: string;
    acf: {
        title: string;
        icon: {
            url: string;
        };
        video: string;
        content_1: string;
    };
}

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

    return (
        <>
            {isLoaded && restData ? (
                <>
                    <section>
                        {restData.map((UXData, index) => (
                            <div key={UXData.id} className="modal-item max-w">
                                <Button onPress={onOpen}>
                                    {/* icon */}
                                    <span className="w-10 h-10 flex items-center justify-center">
                                        <img
                                            src={UXData.acf.icon.url}
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
                                            this
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
                                    classNames={{
                                        backdrop:
                                            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
                                    }}
                                >
                                    <ModalContent>
                                        {(onClose) => (
                                            <>
                                                <ModalHeader className="flex flex-col gap-1">
                                                    {UXData.acf.title}
                                                </ModalHeader>
                                                <ModalBody>
                                                    <div className="media-wrapper flex justify-center w-full">
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
                                                        onPress={onClose}
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

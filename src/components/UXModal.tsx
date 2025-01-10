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
        title: string;
        icon: string;
        video: string;
        content: string;
    }



export default function UXModal() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button onPress={onOpen}>Open Modal</Button>
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
                                Modal Title
                            </ModalHeader>
                            <ModalBody>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Nullam pulvinar risus non
                                    risus hendrerit venenatis. Pellentesque sit
                                    amet hendrerit risus, sed porttitor quam.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Nullam pulvinar risus non
                                    risus hendrerit venenatis. Pellentesque sit
                                    amet hendrerit risus, sed porttitor quam.
                                </p>
                                <p>
                                    Magna exercitation reprehenderit magna aute
                                    tempor cupidatat consequat elit dolor
                                    adipisicing. Mollit dolor eiusmod sunt ex
                                    incididunt cillum quis. Velit duis sit
                                    officia eiusmod Lorem aliqua enim laboris do
                                    dolor eiusmod. Et mollit incididunt nisi
                                    consectetur esse laborum eiusmod pariatur
                                    proident Lorem eiusmod et. Culpa deserunt
                                    nostrud ad veniam.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Nullam pulvinar risus non
                                    risus hendrerit venenatis. Pellentesque sit
                                    amet hendrerit risus, sed porttitor quam.
                                    Magna exercitation reprehenderit magna aute
                                    tempor cupidatat consequat elit dolor
                                    adipisicing. Mollit dolor eiusmod sunt ex
                                    incididunt cillum quis. Velit duis sit
                                    officia eiusmod Lorem aliqua enim laboris do
                                    dolor eiusmod. Et mollit incididunt nisi
                                    consectetur esse laborum eiusmod pariatur
                                    proident Lorem eiusmod et. Culpa deserunt
                                    nostrud ad veniam.
                                </p>
                                <p>
                                    Mollit dolor eiusmod sunt ex incididunt
                                    cillum quis. Velit duis sit officia eiusmod
                                    Lorem aliqua enim laboris do dolor eiusmod.
                                    Et mollit incididunt nisi consectetur esse
                                    laborum eiusmod pariatur proident Lorem
                                    eiusmod et. Culpa deserunt nostrud ad
                                    veniam. Lorem ipsum dolor sit amet,
                                    consectetur adipiscing elit. Nullam pulvinar
                                    risus non risus hendrerit venenatis.
                                    Pellentesque sit amet hendrerit risus, sed
                                    porttitor quam. Magna exercitation
                                    reprehenderit magna aute tempor cupidatat
                                    consequat elit dolor adipisicing. Mollit
                                    dolor eiusmod sunt ex incididunt cillum
                                    quis. Velit duis sit officia eiusmod Lorem
                                    aliqua enim laboris do dolor eiusmod. Et
                                    mollit incididunt nisi consectetur esse
                                    laborum eiusmod pariatur proident Lorem
                                    eiusmod et. Culpa deserunt nostrud ad
                                    veniam.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Nullam pulvinar risus non
                                    risus hendrerit venenatis. Pellentesque sit
                                    amet hendrerit risus, sed porttitor quam.
                                </p>
                                <p>
                                    Magna exercitation reprehenderit magna aute
                                    tempor cupidatat consequat elit dolor
                                    adipisicing. Mollit dolor eiusmod sunt ex
                                    incididunt cillum quis. Velit duis sit
                                    officia eiusmod Lorem aliqua enim laboris do
                                    dolor eiusmod. Et mollit incididunt nisi
                                    consectetur esse laborum eiusmod pariatur
                                    proident Lorem eiusmod et. Culpa deserunt
                                    nostrud ad veniam.
                                </p>
                                <p>
                                    Mollit dolor eiusmod sunt ex incididunt
                                    cillum quis. Velit duis sit officia eiusmod
                                    Lorem aliqua enim laboris do dolor eiusmod.
                                    Et mollit incididunt nisi consectetur esse
                                    laborum eiusmod pariatur proident Lorem
                                    eiusmod et. Culpa deserunt nostrud ad
                                    veniam. Lorem ipsum dolor sit amet,
                                    consectetur adipiscing elit. Nullam pulvinar
                                    risus non risus hendrerit venenatis.
                                    Pellentesque sit amet hendrerit risus, sed
                                    porttitor quam. Magna exercitation
                                    reprehenderit magna aute tempor cupidatat
                                    consequat elit dolor adipisicing. Mollit
                                    dolor eiusmod sunt ex incididunt cillum
                                    quis. Velit duis sit officia eiusmod Lorem
                                    aliqua enim laboris do dolor eiusmod. Et
                                    mollit incididunt nisi consectetur esse
                                    laborum eiusmod pariatur proident Lorem
                                    eiusmod et. Culpa deserunt nostrud ad
                                    veniam.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                                <Button color="warning" onPress={onClose}>
                                    View Project
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

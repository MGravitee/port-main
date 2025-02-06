import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@heroui/react";
import { uxLink } from "../toolbelt/api";
import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { UXData } from "../types/Interfaces";

export default function UXModal() {
    const [restData, setData] = useState<UXData[] | null>(null);
    const [isLoaded, setLoadStatus] = useState(false);
    const [openModalId, setOpenModalId] = useState<string | null>(null); // Track open modal by ID

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
    }, []);

    console.log({ restData });

    // Open specific modal
    const openModal = (id: string) => setOpenModalId(id);
    const closeModal = () => setOpenModalId(null);

    // Function to travel to project when clicking "View Project" button
    const viewProjectClick = (url: string) => {
        window.open(url, "_blank");
        closeModal(); // Close modal after opening the link
    };

    return (
        <>
            {isLoaded && restData ? (
                <>
                    {restData.map((uxItem) => (
                        <div key={uxItem.id} className="modal-item max-w mb-8 mt-12">
                            <Button
                                className="ux-button h-20 relative grid grid-cols-[auto_1fr_auto] gap-4 items-center text-left w-full py-4 px-6 text-lg font-medium transition-colors bg-content1 shadow-medium rounded-[1rem] hover:bg-content2"
                                onPress={() => openModal(uxItem.id)}
                            >
                                {/* icon */}
                                <span className="w-12 h-12 flex items-center justify-center">
                                    <img
                                        src={uxItem.acf.icon}
                                        alt="Project logo/icon"
                                        className="w-full h-full object-contain"
                                    />
                                </span>

                                {/* title and tagline */}
                                <div>
                                    <h3 className="block font-bold">
                                        {uxItem.acf.title}
                                    </h3>
                                    <p className="block text-sm text-content3-foreground">
                                        {uxItem.acf.tagline}
                                    </p>
                                </div>
                            </Button>

                            {/* Modal */}
                            <Modal
                                backdrop="opaque"
                                isOpen={openModalId === uxItem.id}
                                onOpenChange={closeModal}
                                motionProps={{
                                    variants: {
                                        enter: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
                                        exit: { y: -20, opacity: 0, transition: { duration: 0.4, ease: "easeIn" } },
                                    },
                                }}
                                size={"5xl"}
                                scrollBehavior={"inside"}
                                placement={"top"}
                                classNames={{
                                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
                                }}
                            >
                                <ModalContent className="transition-all">
                                        <>
                                            <ModalHeader className="grid grid-cols-[auto_1fr_auto] gap-4 items-center text-left">
                                                <span className="w-12 h-12 flex items-center justify-center">
                                                    <img
                                                        src={uxItem.acf.icon}
                                                        alt="Project logo/icon"
                                                        className="w-full h-full object-contain"
                                                    />
                                                </span>

                                                <div>
                                                    <h3 className="block font-bold text-lg lg:text-xl">
                                                        {uxItem.acf.title_long}
                                                    </h3>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody>
                                                <article>
                                                    <h4 className="font-semibold text-lg lg:text-xl my-8">Overview:</h4>
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: uxItem.acf.overview || "Coming Soon...",
                                                        }}
                                                    />
                                                    <div className="tools-list mt-4 mb-8">
                                                        <h4 className="font-semibold text-lg lg:text-xl my-8">Tools Used:</h4>
                                                        <ul className="tools-used flex justify-center flex-wrap gap-2">
                                                            {[1, 2, 3].map((i) => (
                                                                <li
                                                                    key={i}
                                                                    className="flex gap-1 md:text-medium justify-center text-sm items-center border-solid bg-content2 shadow-medium rounded-medium border-current rounded-bl-lg rounded-tr-lg w-32 h-10 md:w-36 single-tool relative hover:bg-content3 transition-all"
                                                                >
                                                                    {uxItem.acf[`tool_text_${i}` as keyof typeof uxItem.acf]}
                                                                    <img
                                                                        className="max-w-[24px] tool-icon"
                                                                        src={uxItem.acf[`tool_img_${i}` as keyof typeof uxItem.acf]}
                                                                        alt={`${uxItem.acf[`tool_text_${i}` as keyof typeof uxItem.acf]} icon`}
                                                                    />
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div className="media-wrapper flex justify-center w-full mb-8">
                                                        <video
                                                            className="w-full h-auto rounded-md aspect-video"
                                                            autoPlay
                                                            loop
                                                            muted
                                                            preload="auto"
                                                        >
                                                            <source src={uxItem.acf.video} type="video/mp4" />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    </div>
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: uxItem.acf.content_1 || "Coming Soon...",
                                                        }}
                                                    />
                                                </article>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button color="danger" variant="light" onPress={closeModal}>
                                                    Close
                                                </Button>
                                                <Button color="warning" onPress={() => viewProjectClick("https://mattgravitee.com/007/")}>
                                                    View Project
                                                </Button>
                                            </ModalFooter>
                                        </>
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

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Tabs,
    Tab,
    Card,
    CardBody,
    CardHeader,
} from "@nextui-org/react";

export default function UXModal() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    let tabs = [
        {
            id: "photos",
            label: "Photos",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
            id: "music",
            label: "Music",
            content:
                "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        },
        {
            id: "videos",
            label: "Videos",
            content:
                "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
    ];

    return (
        <>
            <Button onPress={onOpen}>Open Modal</Button>
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
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
                                <div className="flex w-full flex-col">
                                    <Tabs
                                        aria-label="Dynamic tabs"
                                        items={tabs}
                                        variant="bordered"
                                    >
                                        {(item) => (
                                            <Tab
                                                key={item.id}
                                                title={item.label}
                                            >
                                                <Card>
                                                    <CardBody>
                                                        {item.content}
                                                    </CardBody>
                                                </Card>
                                            </Tab>
                                        )}
                                    </Tabs>
                                </div>
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

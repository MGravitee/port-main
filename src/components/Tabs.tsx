import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "../icons/Icons";

//Why oh why did I not just use a library for this.... oh my god react functional components in my sleep.
//Honestly making this tabs component with pagination and everything was incredibly hard, I had alot of
//help from stack overflow and some chatGPT action when I couldn't get it.

interface TabsProps {
    analysisContent: AnalysisContent; // image + HTML content to dangerously set
    designFeatures: Feature[];
    developmentFeatures: Feature[];
}

export interface Feature {
    title: string;
    image: string;
    content: string;
}

export interface AnalysisContent {
    content: string;
    imageUrl: string; // actually a video URL (mp4)
}

//animation variants for transitions on page/tab switch

const pageVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
};

const tabVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
};

// using memo here to stop re-renders if component props haven't changed.

const Tabs: React.FC<TabsProps> = React.memo(
    ({
        //attempting to get the videos to keep re-rendering on page switch
        analysisContent,
        designFeatures,
        developmentFeatures,
    }) => {
        const [activeTab, setActiveTab] = useState<string>("analysis"); //setting active tab to load right content
        const [currentPage, setCurrentPage] = useState<number>(0); //setting page to load correct feature
        const [isInitialPage, setIsInitialPage] = useState<boolean>(true); //setting initial page to trigger correct animations

        const handleTabChange = (tab: string) => {
            setActiveTab(tab);
            setCurrentPage(0); // resets to first page when switching tabs
            setIsInitialPage(true); // Mark this as an initial page load
        };

        const handleNextPage = (features: Feature[]) => {
            setCurrentPage((prevPage) => (prevPage + 1) % features.length);
            setIsInitialPage(false);
            // goes to the next page, and loops back to 0 if it's the last page
        };

        const handlePreviousPage = (features: Feature[]) => {
            setCurrentPage((prevPage) =>
                prevPage === 0 ? features.length - 1 : prevPage - 1
            );
            setIsInitialPage(false);
            // back previous page, and loops back to the last if it's the first page
        };

        const handlePageClick = (index: number) => {
            setCurrentPage(index);
            setIsInitialPage(false);
        };

        const renderAnalysis = (analysisData: {
            content: string;
            imageUrl: string | undefined;
        }) => {
            const isVideo =
                typeof analysisData.imageUrl === "string" &&
                analysisData.imageUrl.endsWith(".mp4");

            return (
                <motion.article
                    className="analysis-content"
                    variants={tabVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.3 }}
                    exit="exit"
                >
                    <div className="media-wrapper flex justify-center">
                        {isVideo ? (
                            <video
                                key={analysisData.imageUrl}
                                className="w-full h-auto rounded-bl-lg rounded-tr-lg max-w-[41rem] aspect-video"
                                autoPlay
                                loop
                                muted
                                preload="auto"
                            >
                                <source
                                    src={analysisData.imageUrl}
                                    type="video/mp4"
                                />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <img
                                src={analysisData.imageUrl}
                                alt="Analysis media"
                                className="w-full h-auto rounded-bl-lg rounded-tr-lg max-w-[41rem] aspect-video"
                            />
                        )}
                    </div>
                    <div
                        className="dangerouslySetHtmlContent my-8 max-w-[37.5rem] flex flex-col justify-center"
                        dangerouslySetInnerHTML={{
                            __html: analysisData.content || "Coming Soon...",
                        }}
                    />
                </motion.article>
            );
        };
        const renderFeatures = (features: Feature[]) => {
            if (features.length === 0) return <p>No features available.</p>;

            const feature = features[currentPage];
            const isVideo =
                typeof feature.image === "string" &&
                feature.image.endsWith(".mp4");

            return (
                //thank you to @framer motion for making animating these waaaay easier
                //than having to deal with all of the CSS transform/translates yeesh
                <div>
                    <AnimatePresence mode="wait">
                        <motion.article
                            key={currentPage}
                            className="feature-content"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                            variants={
                                isInitialPage ? tabVariants : pageVariants
                            }
                        >
                            <div className="media-wrapper flex justify-center">
                                {isVideo ? (
                                    <video
                                        key={feature.image}
                                        className="w-full h-auto rounded-bl-lg rounded-tr-lg max-w-[41rem]"
                                        autoPlay
                                        loop
                                        muted
                                        preload="auto"
                                    >
                                        <source
                                            src={feature.image}
                                            type="video/mp4"
                                        />
                                        Your browser does not support the video
                                        tag.
                                    </video>
                                ) : feature.image ? (
                                    <img
                                        src={feature.image}
                                        alt={feature.title || "Feature image"}
                                        className="w-full h-auto rounded-bl-lg rounded-tr-lg max-w-[41rem]"
                                    />
                                ) : (
                                    <p>No media available</p>
                                )}
                            </div>
                            <h4 className="font-semibold my-6">
                                {feature.title || "Coming Soon"}
                            </h4>
                            <p className="mb-2">
                                {feature.content ||
                                    "Content will be available soon."}
                            </p>
                        </motion.article>
                    </AnimatePresence>
                    <div className="pagination-buttons mt-4 flex items-center justify-center gap-8">
                        <button
                            onClick={() => handlePreviousPage(features)}
                            className="prev-page-btn"
                            aria-label="Previous feature"
                        >
                            <ArrowLeft size={40} />
                        </button>
                        <div className="flex space-x-1">
                            {features.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePageClick(index)}
                                    className={`h-3 w-3 rounded-full ${
                                        index === currentPage
                                            ? "bg-[#c636d9]"
                                            : "bg-current"
                                    }`}
                                />
                            ))}
                        </div>
                        <button
                            onClick={() => handleNextPage(features)}
                            className="next-page-btn"
                            aria-label="Next feature"
                        >
                            <ArrowRight size={40} />
                        </button>
                    </div>
                </div>
            );
        };

        return (
            <div className="tabs-container">
                <div
                    className="tabs border h-16 rounded-bl-lg rounded-tr-lg gap-2 mb-4 flex justify-center md:gap-6 mt-8"
                    role="tablist"
                    aria-label="Feature Tabs"
                >
                    <button
                        onClick={() => handleTabChange("analysis")}
                        className={`tab-button ${activeTab === "analysis" ? " relative font-bold underline active-tab rounded-bl-lg border rounded-tr-lg p-2" : " rounded-bl-lg rounded-tr-lg p-2"}`}
                        role="tab"
                        aria-selected={activeTab === "analysis"}
                        aria-controls="analysis-panel"
                        id="analysis-tab"
                    >
                        Analysis
                    </button>
                    <button
                        onClick={() => handleTabChange("development")}
                        className={`tab-button ${activeTab === "development" ? "relative font-bold underline active-tab rounded-bl-lg  border rounded-tr-lg p-2" : "rounded-bl-lg rounded-tr-lg p-2"}`}
                        role="tab"
                        aria-selected={activeTab === "development"}
                        aria-controls="development-panel"
                        id="development-tab"
                    >
                        Development
                    </button>
                    <button
                        onClick={() => handleTabChange("design")}
                        className={`tab-button ${activeTab === "design" ? "relative font-bold underline active-tab rounded-bl-lg border rounded-tr-lg p-2" : "rounded-bl-lg rounded-tr-lg p-2"}`}
                        role="tab"
                        aria-selected={activeTab === "design"}
                        aria-controls="design-panel"
                        id="design-tab"
                    >
                        UX + UI
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === "analysis" && (
                        <motion.article
                            key="analysis-tab"
                            variants={tabVariants}
                            role="tabpanel"
                            aria-labelledby="analysis-tab"
                            id="analysis-panel"
                            tabIndex={0}
                        >
                            {renderAnalysis(analysisContent)}
                        </motion.article>
                    )}
                    {activeTab === "development" && (
                        <motion.article
                            key="development-tab"
                            variants={tabVariants}
                            role="tabpanel"
                            aria-labelledby="development-tab"
                            id="development-panel"
                            tabIndex={0}
                        >
                            {renderFeatures(developmentFeatures)}
                        </motion.article>
                    )}
                    {activeTab === "design" && (
                        <motion.article
                            key="design-tab"
                            variants={tabVariants}
                            role="tabpanel"
                            aria-labelledby="design-tab"
                            id="design-panel"
                            tabIndex={0}
                        >
                            {renderFeatures(designFeatures)}
                        </motion.article>
                    )}
                </AnimatePresence>
            </div>
        );
    }
);

export default Tabs;

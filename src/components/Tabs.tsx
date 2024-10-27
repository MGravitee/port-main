import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "../icons/Icons";


interface TabsProps {
  analysisContent: AnalysisContent; // image + HTML content to dangerously set
  designFeatures: Feature[];
  developmentFeatures: Feature[];
}

export interface Feature {
  title: string;
  image: string;
  content: string;
};

export interface AnalysisContent {
  content: string; 
  imageUrl: string; // actually a video URL (mp4)
}


//animation variants for transitions on page/tab switch

const tabVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

const pageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

// using memo here to stop re-renders if component props haven't changed.

const Tabs: React.FC<TabsProps> = React.memo(({ //attempting to get the videos to keep re-rendering on page switch
  analysisContent,
  designFeatures,
  developmentFeatures,
}) => {
  const [activeTab, setActiveTab] = useState<string>("analysis");
  const [currentPage, setCurrentPage] = useState<number>(0);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(0); // resets to first page when switching tabs
  };

  const handleNextPage = (features: Feature[]) => {
    setCurrentPage((prevPage) => (prevPage + 1) % features.length); 
    // goes to the next page, and loops back to 0 if it's the last page
  };

  const handlePreviousPage = (features: Feature[]) => {
    setCurrentPage((prevPage) =>
      prevPage === 0 ? features.length - 1 : prevPage - 1
    );
    // back previous page, and loops back to the last if it's the first page
  };

  const handlePageClick = (index: number) => {
    setCurrentPage(index);
  };

  const renderAnalysis = (analysisData: { content: string; imageUrl: string | undefined }) => {
    const isVideo = typeof analysisData.imageUrl === "string" && analysisData.imageUrl.endsWith(".mp4");
  
    return (
      <motion.article
        className="analysis-content"
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="media-wrapper flex justify-center">
          {isVideo ? (
            <video
              key={analysisData.imageUrl}
              className="w-full h-auto rounded-lg mb-4 max-w-[500px] aspect-video"
              autoPlay
              loop
              muted
              preload="auto"
            >
              <source src={analysisData.imageUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={analysisData.imageUrl}
              alt="Analysis media"
              className="w-full h-auto rounded-lg mb-4 max-w-[500px] aspect-video"
            />
          )}
        </div>
        <div
          className="dangerouslySetHtmlContent mb-2 max-w-[600px] flex flex-col justify-center"
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
    const isVideo = typeof feature.image === "string" && feature.image.endsWith(".mp4");
  
    return (
      //thank you to @framer motion for making animating these waaaay easier 
      //than having to deal with all of the CSS transform/translates yeesh
      <AnimatePresence mode="wait">
          <motion.article
              key={currentPage}
              className="feature-content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
          >
              <div className="media-wrapper flex justify-center">
                  {isVideo ? (
                      <video
                          key={feature.image}
                          className="w-full h-auto rounded-lg max-w-[500px]"
                          autoPlay
                          loop
                          muted
                          preload="auto"
                      >
                          <source src={feature.image} type="video/mp4" />
                          Your browser does not support the video tag.
                      </video>
                  ) : (
                      feature.image ? (
                          <img
                              src={feature.image}
                              alt={feature.title || "Feature image"}
                              className="w-full h-auto rounded-lg mb-4 max-w-[500px]"
                          />
                      ) : (
                          <p>No media available</p>
                      )
                  )}
              </div>
              <h4 className="font-semibold mb-2">
                  {feature.title || "Coming Soon"}
              </h4>
              <p className="mb-2">{feature.content || "Content will be available soon."}</p>

              <div className="pagination-buttons mt-4 flex items-center justify-center space-x-12">
                  <button
                      onClick={() => handlePreviousPage(features)}
                      className="prev-page-btn"
                  >
                      <ArrowLeft size={40} />
                  </button>
                  <div className="flex space-x-1">
                      {features.map((_, index) => (
                          <button
                              key={index}
                              onClick={() => handlePageClick(index)}
                              className={`h-3 w-3 rounded-full ${
                                  index === currentPage ? "bg-pink-400" : "bg-current"
                              }`}
                          />
                      ))}
                  </div>
                  <button
                      onClick={() => handleNextPage(features)}
                      className="next-page-btn"
                  >
                      <ArrowRight size={40} />
                  </button>
              </div>
          </motion.article>
      </AnimatePresence>
  );
};

  return (
    <div className="tabs-container">
      <div className="tabs border-inherit h-12 gap-2 mb-4 flex justify-center md:space-x-12 mt-8 ">
        <button
          onClick={() => handleTabChange("analysis")}
          className={`tab-button ${activeTab === "analysis" ? "font-bold underline active-tab" : ""}`}
        >
          Analysis
        </button>
        <button
          onClick={() => handleTabChange("development")}
          className={`tab-button ${activeTab === "development" ? "font-bold underline active-tab" : ""}`}
        >
          Dev. Features
        </button>
        <button
          onClick={() => handleTabChange("design")}
          className={`tab-button ${activeTab === "design" ? "font-bold underline active-tab" : ""}`}
        >
          Design Insights
        </button>
      </div>
  
      <AnimatePresence mode="wait">
        {activeTab === "analysis" && (
          <motion.div key="analysis-tab" variants={tabVariants}>
            {renderAnalysis(analysisContent)}
          </motion.div>
        )}
        {activeTab === "development" && (
          <motion.div key="development-tab" variants={tabVariants}>
            {renderFeatures(developmentFeatures)}
          </motion.div>
        )}
        {activeTab === "design" && (
          <motion.div key="design-tab" variants={tabVariants}>
            {renderFeatures(designFeatures)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default Tabs;

import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "../icons/Icons";


interface TabsProps {
  analysisContent: AnalysisContent; // image + HTML content to dangerously set
  designFeatures: Feature[];
  developmentFeatures: Feature[];
}

export interface Feature {
  title: string;
  imageUrl: string;
  description: string;
}

export interface AnalysisContent {
  content: string; 
  imageUrl: string; // actually a video URL (mp4)
}

const Tabs: React.FC<TabsProps> = ({
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

  const renderAnalysis = (analysisData: { content: string; imageUrl: string }) => {
    return (
      <div className="analysis-content">
        {/* outputting the video */}
        <video key={analysisData.imageUrl} className="w-full h-auto rounded-lg mb-4 max-w-[600px]" autoPlay loop muted>
          <source src={analysisData.imageUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* rendering the WYSIWYG field, SO DANGEROUS */}
        <div
          className="dangerouslySetHtmlContent"
          dangerouslySetInnerHTML={{ __html: analysisData.content }}
        />
      </div>
    );
  };

  const renderFeatures = (features: Feature[]) => {
    if (features.length === 0) return <p>No features available.</p>;

    const feature = features[currentPage];
    return (
      <article className="feature-content">
        <video key={feature.imageUrl} className="w-full h-auto rounded-lg mb-4 max-w-[600px]" autoPlay loop muted>
          <source src={feature.imageUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <h4 className="font-semibold mb-2">{feature.title}</h4>
        <p>{feature.description}</p>

        <div className="pagination-buttons mt-4 flex items-center justify-center space-x-2">
          <button
            onClick={() => handlePreviousPage(features)}
            className= "prev-page-btn"
          >
           <ArrowLeft size={40} />
          </button>

          {/* dots for pagination */}
          <div className="flex space-x-1">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageClick(index)}
                className={`h-3 w-3 rounded-full ${
                  index === currentPage ? "bg-pink-500" : "bg-current"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => handleNextPage(features)}
            className= "next-page-btn"
          >
            <ArrowRight size={40} />
          </button>
        </div>
      </article>
    );
  };

  return (
    <div className="tabs-container">
      <div className="tabs border gap-2 mb-4 flex justify-center space-x-1 mt-8 ">
        <button
          onClick={() => handleTabChange("analysis")}
          className={`tab-button ${
            activeTab === "analysis" ? "font-bold underline" : ""
          }`}
        >
          Analysis
        </button>
        <button
          onClick={() => handleTabChange("development")}
          className={`tab-button ${
            activeTab === "development" ? "font-bold underline" : ""
          }`}
        >
          Dev. Features
        </button>
        <button
          onClick={() => handleTabChange("design")}
          className={`tab-button ${
            activeTab === "design" ? "font-bold underline" : ""
          }`}
        >
          Design Insights
        </button>
      </div>

      {/* Conditionally Render Content Based on Active Tab */}
      <div className="tab-content">
        {activeTab === "analysis" && renderAnalysis(analysisContent)}
        {activeTab === "development" && renderFeatures(developmentFeatures)}
        {activeTab === "design" && renderFeatures(designFeatures)}
      </div>
    </div>
  );
};

export default Tabs;
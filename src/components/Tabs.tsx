import React, { useState, useEffect } from "react";
import { projectsLink } from "../toolbelt/api";
import LoadingSpinner from "./LoadingSpinner";

interface TabsProps {
    analysisContent: string; // HTML content
    designFeatures: Feature[];
    developmentFeatures: Feature[];
  }

interface Feature {
    title: string;
    imageUrl: string;
    description: string;
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
      setCurrentPage(0); // Reset to first page when switching tabs
    };
  
    const handleNextPage = (features: Feature[]) => {
      if (currentPage < features.length - 1) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    const handlePreviousPage = () => {
      if (currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    const renderFeatures = (features: Feature[]) => {
      if (features.length === 0) return <p>No features available.</p>;
  
      const feature = features[currentPage];
      return (
        <div className="feature-content">
        <video key={feature.imageUrl} className="w-full h-auto rounded-lg mb-4 max-w-[600px]" autoPlay loop muted>
          <source src={feature.imageUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
          <h4 className="font-semibold mb-2">{feature.title}</h4>
          <p>{feature.description}</p>
  
          <div className="pagination-buttons mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
              className="px-4 py-2 bg-gray-200 rounded mr-2"
            >
              Previous
            </button>
            <button
              onClick={() => handleNextPage(features)}
              disabled={currentPage === features.length - 1}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Next
            </button>
          </div>
        </div>
      );
    };
  
    return (
      <div className="tabs-container">
        <div className="tabs mb-4">
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
            className={`tab-button ml-4 ${
              activeTab === "development" ? "font-bold underline" : ""
            }`}
          >
            Development Features
          </button>
          <button
            onClick={() => handleTabChange("design")}
            className={`tab-button ml-4 ${
              activeTab === "design" ? "font-bold underline" : ""
            }`}
          >
            Design Insights
          </button>
        </div>
  
        {/* Conditionally Render Content Based on Active Tab */}
        <div className="tab-content">
          {activeTab === "analysis" && (
            <div
              className="analysis-content"
              dangerouslySetInnerHTML={{ __html: analysisContent }}
            />
          )}
          {activeTab === "development" &&
            renderFeatures(developmentFeatures)}
          {activeTab === "design" && renderFeatures(designFeatures)}
        </div>
      </div>
    );
  };
  
  export default Tabs;
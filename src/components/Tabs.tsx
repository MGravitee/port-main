import React, { useState, useEffect } from "react";
import { projectsLink } from "../toolbelt/api";
import LoadingSpinner from "./LoadingSpinner";

interface TabsProps {
    analysis: string;
    development: string;
    design: string;
}

const Tabs: React.FC<TabsProps> = ({ analysis, development, design }) => {
    const [activeTab, setActiveTab] = useState<string>("analysis");

    const [restData, setData] = useState(null);
    const [isLoaded, setLoadStatus] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(projectsLink);
            if (response.ok) {
                const data = await response.json();
                setData(data);
                setLoadStatus(true);
            } else {
                setLoadStatus(false);
            }
        };
        fetchData();
    }, [projectsLink]);

    console.log(restData);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
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
                    Development
                </button>
                <button
                    onClick={() => handleTabChange("design")}
                    className={`tab-button ml-4 ${
                        activeTab === "design" ? "font-bold underline" : ""
                    }`}
                >
                    Design
                </button>
            </div>

            {/* Conditionally Render Content Based on Active Tab */}
            <div className="tab-content">
                {activeTab === "analysis" && (
                    <div>
                        <h4 className="font-semibold">Analysis</h4>
                        <p>{analysis}</p>
                    </div>
                )}
                {activeTab === "development" && (
                    <div>
                        <h4 className="font-semibold">Development</h4>
                        <p>{development}</p>
                    </div>
                )}
                {activeTab === "design" && (
                    <div>
                        <h4 className="font-semibold">Design</h4>
                        <p>{design}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tabs;

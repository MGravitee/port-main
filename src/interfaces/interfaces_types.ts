//types and interfaces for incoming ACF Data

//Projects

export type Tool = [string, string];

export interface Project {
    id: string;
    acf: {
        project_title: string;
        project_featured_image: string;
        project_icon: string;
        project_tagline:string;
        project_overview: string;
        project_live_link: string;
        project_github_link: string;
        analysis_content: string;
        analysis_image: string;
        design_feature_1: Feature;
        design_feature_2: Feature;
        design_feature_3: Feature;
        dev_feature_1: Feature;
        dev_feature_2: Feature;
    };
    tools: Tool[];
}

export interface Feature {
    title: string;
    image: string;
    content: string;
}


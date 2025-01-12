//Types and Interfaces for all components

//About Component

export interface AboutData {
    acf: {
        about_content_1: string;
        about_content_2: string;
        things_i_enjoy: ThingsIEnjoy[];
    };
}

export interface ThingsIEnjoy {
    content: string;
    image: string;
    title: string;
}

//Accordion Component
export type Tool = [string, string];

export interface Project {
    id: string;
    acf: {
        project_title: string;
        project_tagline: string;
        project_icon: string;
        project_featured_image: string;
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
        dev_feature_3: Feature;
    };
    tools: Tool[];
}

// Tabs Component

export interface Feature {
    title: string;
    image: string;
    content: string;
}

//Tools Component

export interface Tools {
    acf: {
        icon: string;
    };
    id: number;
    name: string;
    parent: number;
}


//UX Projects Component

export interface UXData {
    id: string;
    acf: {
        title: string;
        overview:string;
        tagline: string;
        title_long: string;
        icon: string;
        video: string;
        content_1: string;
    };
}

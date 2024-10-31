import { useState, useEffect } from "react";
import { toolsLink } from "../toolbelt/api";
import LoadingSpinner from "./LoadingSpinner";
import switchColour from "../toolbelt/headingColours";
import GlowingOutline from "./GlowingOutline";

// Import Swiper modules
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface Tool {
  acf: {
      icon: string;
  };
  id: number;
  name: string;
  parent: number;
}

function ToolsCarousel() {
    const [restData, setData] = useState<Tool[] | null>(null);
    const [isLoaded, setLoadStatus] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(toolsLink);
            if (response.ok) {
                const data = await response.json();
                setData(data);
                setLoadStatus(true);
            } else {
                setLoadStatus(false);
            }
        };
        fetchData();
    }, [toolsLink]);

    const categories = [
        { name: "Design Tricks", parent: 3 },
        { name: "Development Tricks", parent: 4 },
        { name: "Other Tricks", parent: 5 },
    ];

    console.log(restData);
    return (
        <>
            {isLoaded && restData ? (
                <section id="tools-section" className="tools-section">
                    <h2 className="text-lg lg:text-3xl font-medium mb-8">
                        Some Tricks of the Trade:
                    </h2>

                    <Swiper
                        effect={"cards"}
                        loop={true}
                        grabCursor={true}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        modules={[EffectCards, Pagination, Navigation]}
                        className="mySwiper w-[19rem] h-[36rem] md:w-[25rem] md:h-[33rem] mb-12"
                    >
                        {categories.map((category) => (
                            <SwiperSlide
                                className="backdrop-blur backdrop-brightness-75 border-2 border-solid rounded-bl-lg rounded-tr-lg border-current"
                                key={category.parent}
                            >
                                <article
                                    className="border-current tool-container"
                                    key={category.parent}
                                >
                                    <h3
                                        className={`${switchColour(
                                            category.name
                                        )} m-5 tool-category-title md:text-large uppercase lg:text-xl font-bold`}
                                    >
                                        {category.name}
                                    </h3>
                                    <ul className=" border-current flex gap-2 flex-wrap justify-center tool-list">
                                        {restData
                                            .filter(
                                                (tool) =>
                                                    tool.parent ===
                                                    category.parent
                                            )
                                            .map((tool, index) => (
                                                <li
                                                    className="flex gap-1 md:text-medium text-white justify-center text-sm items-center border-solid border-inherit rounded-bl-lg rounded-tr-lg w-32 h-10 md:w-36 single-tool relative"
                                                    key={index}
                                                >
                                                    {tool.name}
                                                    <img
                                                        className="max-w-6 tool-icon"
                                                        src={tool.acf.icon}
                                                        alt={`${tool.name} icon`}
                                                    />
                                                    <GlowingOutline />
                                                </li>
                                            ))}
                                    </ul>
                                </article>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </section>
            ) : (
                <LoadingSpinner />
            )}
        </>
    );
}

export default ToolsCarousel;

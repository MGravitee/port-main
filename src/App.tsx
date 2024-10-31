import { useState, useEffect } from "react";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
import Cursor from "./components/Cursor";
import { restBase } from "./toolbelt/api";
import LoadingSpinner from "./components/LoadingSpinner";
import comingSoonImg from "./assets/comingsoon-lrg.webp";

function App() {
    const [restData, setData] = useState(null);
    const [isLoaded, setLoadStatus] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(restBase);
                if (!response.ok) throw new Error("Couldn't access API data");

                const data = await response.json();
                setData(data);
                setLoadStatus(true);
            } catch (error) {
                console.error("Fetch error: ", error);
                setHasError(true);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (restData) {
            console.log("Data loaded:", restData);
        }
    }, [restData]);

    return (
        <>
            {/* This is checking to make sure API data is actually loading, otherwise loading spinner will run forever, not great */}
            {hasError ? (
                <div className="h-screen flex items-center justify-center relative">
                    <img
                        src={comingSoonImg}
                        alt="a coming soon place holder image, used when API calls fail"
                    />
                    <div
                        className="h-fit absolute top-40 left-[50%] -translate-x-[50%] backdrop-blur backdrop-brightness-75 border-2 border-solid rounded-bl-lg rounded-tr-lg border-current
                    "
                    >
                        <h1 className=" m-2 text-medium lg:text-xl">
                            Boourns, it seems there was an issue loading data
                            from the API. Please try back later when my hosting
                            isn't failing so hard.
                        </h1>
                    </div>
                </div>
            ) : isLoaded ? (
                <div
                    id="site-wrapper"
                    className= "site-wrapper"
                >
                    <LeftSide />
                    <RightSide />
                    <Cursor />
                </div>
            ) : (
                <div className="h-screen flex items-center justify-center">
                    <LoadingSpinner />
                </div>
            )}
        </>
    );
}

export default App;

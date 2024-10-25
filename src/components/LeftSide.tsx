import Hero from "./Hero";
import DeskNav from "./DeskNav";
import BottomNavDesk from "./BottomNavDesk";
import DeskFooter from "./DeskFooter";
import DotGrid2 from "./GridAnimationGridCols";
import DotGrid from "./GridAnimation2";


function LeftSide() {
    return (
        <div
            id="left"
            className="fade-in-slide-up h-screen w-full lg:fixed lg:w-1/2 lg:px-16 xl:px-32"
        >
            <section className="relative mt-20 h-full justify-between lg:flex lg:flex-col lg:gap-2">
                <a
                    aria-label="Skip to content"
                    className="sr-only"
                    href="#work-section"
                >
                    Skip to Content
                </a>
                <Hero />
                <DeskNav />
                <BottomNavDesk />
                <DeskFooter />
                {/* <DotGrid /> */}
                {/* <DotGrid2 /> */}
            </section>
        </div>
    );
}
export default LeftSide;

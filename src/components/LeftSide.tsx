import Hero from "./Hero";
import DeskNav from "./DeskNav";
import BottomNavDesk from "./BottomNavDesk";
import { DeskFooter } from "./Footer";
import ParticlesTest from "./Particles";

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
                <ParticlesTest />
            </section>
        </div>
    );
}
export default LeftSide;

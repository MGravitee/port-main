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
                    {/* Skip to Content Link */}
                        <a
                            href="#work-section"
                            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-4 focus:z-99999999 focus:text-white focus:bg-blue-600 focus:p-2 focus:rounded"
                        >
                            Skip to Main Content
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

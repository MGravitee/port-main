import { AnimatedText } from "../components/AnimatedText";
import ScrollDownBtn from "./ScrollDownBtn";

function Hero() {
    return (
        <header id="home" className="hero-section single-section">
            <div className="hero-text text-center sm:text-left pt-20 sm:pt-10 lg:pt-0">
                <h1 className="hero-heading text-4xl sm:text-5xl md:text-6xl">
                    Matt Garvey
                </h1>
                <div className="animated-text mt-8">
                    <AnimatedText
                        el="h2"
                        text={["UI / UX Designer"]}
                        className="anim-text text-3xl sm:text-4xl md:text-5xl  design-color"
                        repeatDelay={10000}
                    />
                    {/* Haven't been able to test with a screen reader, hence why I'm putting this H2 in */}
                    <h2 className="sr-only">
                        UI / UX Designer Front-End Developer
                    </h2>
                    <AnimatedText
                        el="h2"
                        text={["Front-End Developer"]}
                        className="text-3xl sm:text-4xl md:text-5xl mt-2 dev-color"
                        repeatDelay={10000}
                    />
                </div>
                <ScrollDownBtn />
            </div>
        </header>
    );
}

export default Hero;

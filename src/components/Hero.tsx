import { AnimatedText } from "../components/AnimatedText";
import ScrollDownBtn from "./ScrollDownBtn";


function Hero() {
  return (
        <header id="home" className="hero-section">
          
        <div className="hero-text">
            <h1 className="hero-heading text-3xl sm:text-5xl xl:text-6xl">Matt Gravitee</h1>
              <div className="animated-text mt-8">
                    <AnimatedText
                      el="h2"
                      text={[
                        "UI / UX Designer",
                      ]}
                      className="anim-text text-2xl sm:text-3xl md:text-4xl  design-color"
                      repeatDelay={10000}
                    />
                    {/* Haven't been able to test with a screen reader, hence why I'm putting this H2 in */}
                    <h2 className="sr-only">UI / UX Designer Front-End Developer</h2>
                    <AnimatedText
                      el="h2"
                      text={[
                        "Front-End Developer",
                      ]}
                      className="text-2xl sm:text-3xl md:text-4xl dev-color"
                      repeatDelay={10000}
                    />
                </div>
            <ScrollDownBtn />
          </div>
        </header>
  );
}

export default Hero;

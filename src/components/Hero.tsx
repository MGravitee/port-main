import { AnimatedText } from "../components/AnimatedText";

function Hero() {
  return (
        <section id="home" className="hero-section">
       <h1 className="hero-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl">Matt Gravitee</h1>
          <AnimatedText
            el="h2"
            text={[
              "UI / UX Designer",
            ]}
            className="anim-text text-xl sm:text-2xl md:text-3xl lg:text-4xl design-color"
            repeatDelay={10000}
          />
          <h2 className="sr-only">UI UX Designer Front-End Developer</h2>
          <AnimatedText
            el="h2"
            text={[
              "Front-End Developer",
            ]}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl dev-color"
            repeatDelay={10000}
          />
          
        </section>
  );
}

export default Hero;

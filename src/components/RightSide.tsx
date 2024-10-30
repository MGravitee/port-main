import About from "./About"
import Projects from "./Projects"
import ToolsCarousel from "./Tools"
import { FooterMobi } from "./Footer"
import BottomNavMobi from "./BottomNavMobi"

function RightSide() {
  return (
        
    <main
    id="right"
    className="overflow-hidden lg:ml-auto lg:w-1/2 lg:border-l-4 lg:border-current lg:px-16 2xl:px-32 fade-in-slide-up">

        <Projects />
        <About />
        <ToolsCarousel />
        <FooterMobi />
        <BottomNavMobi />







    </main>

    

  )
}
export default RightSide
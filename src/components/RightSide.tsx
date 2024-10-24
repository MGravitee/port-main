import About from "./About"
import Projects3 from "./Projects copy 2"
import ToolsCarousel from "./Tools copy"
import FooterMobi from "./FooterMobi"
import BottomNavMobi from "./BottomNavMobi"

function RightSide() {
  return (
        
    <main
    id="right no-scroll-bar"
    className="overflow-hidden lg:ml-auto lg:w-1/2 lg:border-l lg:border-current lg:px-16 xl:px-32">

        <Projects3 />
        <About />
        <ToolsCarousel />
        <FooterMobi />
        <BottomNavMobi />







    </main>

    

  )
}
export default RightSide
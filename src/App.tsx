import LeftSide from "./components/LeftSide"
import RightSide from "./components/RightSide"
import Cursor from "./components/Cursor"
import BottomNav from "./components/BottomNav"

function App() {

  return (
    <>
      <div id='site-wrapper' className="site-wrapper">
          <LeftSide />
          <RightSide />
          <Cursor />
      </div>
   </>
  )
}

export default App

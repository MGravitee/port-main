import { useState, useEffect } from "react"
import LeftSide from "./components/LeftSide"
import RightSide from "./components/RightSide"
import Cursor from "./components/Cursor"
import { restBase } from "./toolbelt/api"
import LoadingSpinner from "./components/LoadingSpinner"

function App() {

  const [restData, setData] = useState({})
  const [isLoaded, setLoadStatus] = useState(false)

  useEffect(() => {
      const fetchData = async () => {
          const response = await fetch(restBase)
          if ( response.ok ) {
              const data = await response.json()
              setData(data)
              setLoadStatus(true)
          } else {
              setLoadStatus(false)
          }
      }
      fetchData()
  }, [restBase])
  
console.log(restData)




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

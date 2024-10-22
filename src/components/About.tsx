import { useState, useEffect } from "react"
import { aboutLink } from "../toolbelt/api"
import ScrollDownBtn from "./ScrollDownBtn"
import LoadingSpinner from "./LoadingSpinner"




interface AboutInfo {

  acf: {
    about_content_1: string,
    about_content_2: string,
    things_i_enjoy: string,

    
  }

}


function About() {

const [restData, setData] = useState(null)
const [isLoaded, setLoadStatus] = useState(false)






useEffect(() => {
  const fetchData = async () => {
    const response = await fetch(aboutLink)
    if ( response.ok ) {
      const data = await response.json()
      setData(data)
      setLoadStatus(true)
    } else {
            setLoadStatus(false)
          }
        }
    fetchData()
  }, [aboutLink])
  
  console.log(restData)
 


  return (
    <>
    {isLoaded ? 
        <>
            <section id="about-section" className="about-section">
              <p>{restData.acf.about_content_1}</p>
              <p>{restData.acf.about_content_2}</p>
              




            <ScrollDownBtn />
            </section>
            
        </>


                 : 
                    <LoadingSpinner />
        }
                
</>


    )
}

export default About

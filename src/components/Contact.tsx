import { useEffect, useState } from "react"
import { optionsLink } from "../toolbelt/api"
import { LinkedInIcon, GitHubIcon } from "../icons/Icons"
import LoadingSpinner from "./LoadingSpinner"
import CopyEmailBtn from "./CopyEmailBtn"

function Contact() {

  
    interface contactData {
    email_link: string;
    github_link:string;
    linkedin_link:string;
  
    }
  
  







  const [contactData, setData] = useState(null)
  const [isLoaded, setLoadStatus] = useState(false)

  useEffect(() => {
      const fetchData = async () => {
          const response = await fetch(optionsLink)
          if ( response.ok ) {
              const data = await response.json()
              setData(data)
              setLoadStatus(true)
          } else {  
              setLoadStatus(false)
          }    
      }    
      fetchData()
  }, [optionsLink])    
  
console.log(contactData)  





return (
  <>
      {isLoaded ? 

            <footer  id="contact-section">
                  <div className="contact-heading">
                    <h2 className="contact-title">Get in Touch</h2>
                  </div>
                  <div className="social-links">
                    <a href={contactData.linkedin_link} target="_blank">
                      <LinkedInIcon size={40}/>
                    </a>
                    <a href={contactData.github_link} target="_blank">
                      <GitHubIcon size={40}/>
                    </a>
                    <CopyEmailBtn />
                    
                  </div>
                </footer>
                   : 
                      <LoadingSpinner />
          }
                  
  </>


      )
}

export default Contact


import { useState, useEffect } from 'react'
import { projectsLink } from '../toolbelt/api'
import LoadingSpinner from './LoadingSpinner'
import Accordion2 from './Accordion copy'

function Projects3() {

    const [restData, setData] = useState(null)
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(projectsLink)
            if ( response.ok ) {
                const data = await response.json()
                setData(data)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [projectsLink])
    
console.log(restData)
return (
    <>
        {isLoaded ? 


            <section id='work-section' className='work-section'>

                <h3>Featured Work:</h3>
                <Accordion2 projects={restData} />
            </section>


                     : 
                        <LoadingSpinner />
            }
                    
    </>


        )
}

export default Projects3


import { useState, useEffect } from 'react'
import { projectsLink } from '../toolbelt/api'
import LoadingSpinner from './LoadingSpinner'
import Accordion from './Accordion'


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
            <>
                <Accordion projects={restData} />
            </>


                     : 
                        <LoadingSpinner />
            }
                    
    </>


        )
}

export default Projects3



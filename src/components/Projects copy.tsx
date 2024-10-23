import { useState, useEffect } from 'react'
import { projectsLink } from '../toolbelt/api'
import LoadingSpinner from './LoadingSpinner'
import { Accordion, AccordionItem, Image } from '@nextui-org/react'

function Projects2() {

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

                <h3>Featured Work:</h3>

                <Accordion variant='splitted'>
                {restData.map(project =>
                        <AccordionItem key={project.id} aria-label="Accordion 1" className='project-single' 
                        startContent={
                            <Image
                            className='project-accordion-img'
                            width={300}
                            alt={project.acf.project_title}
                            src={project.acf.project_featured_image}
                          />
                          }
                        title={project.acf.project_title}>
                            {/* <img className="project-img" src={project.acf.project_featured_image} alt={project.acf.project_title} /> */}
                            <p>{project.acf.project_overview}</p>
                                {project.tools.map((tool, index) =>
                                <div key={index} className="tools-used">
                                    <ul className="tools-used">
                                        <li className="flex justify-center items-center border border-solid rounded-bl-lg rounded-tr-lg w-40 h-10 m-2 single-tool">
                                            {tool[0]}
                                            <img className="pl-2 max-w-[36px] h-auto w-auto tool-icon" src={tool[1]} alt={`${tool[0]} icon`} />
                                        </li>
                                    </ul>
                                </div>

                                )}
                        </AccordionItem>
                        ) } 



                </Accordion>        
            </>


                     : 
                        <LoadingSpinner />
            }
                    
    </>


        )
}

export default Projects2



import { useState, useEffect } from 'react'
import { ToolsLink } from '../toolbelt/api'
import LoadingSpinner from './LoadingSpinner'

function ToolsStack() {

    const [toolData, setData] = useState(null)
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(ToolsLink)
            if ( response.ok ) {
                const data = await response.json()
                setData(data)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [ToolsLink])
    
    const categories = [
        { name: 'Design Tools', parent: 3 },
        { name: 'Development Tools', parent: 4 },
        { name: 'Other Tools', parent: 5 }
      ];
      

console.log(toolData)
return (

    <>
        {isLoaded ? 
           <>
           {categories.map((category) => (
             <article className="flex flex-wrap m-8 tool-container" key={category.parent}>
               <h2 className="w-full tool-category-title">{category.name}</h2>
               <ul className="flex flex-wrap tool-list">
                 {toolData
                   .filter((tool) => tool.parent === category.parent)
                   .map((tool, index) => (
                     <li
                       className="flex justify-center items-center border border-solid rounded-bl-lg rounded-tr-lg w-40 p-2 m-2 single-tool"
                       key={index}
                     >
                       {tool.name}
                       <img
                         className="pl-2 max-w-[36px] h-auto w-auto tool-icon"
                         src={tool.acf.icon}
                         alt={`${tool.name} icon`}
                       />
                     </li>
                   ))}
               </ul>
             </article>
           ))}
         </>
                     : 
                        <LoadingSpinner />
            }
                    
    </>

        )     
        
}

export default ToolsStack
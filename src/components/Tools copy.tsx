import { useState, useEffect } from 'react'
import { toolsLink } from '../toolbelt/api'
import LoadingSpinner from './LoadingSpinner'
import switchColour from '../toolbelt/headingColours';

// Import Swiper modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function ToolsCarousel() {

    const [toolData, setData] = useState(null)
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(toolsLink)
            if ( response.ok ) {
                const data = await response.json()
                setData(data)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [toolsLink])
    
    const categories = [
        { name: 'Design Tricks', parent: 3 },
        { name: 'Development Tricks', parent: 4 },
        { name: 'Other Tricks', parent: 5 }
      ];
      

console.log(toolData)
return (

    <>
        {isLoaded ? 
           <>
           <Swiper 
            effect={'cards'}
            loop={true}

            grabCursor={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[EffectCards, Pagination, Navigation]}
            className="mySwiper w-[20.4rem] h-[36rem]"
           >
           {categories.map((category) => (
             <SwiperSlide className=' backdrop-blur border-2 border-solid rounded-bl-lg rounded-tr-lg border-current' key={category.parent}>
                  <article className="tool-container" key={category.parent}>
                  <h2 className={`${switchColour(
                                category.name)} m-3 tool-category-title`}>{category.name}</h2>
                  <ul className=" m-6  flex gap-2 flex-wrap tool-list">
                    {toolData
                      .filter((tool) => tool.parent === category.parent)
                      .map((tool, index) => (
                        <li
                          className="flex gap-1 justify-center text-sm items-center border rounded-bl-lg rounded-tr-lg w-32 h-10 single-tool"
                          key={index}
                        >
                          {tool.name}
                          <img
                            className="max-w-[24px] tool-icon"
                            src={tool.acf.icon}
                            alt={`${tool.name} icon`}
                          />
                        </li>
                      ))}
                  </ul>
                </article>
             </SwiperSlide>
           ))}
            
           </Swiper>
         
         </>
                     : 
                        <LoadingSpinner />
            }
                    
    </>

        )     
        
}

export default ToolsCarousel
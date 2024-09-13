/* eslint-disable react/prop-types */

import { Button } from "@mui/material";
import Aos from "aos";
import "aos/dist/aos.css"
import { Link } from "react-router-dom";

const About = ({About}) => {
  
    Aos.init({
        offset: 200,
        duration: 600,
        easing: 'ease-in-sine',
        delay: 100,
      });
  return (
    <>
      <div  className="flex  md:flex-row-reverse flex-col">
           <div data-aos="fade-right" className="md:w-1/2 w-full bg-white overflow-hidden shadow border p-2">
                {
                  About?.image?<img src={About.image.url} alt="" className="duration-300 hover:scale-105 cursor-pointer" />:<img src="https://www.traveldailynews.asia/wp-content/uploads/2024/01/Tourism-in-Thailand.png" alt="" className="duration-300 hover:scale-105 cursor-pointer" />
                }
           </div>
           <div data-aos="fade-left" className="md:w-1/2 p-4 w-full">
             <div className="flex font-semibold flex-col h-full justify-center items-center gap-y-3">
             <h1 className="md:text-4xl text-2xl my-3">{About?.name}</h1>
             {/* {
              About?.des?.map((data,i)=>(
                <p key={i} className="font-thin mt-3" >{data}</p>
              ))
             } */}
             <p className="px-2 leading-7 text-zinc-500">{About?.des&&About.des[0]} <Link to={"/about"} className="ml-10 mt p-2"><Button variant="contained" color="success" size="small">Read more</Button> </Link> </p>
             </div>
          </div>
      </div>
    </>
  )
}

export default About

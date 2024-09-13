/* eslint-disable react/prop-types */
import { Dialog } from "@mui/material";
import Aos from "aos";
import "aos/dist/aos.css"
import { useState } from "react";

const BlogeCard = ({blog}) => {
  const[open,setOpen]=useState(false)
  console.log(blog)
    Aos.init({
        offset: 200,
        duration: 600,
        easing: 'ease-in-sine',
        delay: 100,
      });
  return (
    <div data-aos="flip-left" className="relative group cursor-pointer overflow-hidden"> 
        <div className="h-72 w-80 p-2 bg-white border shadow rounded">
            {
              blog?.vedio?<video src={blog?.vedio?.url} className="w-full h-full object-cover object-center" autoPlay loop muted ></video>:<video src="https://videos.pexels.com/video-files/5667128/5667128-sd_506_960_30fps.mp4" className="w-full h-full object-cover object-center" autoPlay loop muted ></video>
            }
        </div>

        <div className="absolute group-hover:translate-y-0 top-0 left-0 w-full translate-y-96 flex justify-center items-center h-full bg-[#c6c4c483] duration-300">
         <button onClick={()=>setOpen(!open)} className="p-2 w-32 bg-green-500 font-semibold text-white rounded shadow-lg hover:bg-green-600 duration-300">vew</button>
        </div>
        <Dialog open={open} onClose={()=>setOpen(false)}>
              <div className="  bg-zinc-900">
                 <div className="h-96 w-[30rem] flex justify-center items-center  relative">
                 {
                  blog?.vedio?.url?<video src={blog?.vedio?.url}className="w-full h-full object-cover object-center mx-auto" autoPlay loop muted ></video>:<video src="https://videos.pexels.com/video-files/5667128/5667128-sd_506_960_30fps.mp4" className="w-full h-full object-cover object-center" autoPlay loop  muted></video>
                 }
                 <h1 className="absolute text-4xl text-red-500">{blog?.name}</h1>
                 </div>
              </div>
        </Dialog>
    </div>
  )
}

export default BlogeCard

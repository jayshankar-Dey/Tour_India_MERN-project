import { useEffect, useState } from "react"
import Navbar from "../components/Nav_bar"
import axios from "axios"
import { Container } from "@mui/material"


const About = () => {
     const base="http://localhost:8080/api"
    const[about,setAbout]=useState([])
    ///get about
  const getAbout=async()=>{
    try {
      const res=await axios.get(`${base}/getAbout`)
     setAbout(res.data.data[0])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
      getAbout()
  }, [])

  console.log(about)
  return (
    <>
    <Navbar/>
       <div className="h-[93vh] bg-zinc-200 overflow-scroll">
           <Container>
            
            <div className="w-full h-[30rem] overflow-hidden p-2 bg-white mt-2 rounded shadow ">
            {
                  about?.image?<img src={about.image.url} alt="" className="duration-300 hover:scale-105 object-cover object-center h-full w-full cursor-pointer" />:<img src="https://www.traveldailynews.asia/wp-content/uploads/2024/01/Tourism-in-Thailand.png" alt="" className="duration-300 object-cover object-center h-full w-full hover:scale-105 cursor-pointer" />
                }
            </div>
            <div className="w-full  p-2 bg-white mt-2 rounded shadow ">
               {
                <h1 className="font-semibold text-2xl mb-2 underline"> {about?.name}</h1>
                }

                <div className="flex flex-col py-2 leading-7 gap-y-5">
                    {
                        about?.des?.map((des,i)=>(
                            <p key={i} className="mb-1" >{des}</p>
                        ))
                    }
                </div>
               
            </div>


           </Container>
       </div>
    </>
  )
}

export default About

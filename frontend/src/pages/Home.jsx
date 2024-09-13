
import axios from "axios"
import About from "../components/About"
import BlogeCard from "../components/BlogeCard"
import Contact from "../components/Contact"
import Footer from "../components/Footer"
import Galery_Card from "../components/Galery_Card"
import Navbar from "../components/Navbar"
import Slider from "../components/Slider"
import Ture_Card from "../components/Ture_Card"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import {  Button, CircularProgress, TextField } from "@mui/material"


const Home = () => {
 const base="http://localhost:8080/api"
  const[loading,setLoading]=useState(false)
  const[ture,setTure]=useState([])
  const[state,setState]=useState("")
  const[place,setPlace]=useState("")
  const[Blog,setBlog]=useState([])
  const[Galery,setGalery]=useState([])
  const[about,setAbout]=useState([])
  const[State,setstate]=useState("")
  const[file,setFile]=useState("")
  
  const[prevew,setPrevew]=useState("")
 const[change,setChange]=useState("")
  ///getTurisim
  const getTure=async()=>{
    setLoading(true)
    const res=await axios.get(`${base}/Ture?name=${place}&state=${state}`)
    try {
      if(res.data.success){
        setTure(res.data.data)
      }else{
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error("Server Error")
    }
    setLoading(false)
  }

   ///get galery
   const getGalery=async()=>{
    setLoading(true)
    try {
       const res= await axios.get(`${base}/galeryImage?state=${state}`,{
            headers:{
                'Content-Type':'multipart/form-data',
                Authorization:`Bearer ${localStorage.getItem("Ture")}`,
            },
        })
        setGalery(res.data.data)
        setLoading(false)

    } catch (error) {
        setLoading(false)
    }
}

  useEffect(() => {
     getTure()
     getGalery()
  }, [place,state,change])

   ////get blog
   useEffect(() => {
    const fetchData=async()=>{
      try {
       const res =await axios.get(`${base}/getBlog?name=${place}&state=${state}`,{
          headers:{
              Authorization:`Bearer ${localStorage.getItem("Ture")}`,
          }
       })
        setBlog(res.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [place,state])
  
  
  ///get about
  const getAbout=async()=>{
    try {
      setLoading(true)
      const res=await axios.get(`${base}/getAbout`)
     setAbout(res.data.data[0])
      setLoading(false)
      
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
      getAbout()
  }, [])

  
    ///add galery
    const addGalery=async(e)=>{
      e.preventDefault()
      const formdata=new FormData()
      formdata.append("file",file)
      formdata.append("state",State)
      if(!state&&!file) return toast.error("plesae add state and image")
      try {
         
          setLoading(true)
       const res=   await axios.post(`${base}/galeryImage`,formdata,{
              headers:{
                  'Content-Type':'multipart/form-data',
                  Authorization:`Bearer ${localStorage.getItem("Ture")}`,
              },
          })
          toast.success("Galery added successfully")
          setChange(res.data)
          setFile("")
          setstate("")
          setPrevew("")
          setLoading(false)
      } catch (error) {
          toast.error("Failed to add galery")
          setLoading(false)
      }
  }


  return (
    <>
    <section id="Home" className=" h-screen overflow-y-scroll bg-zinc-100">
      <Navbar/>
     <Slider/>
      <div className="p-4 flex border mt-3  mx-auto shadow overflow-x-scroll justify-center items-center gap-x-2 bg-white md:w-[50rem] sm:flex-row flex-col rounded">
        <input type="text" className=" w-full p-2 outline-none border h-14 rounded" placeholder="State" value={state} onChange={(e)=>setState(e.target.value)} />
        <input type="text" className=" w-full p-2 outline-none border h-14 rounded" placeholder="Place"value={place} onChange={(e)=>setPlace(e.target.value)}/>
        <button className="text-2xl"><ion-icon name="search-outline"></ion-icon></button>
      </div>
    </section>
 
{/* ///ture part */}
<section id="Ture" className=" bg-zinc-100">
  
   <div className="flex justify-center text-zinc-600 p-3  items-center font-bold md:text-4xl text-2xl  *:underline"> 
      <h1> Tour</h1>
    </div>
   <div className="lg:w-[80%]  justify-center flex flex-wrap gap-x-4 p-3 w-full mx-auto">
    {
      ture.length===0?<h1 className="text-2xl text-red-400 animate-bounce">Please Enter Valide Search..</h1> : ture.map((t,i)=><Ture_Card key={i} ture={t}/>)
    }
    </div>
 
   </section>


 
{/* ///Bloge part */}
{Blog.length !==0 &&<section id="Blog" className=" bg-zinc-100">

   <div className="flex justify-center text-zinc-600 p-3  items-center font-bold md:text-4xl text-2xl  *:underline"> 
      <h1>Blogs</h1>
    </div>
   <div className="lg:w-[80%] justify-center flex flex-wrap gap-x-4 p-3  mx-auto">
    {
      Blog.map((data,i)=>(
        <BlogeCard key={i} blog={data}/>
      ))
    }
    {/* {
      Blog.length==0&& <h1><CircularProgress/></h1>
    } */}
    </div>
  
   </section>}

    
{/* ///Galery part */}
{Galery.length !==0 &&<section id="Galery" className=" bg-zinc-100">
<div className="flex justify-center text-zinc-600 p-3  items-center font-bold md:text-4xl text-2xl  *:underline flex-col"> 
      <h1>Gallery</h1>
      <div className="flex justify-end p-2">
   
      </div>

      <form onSubmit={addGalery} className="bg-white justify-center items-center p-2 *:w-full md:*:w-fit gap-y-3  flex gap-x-3  md:flex-row flex-col border rounded shadow">
             <TextField size="small" value={State} label="State" onChange={(e)=>setstate(e.target.value)}/>
              <label htmlFor="file"><ion-icon name="image-outline"></ion-icon></label>
             <TextField type="file" size="small" sx={{display:"none"}} id="file" onChange={(e)=>{
                setFile(e.target.files[0])
                setPrevew(URL.createObjectURL(e.target.files[0]))
                }} />
             <div className=" h-16">
             {prevew&&<img src={prevew} alt="" className="h-full w-full object-cover object-center" />}
             </div>
            <div  className="flex justify-center items-center" >
           {
            loading?<CircularProgress/>:<Button type="submit" variant="contained"><ion-icon name="cloud-upload-outline"></ion-icon></Button>
           }
            </div>
        </form>

    </div>
   <div className="lg:w-[80%]  flex   p-3  mx-auto">
  
  {
    loading? <h1><CircularProgress/></h1> : Galery.map((g,i)=><Galery_Card key={i} galery={g}/>)
  }
    </div>
   </section>
}
    {/* ///about section   */}
    <section id="About" className=" bg-zinc-100">
    <div className="flex justify-center text-zinc-600 p-3  items-center font-bold md:text-4xl text-2xl  *:underline flex-col"> 
      <h1> About</h1>

    </div>
   <div className="lg:w-[80%]  flex   p-3  mx-auto">
   <About About={about}/>
    </div>
   </section>

{/* ///contact part */}
<section id="Contact" className=" bg-zinc-100">
    <div className="flex justify-center text-zinc-600 p-3  items-center font-bold md:text-4xl text-2xl  *:underline flex-col"> 
      <h1> Contact Section</h1>
      <p className="text-sm font-thin my-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae veniam ullam ex dolores, ratione voluptas veritatis soluta consectetur laboriosam a? </p>
    </div>
   <div className="lg:w-[80%]  flex flex-wrap   p-3  mx-auto">
    <Contact/>
    </div>
   </section>

   <Footer/>
    </>
  )
}

export default Home

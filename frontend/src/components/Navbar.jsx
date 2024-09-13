import { useEffect, useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import { Dialog } from "@mui/material"
import Login from "./Login"
import Register from "./Register"
import { loginFalse, loginTrue } from "../redux/LoginSlice"
import MenuBar from "./MenuBar"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import axios from "axios"
const Navbar = () => {
  const[scrool,setScrool]=useState(false)
  const {socket}=useSelector(state=>state.socket)
  const[change,setChange] = useState("")
   const base="http://localhost:8080/api"
  const dispatch=useDispatch()
  const[logintrue,setLoginTrue]=useState(true)
  const [open, setOpen] = useState(false)
  const[notices,setNotices] = useState([])
  const {isLogin}=useSelector((state)=>state.isLogin)
  const[totalNotices,setTotalNotices] = useState(0)
  window.addEventListener("scroll",()=>{
    setScrool(window.scrollY>20)
  })
const[I,setI]=useState(0)
const login=[
  "Login",
  "Register"
]
//get Notification
const getNotification=async()=>{
  const res=await axios.get(`${base}/Notice`,{
    headers:{
      Authorization:`Bearer ${localStorage.getItem("Ture")}`
    }
  })
  setNotices(res.data.Notic)
 setTotalNotices(res.data.total)
  //console.log("Notification get ............................",res.data)
  
}

useEffect(() => {
  socket.on("Notify_Users",data=>{
    //console.log("Notification Received ............................",data)
    toast.success("Notification Received")
   setChange(data)
  
  })
  return () => {
   socket.off()
  };
}, [])

useEffect(()=>{
  getNotification()
},[change])

/// seen Notification
const SeenNotification=async()=>{
  try {
    const res=await axios.put(`${base}/Notice`,{},{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("Ture")}`
      }
    })
    setChange(res.data)
    //toast.success("Notification seen successfully")
  } catch (error) {
    console.log(error)
    toast.error("Failed to see notification")
  }
}

  return (
    <>
    <div className={` h-16 w-full bg-white  shadow ${scrool&&"fixed top-0 left-0 z-30"} flex justify-between items-center`}>
      <div className="h-full md:w-96 w-52 flex justify-center items-center">
        <h1 className="flex text-3xl font-bold text-green-500"><ion-icon name="logo-pwa"></ion-icon> Tour India</h1>
      </div>
      <div className="w-fit pr-6 h-full flex md:gap-x-5 gap-x-3 justify-center items-center">
     
       
     { localStorage.getItem("Ture")&&<Link to={"/admin"} className=" text-white px-3 font-semibold bg-zinc-700 p-1 rounded shadow">Admin</Link>}
        
      {
        localStorage.getItem("Ture")&&<Link to={"/update/profile"} className="md:text-2xl text-blue-900"><ion-icon name="person-outline"></ion-icon></Link>
      }
      
         <button onClick={()=>{
          setOpen(!open)
          SeenNotification()
          }} className="relative md:text-2xl text-blue-800">
          <h3><ion-icon name="notifications-outline"></ion-icon></h3>
          <p className="absolute top-4 text-green-700 font-semibold left-[.5rem] rounded-full text-[13px]">{totalNotices}</p>
          <div className={`absolute ${open?"translate-y-0":"-translate-y-[100rem]"}  -left-52 z-30 w-72 top-12 rounded shadow-lg shadow-zinc-500 max-h-96 h-fit bg-green-100 flex duration-300 flex-col gap-y-2 overflow-scroll p-2`}>
            
            {/* ///notofication */}
           
           {
           notices?.map((notice,i)=>(
            <div key={i} className="p-2 text-sm flex  gap-x-5  bg-white shadow border ">
               <h1><ion-icon name="notifications"></ion-icon></h1>
               <div className="text-left">
               {
                notice.admin?<h1 className=" font-semibold underline">Admin reply</h1>:<h1 className=" font-semibold underline">{notice.userId.name}</h1>
               }
               <h1>{notice.notic}</h1>
               </div>
            </div>
           ))
           }
           {
            notices?.length==0&&<h1 className="text-sm text-center">No Notification</h1>
 
           }


           

          </div>
         </button>
         <Link className=" tpx-3 font-semibold p-1 " to={'/like'}><ion-icon name="heart"></ion-icon></Link>

         <Link to={"/order/ture"} className="md:text-2xl text-blue-900"><ion-icon name="bag-outline"></ion-icon></Link>

         {
          localStorage.getItem("Ture")?<button onClick={()=>{
            localStorage.removeItem("Ture");
            localStorage.removeItem("id");
            toast.success("logout Succesfully")
            window.location.reload()
          }}  className="md:text-2xl text-blue-900"><ion-icon name="log-out-outline"></ion-icon></button>:<button onClick={()=>dispatch(loginTrue())} className="md:text-2xl text-blue-900"><ion-icon name="log-in-outline"></ion-icon></button>
         }
         
      </div>
      
    <Dialog open={isLogin} onClose={()=>dispatch(loginFalse())}>
          
      <div  className="bg-[#ffffff9f]  h-fit flex flex-col justify-center items-center">
        <div className="w-fit md:w-full h-12 p-1 border-b-2 flex gap-x-2 justify-center items-center bg-gray-50">
          {
            login.map((data,i)=>(
              <button onClick={()=>{
                i==0&&setLoginTrue(true)
                i==1&&setLoginTrue(false)
                setI(i)
              }
              } className={`border w-20 p-1 rounded shadow ${I==i&&"bg-blue-500 text-white font-semibold"}`} key={i}>{data}</button>
            ))
          }
        </div>
      {
        logintrue?<Login/>:<Register/>
      }
      </div>

      </Dialog>
    
    
    </div>
    <MenuBar/>
    </>
  )
}

export default Navbar

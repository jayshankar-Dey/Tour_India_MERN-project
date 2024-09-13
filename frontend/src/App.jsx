
import Home from "./pages/Home"
import AdminHome from "./admin/Home"
//import Admin from  "../src/admin/Home"
import {BrowserRouter,Routes ,Route} from 'react-router-dom'
import Single_Ture from "./pages/Single_Ture"
import BookShow from "./pages/BookShow"
import { Toaster } from 'react-hot-toast';
import UpdateProfile from "./components/UpdateProfile";
import Show_Single_Book from "./pages/Show_Single_Book"
import AddBlog from "./admin/AddBlog"
import AddGalery from "./admin/AddGalery"
import About from "./admin/About"
import Contact from "./admin/Contact"
import Chat from "./admin/Chat"
import {io} from 'socket.io-client'
import { useDispatch } from "react-redux"
import { setSocket } from "./redux/SocketSlice"
import LikeTour from "./pages/LikeTour"
import Tour from "./pages/Tour"
import Abouts from "./pages/About"
const App = () => {
  const dispatch=useDispatch()
  dispatch(setSocket(io("http://localhost:8080")))
  return (
    <BrowserRouter>
    <Toaster/>
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/single/ture/:id" element={<Single_Ture />} />
       <Route path="/order/ture" element={<BookShow />} />
       <Route path="/update/profile" element={<UpdateProfile />} />
       <Route path="/single/Book/:id" element={<Show_Single_Book />} />
       <Route path="/admin" element={<AdminHome />} />
       <Route path="/admin/galery" element={<AddGalery />} />
       <Route path="/admin/Blog" element={<AddBlog />} />
       <Route path="/admin/about" element={<About />} />
       <Route path="/admin/contact" element={<Contact />} />
       <Route path="/admin/chat" element={<Chat />} />
       <Route path="/like" element={<LikeTour />} />
       <Route path="/tour" element={<Tour />} />
       <Route path="/about" element={<Abouts />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

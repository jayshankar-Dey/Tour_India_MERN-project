import { Link } from "react-router-dom"


const Navbar = () => {
  return (
    <div className="bg-zinc-800 items-center text-white font-semibold p-3 h-20 flex gap-x-5 ">
        <Link to={"/admin"}>Add Ture</Link>
        <Link to={"/admin/Blog"}>Add Blog</Link>
        <Link to={"/admin/galery"}>Add Galery</Link>
        <Link to={"/admin/about"}>Add About</Link>
        <Link to={"/admin/contact"}>Contact</Link>
        <Link to={"/admin/chat"}>Chats</Link>
    </div>
  )
}

export default Navbar

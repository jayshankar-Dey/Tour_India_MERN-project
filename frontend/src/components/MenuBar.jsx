

const MenuBar = () => {
  return (
    <div className="p-2 shadow-md border bg-green-500 h-10 flex ">
       <div className="w-fit font-semibold text-white  flex gap-x-5 mr-6">
         <a href="#Home" className="">Home</a>
         <a href="#About" className="">About</a>
         <a href="#Ture" className="">Ture</a>
         <a href="#Blog" className="">Blog</a>
         <a href="#Galery" className="">Galery</a>
         <a href="#Contact" className="">Contact</a>
       </div>
    </div>
  )
}

export default MenuBar

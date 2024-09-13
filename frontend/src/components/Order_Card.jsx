/* eslint-disable react/prop-types */
import { Button } from "@mui/material"
import { Link } from "react-router-dom"


const Order_Card = ({book}) => {
  //console.log(book)
  return (
    <div className="md:w-[55rem] shadow my-4 flex md:flex-row md:items-center flex-col gap-y-3 justify-between p-2 border bg-white">
      <div className="h-full p-2">
           <img src={book?.image} alt=""  className="h-28 hidden md:block w-28 object-cover object-center"/>
      </div>
    <div className="flex flex-col gap-y-3">
         <h1 className="font-semibold md:text-lg">{book.name} <span className="text-blue-500"> Booking Succesfully</span> </h1>
         <div className="flex gap-x-3">
         <h3 className="underline text-green-500 font-bold">Succesfully Payment</h3>
         <h1>Total Users ({book.users.length})</h1>
         <h1>date ({book.date})</h1>
         <h1 className="font-semibold underline">Total Payment : <span className="text-green-500">₹ {book.totalPayment}</span> </h1>
         </div>
    </div>
    <div>
      <Link to={`/single/Book/${book?._id}`}> <Button variant="contained" size="small">Vew order</Button></Link>
       
    </div>
</div>
  )
}

export default Order_Card

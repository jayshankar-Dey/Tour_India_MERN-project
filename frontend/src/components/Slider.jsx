import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Link } from 'react-router-dom';

const Slider = () => {
  return (
    <div className="h-[80vh]">
 <Swiper  modules={[Pagination,Navigation,Scrollbar,A11y]} pagination={{
    clickable:true
 }} loop={true} autoplay={{
    delay:1000,
    disableOnInteraction: false,
    clickable: true
 }} className="  h-full *:cursor-pointer">
        <SwiperSlide className='relative'><img src="https://framerusercontent.com/images/YUEzeziP7rc0odjMYkXdE5tqWw.jpg" alt=""  className='w-full h-full object-cover object-center'/>
        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center pl-4 flex-col'>
           <h1 className='font-semibold text-white text-5xl font-mono p-2'>Wellcome to Tour <span className='text-green-500'>India</span> </h1>
           <p className='text-white leading-10 font-thin'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident mollitia eligendi placeat ratione pariatur! Ea corporis perspiciatis inventore mollitia porro!</p>

           <Link to={'/tour'} className='p-3 bg-green-500 w-52 border shadow-xl rounded text-white font-semibold mt-10 flex justify-center items-center gap-x-4 hover:scale-105 hover:bg-green-600 duration-200'>Book Now <ion-icon name="arrow-forward-outline"></ion-icon></Link>
        </div>
        </SwiperSlide>
        <SwiperSlide><img src="https://assets.weforum.org/article/image/XJkVQrA6uy9CVqo_9e3DMLlKvkOHcr8wPO4RbDhbsfc.jpg" alt="" className='w-full h-full object-cover object-center' /></SwiperSlide>
        <SwiperSlide><img src="https://www.bcferries.com/web_image/h85/hbd/8992974831646.jpg" alt="" className='w-full h-full object-cover object-center' /></SwiperSlide>
        <SwiperSlide><img src="https://www.state.gov/wp-content/uploads/2020/11/shutterstock_186964970-scaled.jpg" alt="" className='w-full h-full object-cover object-center' /></SwiperSlide>
      </Swiper>
      </div>
  )
}

export default Slider

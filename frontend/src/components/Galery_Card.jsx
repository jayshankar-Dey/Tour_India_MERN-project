/* eslint-disable react/prop-types */
import Aos from "aos";
import "aos/dist/aos.css"

const Galery_Card = ({galery}) => {
  console.log(galery)
    Aos.init({
        offset: 200,
        duration: 600,
        easing: 'ease-in-sine',
        delay: 100,
      });
  return (
    <div data-aos="fade-up"
    data-aos-duration="3000" className="w-[9.6rem] my-3 duration-300 scale-105 cursor-pointer h-96 bg-white border hover:w-fit">
      {
        galery?.image?<img src={galery?.image?.url} alt=""  className="w-full h-full object-cover"/>:<img src={galery?.image?.url} className="w-full h-full object-cover" alt="" />
      }
    </div>
  )
}

export default Galery_Card

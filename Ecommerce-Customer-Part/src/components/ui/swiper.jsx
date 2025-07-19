// import Swiper core and required modules
import { Navigation, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

function SwiperComponent() {
  return (
    <Swiper
      spaceBetween={20} // Adjust spacing between slides
      slidesPerView={2} // Show two slides at a time
      loop={true} // Enable looping of slides
      navigation={true} // Enable navigation buttons
      autoplay={{
        delay: 3000, // Delay between slides in milliseconds (3 seconds)
        disableOnInteraction: false, // Autoplay continues even after user interaction
      }}
      modules={[Navigation, Autoplay]} // Include Navigation and Autoplay modules
    >
      <SwiperSlide>
        <img src="../../../slider-1.jpg" alt="Slide 1" className="w-full h-auto" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="../../../slider-2.jpg" alt="Slide 2" className="w-full h-auto" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="../../../slider-3.jpg" alt="Slide 3" className="w-full h-auto" />
      </SwiperSlide>
    </Swiper>
  );
}

export default SwiperComponent;

import {registerComponent} from "render";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Lazy } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const MySwiper = React.forwardRef((props, ref) => {
  return (
    <Swiper
      modules={[Navigation, Lazy]}
      ref={ref}
      lazy={true}
      {...props}
    ></Swiper>
  );
});

registerComponent("Swiper", "", MySwiper, "swiper");
registerComponent("SwiperSlide", "", SwiperSlide, "swiper");
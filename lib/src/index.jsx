import {registerComponent, registerModuleDeferred} from "render-client";

function register() {
  registerModuleDeferred("swiper", async () => {
    const [swiper_react, swiper, _, _1, _2] = await Promise.all([
      import("swiper/react"),
      import("swiper"),
      import("swiper/css"),
      import("swiper/css/navigation"),
    ]);
    const { Swiper, SwiperSlide } = await swiper_react;
    const { Navigation, Lazy } = await swiper;

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
  });
}

register();
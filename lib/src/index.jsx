function registerComponent(name, sub_class, constructor, namespace, lazy = false) {
  const render_namespace = "render_" + namespace;
  if (window[render_namespace] == undefined) {
    window[render_namespace] = {};
  }
  let component_name = name;
  if (sub_class == undefined) {
    console.log(`registering undefined ${name} in ${namespace}`);
  }
  if (sub_class.length > 0) {
    const wrapping_class = window[render_namespace][name];
    if (wrapping_class == undefined) {
      throw new Error(`Failed to find wrapping class ${name} for ${sub_class}`);
    }
    wrapping_class[sub_class] = constructor;
    component_name = `${name}.${sub_class}`;
  } else {
    window[render_namespace][name] = constructor;
  }
  // fixme: we can probably move this at the top level
  if (window.componentRegister == undefined) {
    window.componentRegister = new Map();
  }
  if (!window.componentRegister.has(namespace)) {
    window.componentRegister.set(namespace, new Map());
  }
  window.componentRegister.get(namespace).set(component_name, lazy ? wrap_inside_suspense(constructor) : constructor);
}

export function registerModuleDeferred(name, callback) {
  if (window.modules_callbacks == undefined) {
    window.modules_callbacks = new Map();
  }
  window.modules_callbacks.set(name, callback);
}

export function register() {
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
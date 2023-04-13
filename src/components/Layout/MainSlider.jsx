import React from "react";
import Slider from "react-slick";
import slider_1 from "../../assets/slider_1.jpg";
import slider_2 from "../../assets/slider_2.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MainSlider() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <section className="mt-4 hidden sm:block">
      <div className="container p-4 mx-auto">
        <Slider {...settings} className="overflow-hidden">
          <div className=" h-80 outline-none">
            <img
              className="object-cover object-top"
              src={slider_1}
              alt="image1"
            />
          </div>
          <div className="h-80 outline-none">
            <img
              className="object-cover object-top"
              src={slider_2}
              alt="image2"
            />
          </div>
        </Slider>
      </div>
    </section>
  );
}

export default MainSlider;

import React, { useState } from "react";
import { Swiper } from "swiper/react";
import SwiperCore, { Pagination, Navigation, Thumbs } from "swiper";
import "swiper/swiper-bundle.css";
import PropTypes from "prop-types";

SwiperCore.use([Pagination, Navigation, Thumbs]);

export function Gallery({ slides, withThumbs, ...rest }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <>
      <Swiper thumbs={withThumbs && { swiper: thumbsSwiper }} {...rest}>
        {slides}
      </Swiper>
      {withThumbs && (
        <Swiper
          id="thumbs"
          spaceBetween={10}
          slidesPerView={3}
          onSwiper={setThumbsSwiper}
        >
          {slides}
        </Swiper>
      )}
    </>
  );
}

Gallery.propTypes = {
  slides: PropTypes.array.isRequired,
};

export default Gallery;

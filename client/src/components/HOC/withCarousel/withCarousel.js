import React from "react";
import Swiper from "react-id-swiper";

export function withCarousel(Component, data, withlink = false) {
  return function () {
    const params = {
      breakpoints: {
        100: {
          slidesPerView: 1,
        },
        300: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 2,
        },
        960: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 3,
        },
      },
      slidesPerView: 3,
      loop: true,
      spaceBetween: 5,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".page",
        type: "fraction",
        clickable: true,
        renderBullet: (index, className) => {
          return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
      },
    };
    return (
      <Swiper {...params}>
        {data.map((props, index) => (
          <div key={`${index}me`}>
            <Component {...props} />
          </div>
        ))}
      </Swiper>
    );
  };
}

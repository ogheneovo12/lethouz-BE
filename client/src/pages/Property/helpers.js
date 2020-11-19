import photos from "./Photo";
import React from "react";
export const Gallery = () => {
  const render = [];
  photos.some((photo, index) => {
    //makes the last div have two image child,
    if (index + 1 === 4) {
      render[3] = (
        <div className="img" key={`${index}:${photo.src}`}>
          {render[3]}
          <img
            src={`https://source.unsplash.com/${
              index + 1 + 800
            }x599/?real,estate,housing`}
            alt="test"
          />
        </div>
      );
      return true;
    }
    render[index] = (
      <div className="img" key={index + 800}>
        <img
          src={`https://source.unsplash.com/${
            index + 800
          }x599/?real,estate,housing`}
          alt="test"
        />
      </div>
    );
    //makes the last div have two image child
    if (index + 1 === 3 && photos.length >= 4) {
      render[3] = (
        <img
          src={`https://source.unsplash.com/${
            index + 1 + 800
          }x599/?real,estate,housing`}
          alt="test"
        />
      );
    }
    return false;
  });
  return render;
};

export const breakpoints = {
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
    slidesPerView: 3,
  },
  960: {
    slidesPerView: 3,
  },
  1024: {
    slidesPerView: 3,
  },
};

export const thumbsparam = {};

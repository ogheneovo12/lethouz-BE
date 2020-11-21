import PropTypes from "prop-types";
import React, { useState, useRef, useCallback } from "react";
import { convertFile } from "../../utils";
import { Modal } from "../Modal";
import Swiper from "react-id-swiper";
import cx from "classname";
export function Upload({ previews, setPreview,  onRemove }) {
  const [dropDepth, setDropDepth] = useState(0);
  const [inDropZone, setInDropZone] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [files, setFiles] = useState([]);
  const swiper = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDropDepth(dropDepth + 1);
  };

 function remove(index){
    const filtered = previews.filter((url,i)=>i !== index);
    onRemove(filtered);
 };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDropDepth(dropDepth - 1);
    if (dropDepth > 0) return 0;
    setInDropZone(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
    setInDropZone(true);
  };

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    //reset state
    setInDropZone(false);
    setDropDepth(0);

    let dropped = !!e.dataTransfer ? [...e.dataTransfer.files] : [...e.target.files]; //supports input 
    if (dropped && dropped.length > 0) {
      //validate file
      const existingFiles = files.map((f) => f.name);
      //avoid duplicates and filter
      dropped = dropped.filter((f) => !existingFiles.includes(f.name));
      //convert files to preview ans
      dropped.map((file) => convertFile(file, setPreview));
      setFiles([...files, ...dropped]);
      //clear event files
    }
  };

  function generateSlides() {
    const slides = previews.map((image,index) => (
      <div key={`${image.name || image.src} ${index}`} >
        <img
          src={image.src}
          alt={image.name}
          style={{ width: image.width, height: image.height }}
        />
      </div>
    ));
    return slides;
  }
  const setSliderOnInit = useCallback(
    (index) => {
      setShowModal(true);
      swiper.current.slideTo(index);
    },
    [swiper]
  );

  return (
    <div
      className="upload"
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDragEnter={(e) => handleDragEnter(e)}
      onDragLeave={(e) => handleDragLeave(e)}
    >
      <div>
        <input type="file" className="visually-hidden" id="fileElem" onChange={handleDrop}  multiple/>
        {inDropZone ? (
          <p>Drop the files here ...</p>
        ) : (
          <label htmlFor="fileElem">Drag 'n' drop some files here, or click to select files</label>
        )}
        <div className="preview">
          {previews.map((image, index) => (
           <ImageBox {...image} 
           key={image.name || image.src} 
           openInModal={()=>setSliderOnInit(index)} 
           remove={()=>remove(index)} />
           
            
          ))}
          
          <Modal show={showModal} center closeModal={() => setShowModal(false)}>
            <div className="upload__slide">
              <Swiper
                slidesPerView={1}
                spaceBetween={5}
                runCallbacksOnInit={true}
                onInit={(core) => (swiper.current = core)}
                ref={(node) => {
                  if (node) swiper.current = node.swiper;
                }}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                shouldSwiperUpdate
              >
                {generateSlides()}
              </Swiper>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

function ImageBox ({src, isInvalid, name, openInModal, remove }){
    return(
      <div   className={cx("image__box", isInvalid && "invalid")}  style={{ width: 150, height: 150, margin: 10 }}>
            <img
              src={src}
              alt={name}
             
              onClick={openInModal}
            />
            <div className="image__box__tool">
              <span className="">
                 <i className="fa fa-eye"></i>
                 {" "}
                 {/* <span>{name.substr(0, 4)}</span> */}
              </span>
              <span className="" onClick={remove}>
                  <i className="fa fa-times"></i>
              </span>
             
            </div>
      </div>
    )
}

Upload.defaultProps={
  onRemove:()=>{}
}

Upload.propTypes = {
  onChange: PropTypes.func,
};

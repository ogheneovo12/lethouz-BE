import Axios from "axios";
export function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject("sorry geolocation is not suppoerted");
    }
    navigator.geolocation.getCurrentPosition(success, error);
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      return resolve({ latitude, longitude });
    }
    function error(error) {
      return reject(
        "sorry we couldn't get your location, but you can search for it"
      );
    }
  });
}

export function checkedJsonStorage(itemName) {
  let myItem = null;
  try {
    myItem = JSON.parse(localStorage.getItem(itemName));
  } catch (err) {
    console.log(err);
  }
  return myItem;
}

export const isMobile = (name) =>
  window.matchMedia("(max-width: 600px)").matches;

const validateFile = (file) => {
  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/x-icon"];
  const isValid = !validTypes.includes(file.type);
  console.log(isValid);
  return isValid;
};
// const fileSize = (size) => {
//   if (size === 0) return '0 Bytes';
//   const k = 1024;
//   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
//   const i = Math.floor(Math.log(size) / Math.log(k));
//   return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
// }

export function convertFile(file, setSrc) {
  let reader = new FileReader();
  const isInvalid = validateFile(file);
  reader.onloadend = function () {
    const img = document.createElement("img");
    img.src = reader.result;
    img.onload = function () {
      const { height, width } = calculateAspectRatioFit(
        this.width,
        this.height,
        700,
        600
      );
      setSrc({ src: reader.result, name: file.name, height, width, isInvalid, isBase64img:true });
    };
  };
  reader.readAsDataURL(file);
}

export function uploadFile(base64Imgs, callback) {
  let upload_preset = "we_upload";
  let cloud_name = "tigerdev";
  let url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;
  const fetchUpload = ({ src: file }) =>
    Axios.post(url, { file, upload_preset: upload_preset });
  let res_promises = base64Imgs.map((img) => fetchUpload(img));
  Promise.allSettled(res_promises).then(callback);
}

/**
 * stackoverflow :https://stackoverflow.com/questions/3971841/how-to-resize-images-proportionally-keeping-the-aspect-ratio
 * Conserve aspect ratio of the original region. Useful when shrinking/enlarging
 * images to fit into a certain area.
 *
 * @param {Number} srcWidth width of source image
 * @param {Number} srcHeight height of source image
 * @param {Number} maxWidth maximum available width
 * @param {Number} maxHeight maximum available height
 * @return {Object} { width, height }
 */
function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
  var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
  return { width: srcWidth * ratio, height: srcHeight * ratio };
}

export function calculateRadius({ lat: lat1, lng: lon1 },{ lat: lat2, lng: lon2 }) {
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // in metres
  return d/1000;
}

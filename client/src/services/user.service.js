import Axios from "axios";
import { USER_API_BASEURL } from "../constants";

export const userService = {
  login,
  logout,
  register,
  findUser,
  findUserApartment,
  changeUserPassword,
  confirmLoginStatus
};

const requestOptions = { withCredentials: true };

function login(email, password) {
  return Axios.post(
    `${USER_API_BASEURL}auth/login`,
    { email, password },
    requestOptions
  ).then(({ data }) => {
    localStorage.setItem("user", JSON.stringify(data.data));
    return data.data;
  });
}

function logout() {
  return Axios.get(`${USER_API_BASEURL}auth/logout`, requestOptions).then(
    (data) => {
      localStorage.removeItem("user");
      return data;
    }
  );
}

function register(user) {
  return Axios.post(
    `${USER_API_BASEURL}auth/register`,
    user,
    requestOptions
  ).then(({ data }) => {
    return data;
  });
}

function confirmLoginStatus() {
  return Axios.get(`${USER_API_BASEURL}user`, requestOptions).then(
    ({ data }) => {
      return data;
    }
  );
}
function changeUserPassword(passwords) {
  return Axios.put(
    `${USER_API_BASEURL}/user/password`,
    passwords,
    requestOptions
  ).then((data) => {
    return data.data;
  });
}

function findUser(username){
  return Axios.get(`${USER_API_BASEURL}/user/${username}`).then(res => {
      return res.data;
  })
}
function findUserApartment(username){
  return Axios.get(`${USER_API_BASEURL}/user/${username}/apartment`).then(res => {
      return res.data;
  })
}
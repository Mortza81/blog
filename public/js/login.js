import { showAlert } from "./alerts.js";
import axios from "axios";
export const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:4000/api/v1/users/login",
      data: {
        password,
        email,
      },
    });
    if (res.data.status == "success") {
      showAlert("success", "شما وارد شدید‍!‍");
      setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
export const logout=async ()=>{
  try {
    const res = await axios({
      method: "get",
      url: "http://localhost:4000/api/v1/users/logout",
    });
    if (res.data.status == "success") {
     location.assign('/')
    }
  }catch(err){
    showAlert('error','مشکلی در خروج از حساب کاربریتان وجود دارد‍!')
  }
}
// types of alert can be: error, success, info, warning

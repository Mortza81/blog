import axios from "axios";
import { showAlert } from "./alerts";
export const register=async (data)=>{
    try{
    const res=await axios({
        method:'post',
        data,
        url:"/api/v1/users/signup"
    })
    if(res.data.status=='success'){
        showAlert('success','خوش آمدید!')
        location.assign('/')
    }
    }catch(err){
        showAlert('error',err.response.data.message)
    }
}
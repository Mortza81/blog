import { showAlert } from "./alerts";
import axios from 'axios'
export const deleteUser=async (id)=>{
    try{
        const res=await axios({
            url:`/api/v1/users/${id}`,
            method:'delete'
        })
        if (res.data.status === 'success') {
            showAlert('warning', `کاربر مورد نظر حذف شد!`)
              window.setTimeout(()=>location.assign('/dashboard/users'),2000)
          }
        } catch (err) {
          showAlert('error', err.response.data.message)
        }
}
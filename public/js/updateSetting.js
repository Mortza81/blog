import axios from 'axios'
import { showAlert } from './alerts'
export const updateData = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'http://localhost:4000/api/v1/users/updateMyPassword'
        : 'http://localhost:4000/api/v1/users/updateMe'
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    })

    if (res.data.status === 'success') {
      showAlert('success', `اطلاعات شما با موفقیت بروزرسانی شد!`)
        window.setTimeout(()=>location.assign('/dashboard'),2000)
    }
  } catch (err) {
    showAlert('error', err.response.data.message)
  }
}

import {login,logout} from './login'
import { updateData } from './updateSetting';
import { deleteUser } from './usersSetting';
import { register } from './register';

const registerForm=document.querySelector('.signup-form')
const updateForm=document.querySelector('.form--updateData')
const deleteBtns=document.querySelectorAll('.deactivate-button')
const loginForm=document.querySelector(".form--login")
const logoutbtn=document.querySelector(".logout-btn")
const updatePasswordForm=document.querySelector('.form--updatePassword')
if(loginForm){
    loginForm.addEventListener('submit',(event)=>{
        event.preventDefault()
        const password=document.getElementById('password').value
        const email=document.getElementById('email').value
        login(email,password)
    })
}
if (deleteBtns) {
  deleteBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
          deleteUser(btn.dataset.userid);
      });
  });
}
if(registerForm){
  registerForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const signbtn=document.querySelector('.signbtn').innerHTML='چند لحظه صبر کنید...'
    const email=document.getElementById('email').value
    const name=document.getElementById('name').value
    const password=document.getElementById('password').value
    const passwordConfirm=document.getElementById('password-confirm').value
    const data={email,password,passwordConfirm,name}
    register(data)
  })
}
if (updateForm) {
    updateForm.addEventListener('submit',async (event) => {
      event.preventDefault()
      const form=new FormData()
      const email = document.getElementById('email').value
      const name = document.getElementById('name').value
      const photo=document.getElementById('profile-photo').files[0]
      form.append('email',email)
      form.append('name',name)
      form.append('photo',photo)
      await updateData(form, 'data')
    })
  }
  if(updatePasswordForm){
    updatePasswordForm.addEventListener('submit',async (event)=>{
      event.preventDefault()
      const passwordCurrent = document.getElementById('password-current').value;
      const password = document.getElementById('password').value;
      const passwordConfirm = document.getElementById('password-confirm').value;
      const data={password,passwordCurrent,passwordConfirm}
      await updateData(data,'password')
      document.getElementById('password-current').innerHTML='';
      document.getElementById('password').innerHTML='';
      document.getElementById('password-confirm').innerHTML='';
    })
  }
if(logoutbtn){
  logoutbtn.addEventListener('click',e=>{
    e.preventDefault()
    logout()
  })
}
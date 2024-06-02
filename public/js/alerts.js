export const hideAlert = () => {
  const el = document.querySelector('.alert')
  if (el) el.parentElement.removeChild(el)
}
export const showAlert = (type, msg) => {
  const markup = `<div class="alert alert-${type}">${msg}<span class="close" onclick="this.parentElement.style.display='none';">&times;</span>
</div>`
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup)
  window.setTimeout(hideAlert, 5000)
}

 

(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()


  const alert = bootstrap.Alert.getOrCreateInstance('#myAlert')
  setTimeout(() =>{
    alert.close()
  },2500)


 
let humburger = document.querySelector(".humburger");
let collapsemenu = document.querySelector(".downcollapsenavbar");
humburger.addEventListener('click',() =>{

  console.log("Burger clicked");
 collapsemenu.classList.toggle("downcollapsenavbarappear");

})
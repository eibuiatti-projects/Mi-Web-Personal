/* Configuro la libreria Scroll Reveal  */

const reveal = {
  delay: 200,
  duration: 1700,
}

const revealRight = {
  delay: 200,
  distance: '100%',
  duration: 1700,
  origin: 'right',
  opacity: 0,
};

const revealLeft = {
  delay: 200,
  distance: '100%',
  duration: 1500,
  origin: 'left',
  opacity: 0,
};

const revealTop = {
  delay: 200,
  distance: '100%',
  duration: 1500,
  origin: 'top',
  opacity: 0,
};

const revealBottom = {
  delay: 200,
  distance: '100%',
  duration: 1500,
  origin: 'bottom',
  opacity: 0,
 
};

ScrollReveal().reveal('.reveal', reveal);
ScrollReveal().reveal('.reveal-right', revealRight);
ScrollReveal().reveal('.reveal-left', revealLeft);
ScrollReveal().reveal('.reveal-top', revealTop);
ScrollReveal().reveal('.reveal-bottom', revealBottom);




/* Selecciono el elemento que hara disparar la animacion de tecnologías */
let btnTecnologias = document.querySelector('#btn-tecnologias')
let animacion= false

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
  e.preventDefault();
  /* Colsulto si anchor actual es el de referencia a tecnologias y me aseguro de llamar a la animacion solo una vez */
  if(anchor=== btnTecnologias && animacion=== false ){
    retardoAnimacion();
    animacion= true;
  }  
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});


/* Animacion con la libreria ProgressBar.js */

function retardoAnimacion(){
setTimeout(function animarTecnologias() {

  let arrayDeSkills = document.querySelectorAll('.tecnologia-container')
  arrayDeSkills.forEach(skill => {
    let semiCircle = new ProgressBar.SemiCircle(`#${skill.id}`, {

      color: '#FF6600',
      strokeWidth: 6,
      trailColor: '#FFFFFF',
      trailWidth: 1,
      text: {
        style: {
          position: 'absolute',
          left: '50%',
          top: '50%',
          padding: 0,
          margin: 0,
          fontSize: '1.2rem'
        },
        autoStyleContainer: true
      },
      duration: 1200,
      easing: 'bounce',
      from: { color: '#FFFF00' },
      to: { color: '#FF6600' },
      step: function (state, semiCircle, attachment) {
        semiCircle.path.setAttribute('stroke', state.color);
        let value = Math.round(semiCircle.value() * 100);
        semiCircle.setText(`% ${value}`);
      }
    }
    );
    semiCircle.animate(skill.dataset.level)
  })
},500)
}

/*Configuro libreria DetectarVisibilidad para que la animacion de tecnologías se dispare al hacer scroll y posicionarse en el viewport */

function cambiaVisibilidad(visible, elemento){
  if (visible=== true && animacion === false){
    retardoAnimacion();
    animacion = true;
  }
}

const miDiv = document.getElementById("tecnologias");

inViewportTotally(miDiv, cambiaVisibilidad);


/* Formulario */

const URL_ = "http://localhost:3001/"
const nombre = document.querySelector(".nombre");
const email = document.querySelector(".email");
const mensaje = document.querySelector(".mensaje");

const form = document.querySelector("#form");
const btnSubmit = document.querySelector(".enviar");


const regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

form.addEventListener("submit", formHandler);
email.addEventListener("input", emailHandler);
nombre.addEventListener("input", nombreHandler);
btnSubmit.addEventListener ("click", btnSubmitHandler);

function formHandler(event){
    event.preventDefault();
    fetch(`${URL_}submitForm`,{
    method:'POST',
    body:JSON.stringify({name:nombre.value, email:email.value, message:mensaje.value}),
    headers:{'Content-Type':'application/json'}
}).then((res)=>{
    nombre.value = "";
    email.value = "";
    mensaje.value = "";
    resetForm();
    return res.json()
}).then((res)=>{
    alert("Formulario enviado correctamente");
});
}

function emailHandler(){
  if (regex.test(email.value)) {
    email.classList.remove("invalid");
    email.classList.add("valid");
  } else {
    email.classList.remove("valid");
    email.classList.add("invalid");
  }
}

function nombreHandler(){ 
  if (nombre.value === null || nombre.value === "") {
    nombre.classList.remove("valid");
    nombre.classList.add("invalid");
  } else {
    nombre.classList.remove("invalid");
    nombre.classList.add("valid");
  }
}

function btnSubmitHandler(){
  if (nombre.value === null || nombre.value === "") {
    nombre.setCustomValidity("No se aceptan campos vacíos!!!");
  } else {
    nombre.setCustomValidity("");
  }
  if (regex.test(email.value)) {
    email.setCustomValidity("");
  } else {
    email.setCustomValidity("El campo debe ser del tipo 'ejemplo@ejemplo.com' !!!");
  }
}

function resetForm(){
  nombre.classList.remove("valid");
  nombre.classList.remove("invalid");
  email.classList.remove("invalid");
  email.classList.remove("valid");
}
  

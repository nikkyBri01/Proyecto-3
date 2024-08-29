
import {postPeticiones} from "../services/services.js";


//-----------------------------Admin------------------------------------//
//Iniciador de clase solicitud
class solicitud {
    constructor(nombre,proyecto,sede,fechaS,fechaE,codigo,estado) {
        this.nombre=nombre;
        this.proyecto=proyecto;
        this.sede=sede;
        this.fechaS=fechaS;
        this.fechaE=fechaE; 
        this.codigo=codigo;
        this.estado="Pendiente";
    }
}

//Trae los datos del usuario actual desde el Local
//Y muestra los datos necesarios en el formulario 
let currentUser=JSON.parse(localStorage.getItem("Usuario"))||[];
let nombreCont=document.getElementById("nombreForm");
if (nombreCont!==null) {
  nombreCont.innerHTML= `
  <h2>Nombre de Usuario: ${currentUser.username}</h2>
  <h3>Sede: ${currentUser.sede}</h3>`;
  nombreCont.style.textAlign="center";
}

let contenedorCod=document.getElementById("codigoCont")
if (contenedorCod!==null) {
  contenedorCod.innerHTML=currentUser.codigo;
}


//Trae el boton y contenedor para el modal
const contenedorModal = document.getElementById("contenedorModal")
if (contenedorModal!==null) {
  contenedorModal.style.display = "none";
}

const buttonEnviar = document.getElementById("envio")

//Trae los datos de los inputs del HTML
let practica=document.getElementById("practica");
let fechaS=document.getElementById("salida");
let fechaE=document.getElementById("entrada");

//Funcionalidad del boton enviar formulario
if (buttonEnviar!==null) {
  buttonEnviar.addEventListener("click" ,() => {
    practica=practica.value;
    fechaS=fechaS.value;
    fechaE=fechaE.value
    console.log("Fecha E:",fechaE,"Fecha S:",fechaS,"practica:",practica);
    
  if (!practica||!fechaE||fechaE=="2024-01-01"||!fechaS||fechaS=="2024-01-01") {
    const contenedorModal = document.getElementById("contenedorModal")
    contenedorModal.innerHTML = "";
    const modalHeader = document.createElement("div");
    const modalMain = document.createElement('div')
    contenedorModal.style.display = "block";
    modalHeader.className = "modal"
    modalHeader.innerHTML = `<h3>Envio de Formulario</h3>`;
    modalMain.innerHTML = 'Faltan datos por llenar';
    modalMain.className = "mensaje";
    contenedorModal.append(modalHeader);
    contenedorModal.append(modalMain);
    const modalButton = document.createElement("h2")
    modalButton.innerText = "💻";
    modalButton.className = "modal-button";
    modalButton.addEventListener("click", () =>{
    contenedorModal.style.display = "none";})
    modalHeader.append(modalButton);
    }

  else {
    console.log("Practica",practica,"fechaS",fechaS,"fechaE",fechaE);
    let peticion = new solicitud(currentUser.username,practica,currentUser.sede,fechaS,fechaE,currentUser.codigo)
    postPeticiones(peticion);
    const contenedorModal = document.getElementById("contenedorModal")
    const buttonEnviar = document.getElementById("envio")
    contenedorModal.innerHTML = "";
    const modalHeader = document.createElement("div");
    const modalMain = document.createElement('div')
    contenedorModal.style.display = "block";
    modalHeader.className = "modal"
    modalHeader.innerHTML = `<h3>Envio de Formulario</h3>`;
    modalMain.innerHTML = 'Su envio fue exitoso';
    modalMain.className = "mensaje";
    contenedorModal.append(modalHeader);
    contenedorModal.append(modalMain);
    let modalButton = document.createElement("h2")
    modalButton.innerText = "💻";
    modalButton.className = "modal-button";
    modalHeader.append(modalButton);
    modalButton.addEventListener("click", () =>{
    contenedorModal.style.display = "none";   
    modalHeader.append(modalButton);})
}
})
}


export {solicitud}





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

//Verifica que el valor exista y sea diferente de vacio en localStorage antes de hacer JSON.parse
let currentUser = localStorage.getItem("Usuario");

if (currentUser !== null && currentUser !== undefined && currentUser !== 'undefined') {
    currentUser = JSON.parse(currentUser);
}else{
  currentUser = [];
}

//Trae los datos del usuario actual desde el Local
//Y muestra los datos necesarios en el formulario 
// let currentUser=JSON.parse(localStorage.getItem("Usuario"))||[];

//Verifica que currentUser no sea null antes de usarse
if(currentUser){
  let nombreCont=document.getElementById("nombreForm");
  if (nombreCont!==null) {
    nombreCont.innerHTML= `
    <h2>Nombre de Usuario: ${currentUser.username}</h2>
    <h3>Sede: ${currentUser.sede}</h3>`;
    nombreCont.style.textAlign="center";
  }
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
      let practicaN=practica.value;
      let fechaSalida=fechaS.value;
      let fechaEntrada=fechaE.value;
  if (!practicaN||!fechaEntrada||fechaEntrada=="2024-01-01"||!fechaSalida||fechaSalida=="2024-01-01") {
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
    let peticion = new solicitud(currentUser.username,practicaN,currentUser.sede,fechaSalida,fechaEntrada,currentUser.codigo)
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




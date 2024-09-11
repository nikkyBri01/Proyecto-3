
import {getUsers} from "../services/services.js";

//--------------------------------------LogIn-----------------------------------------//
let inputPass=document.getElementById("password");
let inputName=document.getElementById("name");
let btnEnviar=document.getElementById("inicio")
//Trae el boton y contenedor para el modal
const contenedorModal = document.getElementById("contenedorModal")
if (contenedorModal!==null) {
  contenedorModal.style.display = "none";
}

//Verifica si el valor existe antes de hacer JSON.parse
let nombreUsuario = localStorage.getItem("Usuario");

if (nombreUsuario !== null && nombreUsuario !== undefined && nombreUsuario !== 'undefined') {
    nombreUsuario = JSON.parse(nombreUsuario);
} else {
  nombreUsuario = [];
}

// let nombreUsuario = JSON.parse(localStorage.getItem("Usuario")) || [];

let entrar=async ()=>{
    let username=inputName.value;
    let password=inputPass.value;
    let response= await getUsers();
    let usuario= response.find(user => user.username == username && user.password==password)
    
    // nombreUsuario[0]=usuario;
    // localStorage.setItem("Usuario",JSON.stringify(usuario))

    //Validar que exista usuario
    if (usuario) {
         // Actualiza el nombreUsuario solo si el usuario es válido
        nombreUsuario[0]=usuario;
        localStorage.setItem("Usuario",JSON.stringify(usuario))

        if(usuario.admin==true){window.location.href= "admin.html";} 
        else window.location.href="formulario.html";
    }
    else {
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
    };
}

btnEnviar.addEventListener("click", function () {
    entrar()
})


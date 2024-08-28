
import {updateU,updateUser,addUser,deleteUser,tries,getUsers,removeUser, eliminarPeticion} from "./services/services.js";
import { nombreUsuario} from "./login.js";

//-----------------------------Admin------------------------------------//
//Iniciador de clase solicitud
class solicitud {
    constructor(nombre,sede,fechaS,fechaE,codigo,estado) {
        this.nombre=nombre;
        this.sede=sede;
        this.fechaS=fechaS;
        this.fechaE=fechaE;
        this.codigo=codigo;
        this.estado="Pendiente";
    }
}
let contenedorNombre=document.getElementById("nombreForm");
let nombreUsuario=nombreUsuario.nombre
contenedorNombre.innerHTML=nombreUsuario;


export {solicitud}

const contenedorModal = document.getElementById("contenedorModal")
const buttonEnviar = document.getElementById("envio")

buttonEnviar.addEventListener("click" ,() => {
    contenedorModal.innerHTML = "";
    const modalHeader = document.createElement("div");
    contenedorModal.style.display = "block";
    modalHeader.className = "modal"
    modalHeader.innerHTML = `
         <h1>Envio de Formulario</h1>
    `;

    contenedorModal.append(modalHeader);

    const modalButton = document.createElement("h1")
    modalButton.innerText = "X";
    modalButton.className = "modal-button";

    modalButton.addEventListener("click", () =>{
      contenedorModal.style.display = "none";

      const modalMain = document.createElement("h2")
      modalMain.innerText = "Su envio fue exitoso";
      modalMain.className = "mensaje";
    })
    modalHeader.append(modalButton);
    contenedorModal.append(modalMain);

})






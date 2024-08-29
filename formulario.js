
import {updateU,updateUser,addUser,deleteUser,tries,getUsers,removeUser, eliminarPeticion} from "./services/services.js";


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

const contenedorModal = document.getElementById("contenedorModal")
const buttonEnviar = document.getElementById("envio")

buttonEnviar.addEventListener("click" ,() => {
    contenedorModal.innerHTML = "";
    const modalHeader = document.createElement("div");
    const modalMain = document.createElement('div')

    contenedorModal.style.display = "block";
    modalHeader.className = "modal"
    modalHeader.innerHTML = `
         <h3>Envio de Formulario</h3>
    `;
    
    modalMain.innerHTML = 'Su envio fue exitoso';
    modalMain.className = "mensaje";
    
    contenedorModal.append(modalHeader);
    contenedorModal.append(modalMain);

    const modalButton = document.createElement("h2")
    modalButton.innerText = "💻";
    modalButton.className = "modal-button";

    modalButton.addEventListener("click", () =>{
      contenedorModal.style.display = "none";      
    })

    modalHeader.append(modalButton);
   

})






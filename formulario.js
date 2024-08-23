
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
    remove(id){
        eliminarPeticion(id)
    }
}
//Obtencion de valores para la solicitud
let nameCont=document.getElementById("nombreForm")
nameCont.innerHTML=inputName.value;

export {solicitud}


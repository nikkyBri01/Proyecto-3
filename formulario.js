
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


import {updateUser,postUsers,getUsers,addUser,tries,removeUser,deleteUser,postPeticiones,eliminarPeticion} from "./services/services.js";

class solicitud {
    constructor(nombre,sede,fechaS,fechaE,codigo,estado) {
        this.nombre=nombre;
        this.sede=sede;
        this.fechaS=fechaS;
        this.fechaE=fechaE;
        this.codigo=codigo;
        this.estado="Pendiente";
    }
    eliminar(){
        eliminarPeticion(this.id)
    }
}

export {solicitud}








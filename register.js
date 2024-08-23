
import {updateU,updateUser,addUser,deleteUser,tries,getUsers,removeUser, eliminarPeticion} from "./services/services.js";

//----------------------------------SignUp--------------------------------------------//
//Parametros traidos del HTML
let name = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let admin = document.getElementById("admin");
let sede = document.getElementById("sede");

window.register = function() {
    if (name.value ==""||email.value==""||password.value==""||admin.value==""||sede.value=="Selecciona tu sede") {
        return alert("Faltan campos por llenar")
    }
    return addUser(name.value,email.value,password.value,admin.value,sede.value)
};


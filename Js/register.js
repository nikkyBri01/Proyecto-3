
import {getUsers,postUsers} from "../services/services.js";


//Añadir usuarions si no existen aun
async function addUser(username,email,password,codigo,sede,codigoPc) {  
    let admin=false;
    if (codigo=="0000") {
        admin=true
    } 
    try {
        let users= await getUsers();
        let userExist=users.some(user=>user.username===username);
        if (userExist) {
            return console.log("Ya existe el usuario");    
        }
        else {await postUsers(username,email,password,admin,sede,codigoPc);
        console.log("Se añadio el usuario");}
    } catch (error) {
        return console.log("Error en la funcion update", error);
    }
}

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



import {updateU,updateUser,addUser,deleteUser,tries,getUsers,removeUser} from "./services/services.js";

//--------------------------------------LogIn-----------------------------------------//
let inputPass=document.getElementById("password");
let inputName=document.getElementById("name");

//Funcion que verifica si el usuario existe y si es Admin o Usuario
window.findUser = async function(username,password) {
    username=inputName.value;
    password=inputPass.value;
    let response= await getUsers();
    let usuario= response.find(user => user.username == username&&user.password==password)
    if (usuario) {
        if(usuario.admin==true){window.location.href= "http://localhost:8000/admin.html";} 
        else {window.location.href="usuarios.html"};
    }
    else return console.log("No se encontro");
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


console.log('Hola soy Jenny');
 
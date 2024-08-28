
import {updateUser,postUsers,getUsers,addUser,tries,removeUser,deleteUser,postPeticiones,eliminarPeticion} from "./services/services.js";

//--------------------------------------LogIn-----------------------------------------//
let inputPass=document.getElementById("password");
let inputName=document.getElementById("name");
let btnEnviar=document.getElementById("inicio")

let nombreUsuario=JSON.parse(localStorage.getItem("Usuario"))||[];

let entrar=async ()=>{
    let username=inputName.value;
    let password=inputPass.value;
    let response= await getUsers();
    let usuario= response.find(user => user.username == username&&user.password==password)
    nombreUsuario[0]=usuario;
    localStorage.setItem("Usuario",JSON.stringify(usuario))
    if (usuario) {
        if(usuario.admin==true){window.location.href= "http://localhost:8000/admin.html";} 
        else {window.location.href="http://localhost:8000/formulario.html"; return nombreUsuario};
    }
    else return console.log("No se encontro");
}

btnEnviar.addEventListener("click", function () {
    entrar()
})

export{nombreUsuario}

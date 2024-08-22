
import {updateU,updateUser,addUser,deleteUser,tries,getUsers,removeUser} from "./services/services.js";
let logInBtn=document.getElementById("inicio")
async function findUser(username,password) {
    console.log("Entre");
    
    let response= await getUsers();
    let usuario= response.find(user => user.username == username&&user.password==password)
    if (usuario) {
        if(usuario.admin==true){window.location.href= "admin.html";} 
        else {window.location.href="usuarios.html"};
    }
    else return console.log("No se encontro");
}

let inputPass=document.getElementById("password")
let inputName=document.getElementById("name")
logInBtn.addEventListener("click", function () {
    findUser(inputName.value,inputPass.value)
})



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

// modal 
function createModal(message) {
    
    let modal = document.createElement("div");
    modal.className = "regisModal";

    let modalContent = document.createElement("div");

    let closeButton = document.createElement("span");
    const newLocal = closeButton.innerHTML = "X";

    let text = document.createElement("p");
    text.textContent = message;

   
    closeButton.onclick = function () {
        document.body.removeChild(modal);
    };

   
    modalContent.appendChild(text);
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
}

let register = function () {
    if (
        name.value === "" ||
        email.value === "" ||
        password.value === "" ||
        sede.value === "Selecciona tu sede"
    ) {
        createModal("Faltan campos por llenar");
        return;
    }
    return addUser(name.value, email.value, password.value, admin.value, sede.value);
};

let registro = document.getElementById("registro")
if (registro!==null) {
    registro.addEventListener("click",register,true)
}


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
        else {window.location.href="http://localhost:8000/formulario.html"};
    }
    else return console.log("No se encontro");
}
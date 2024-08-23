//--------------------------------------------Users---------------------------------------//


//-----------------------------------Get------------------------------------//

async function getUsers() {
    return new Promise (async(resolve,reject)=>{
        let response= await fetch("http://localhost:3000/users");
        if (response) {
            let users=response.json();
            return resolve(users)
        }
        else {
            reject (new Error("No entro"))
        }
    })
}

async function tries() {
    try {let usuarios= await getUsers();
        console.log(usuarios);
    } catch (error){console.log("No se pudo conectar"+error);}
}

//-----------------------------------Post----------------------------------//
async function postUsers(username,email,password,admin,sede) {
    try {
      const userData = {
        username,
        email,
        password,
        admin,
        sede
      };
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      return await response.json();
    } catch (error) {
      console.error("Error posting user:", error);
      throw error;
    }
}
//Añadir usuarions si no existen aun
 async function addUser(username,email,password,codigo,sede) {  
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
        else {await postUsers(username,email,password,admin,sede);
        console.log("Se añadio el usuario");}
    } catch (error) {
        return console.log("Error en la funcion update", error);
    }
}
//---------------------------------Delete----------------------------------//
async function deleteUser(id) {
    try {
        let response= await fetch ("http://localhost:3000/users/"+id, { 
        method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        });
        console.log(response);
        
    if (!response.ok) {
        throw new Error("No se ejecuto");
    }
    return { message: `User with id ${id} deleted successfully` };
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    } 
}

async function removeUser(username) {
    let response = await fetch ("http://localhost:3000/users");
    let users = await response.json();
    users.forEach(async (user) => {
        if (user.username==username) {
            return await deleteUser(user.id) 
        }
    }); 
}

//----------------------------------Update---------------------------------//

async function updateUser(username,password,email, admin,sede,id) {
    let user={
        id,
        username,
        email,
        password,
        admin,
        sede
    }
    try {
        let response = await fetch("http://localhost:3000/users/"+id,{
            method: "PUT",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error("No se pudo conectar",Error);
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}


async function updateU(username,newusername) {
    let response= await fetch("http://localhost:3000/users/")
    let usuarios= await response.json();
    usuarios.forEach(async user => {
        if (user.username==username) {
            return await updateUser(newusername,user.password,user.id) 
        }
    });
}


//--------------------------------------Peticiones------------------------------------------------//

import { solicitud } from "../login.js";
//----------------------------------------------Get-----------------------------------------------//
async function getPeticiones() {
    return new Promise (async(resolve,reject)=>{
        let response= await fetch("http://localhost:3000/peticiones");
        if (response) {
            let peticion=response.json();
            return resolve(peticion)
        }
        else {
            reject (new Error("No entro"))
        }
    })
}

async function tryPeticion() {
    try {let peticiones= await getPeticiones();
        console.log(peticiones);
    } catch (error){console.log("No se pudo conectar"+error);}
}


//-----------------------------------------------Post-----------------------------------------------//
async function postPeticiones(userData) {
    try {
      const response = await fetch("http://localhost:3000/peticiones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      return await response.json();
    } catch (error) {
      console.error("Error posting user:", error);
      throw error;
    }
}

//------------------------------------Delete----------------------------------------//

async function eliminarPeticion(id) {
    try {
        let response= await fetch ("http://localhost:3000/peticiones/"+id, { 
        method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        });
        console.log(response);
        
    if (!response.ok) {
        throw new Error("No se ejecuto");
    }
    return { message: `Peticion with id ${id} deleted successfully` };
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    } 
}

//-------------------------------------Update-----------------------------------------//

async function updatePeticion(nombre,sede,fechaS,fechaE,codigo,estado,id) {
    let peticion= new solicitud(nombre,sede,fechaS,fechaE,codigo)
    peticion.id=id; peticion.estado=estado;
    try {
        let response = await fetch("http://localhost:3000/peticiones/"+id,{
            method: "PUT",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(peticion)
        });
        if (!response.ok) {
            throw new Error("No se pudo conectar",Error);
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

updatePeticion("Ale","Santa Ana","22/08/2024","25/08/2024","3fa2","Aceptada","2a66")

async function updateP(username,newusername) {
    let response= await fetch("http://localhost:3000/users/")
    let usuarios= await response.json();
    usuarios.forEach(async user => {
        if (user.username==username) {
            return await updateUser(newusername,user.password,user.id) 
        }
    });
}


export {updateU,postUsers,updateUser,addUser,deleteUser,tries,getUsers,removeUser,postPeticiones,tryPeticion,eliminarPeticion,getPeticiones,updatePeticion}
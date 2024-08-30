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

//-----------------------------------Post----------------------------------//
async function postUsers(username,email,password,admin,sede,codigo) {
    try {
      const userData = {
        username,
        email,
        password,
        admin,
        sede,
        codigo
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


//----------------------------------Update---------------------------------//

async function updateUser(username,password,email, admin,sede,codigo,id) {
    let user={
        id,
        username,
        email,
        password,
        admin,
        sede,
        codigo
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


//--------------------------------------Peticiones------------------------------------------------//

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
import { solicitud } from "/Js/formulario.js";
async function updatePeticion(nombre,practica,sede,fechaS,fechaE,codigo,estado,id) {
    let peticion= new solicitud(nombre,practica,sede,fechaS,fechaE,codigo)
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

export {postUsers,updateUser,deleteUser,getUsers,postPeticiones,eliminarPeticion,getPeticiones,updatePeticion}
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




export {updateU,updateUser,addUser,deleteUser,tries,getUsers,removeUser}
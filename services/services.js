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
async function postUsers(username, password) {
    try {
      const userData = {
        username,
        password
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
 async function addUser(username, password) {   
    try {
        let users= await getUsers();
        let userExist=users.some(user=>user.username===username);
        if (userExist) {
            return console.log("Ya existe el usuario");    
        }
        else {await postUsers(username,password);
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

async function updateUser(username,password,id) {
    let user={
        id,
        username,
        password
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



async function findUser(username,password) {
    let response= await fetch ("http://localhost:3000/users/");
    let users= await response.json()
    let existe=users.some(username&&password);
    if (existe) {
        return console.log("Se encontro el usuario y entro");
    }
    else return console.log("No se encontro el usuario");
}

findUser("Ale",1234)


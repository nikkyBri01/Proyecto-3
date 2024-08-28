// import {updateUser,postUsers,getUsers,addUser,tries,removeUser,deleteUser,postPeticiones,eliminarPeticion} from "./services/services.js";
import {postPeticiones,tryPeticion,eliminarPeticion,getPeticiones,tryPeticion1, } from "/services/services.js";

const contenedorSolicitud= document.getElementById("containerSolicitud");

let cargarSolicitudes= async ()=> {
   const solicitudes = await getPeticiones();
   solicitudes.forEach(solicitud => {
      let conten = document.createElement("div");
      conten.className = "tarjetas"
      conten.innerHTML = `
      <h2>ID de la solicitud ${solicitud.id}</h2>
      <h3>Nombre ${solicitud.nombre}</h3>
      <p>Sede ${solicitud.sede}</p>
      <p>Fecha de Salida ${solicitud.fechaS}</p>
      <p>Fecha de Entrega ${solicitud.fechaE}</p>
      <p>Codigo del equipo ${solicitud.codigo}</p>
      `;
      let estadoCont=document.createElement("p")
      estadoCont.innerHTML="Estado de la solicitud: "+ solicitud.estado;
      conten.appendChild(estadoCont)
      contenedorSolicitud.appendChild(conten);
      
   let Aceptar = document.createElement("button")
   Aceptar.innerText = "Aceptar solicitud"
   Aceptar.className = "Aceptar"

   conten.appendChild(Aceptar);

   Aceptar.addEventListener("click", function () {
      updatePeticion(solicitud.nombre,solicitud.sede,solicitud.fechaS,solicitud.fechaE,solicitud.codigo,"Aceptada",solicitud.id)
      estadoCont.innerHTML="Estado de la solicitud: Aceptada"

   })
  
   let Denegar = document.createElement("button")
   Denegar.innerText = "Denegar solicitud"
   Denegar.className = "Denegar"

   conten.appendChild(Denegar);

   Denegar.addEventListener("click", function () {
      updatePeticion(solicitud.nombre,solicitud.sede,solicitud.fechaS,solicitud.fechaE,solicitud.codigo,"Denegado",solicitud.id)
      estadoCont.innerHTML="Estado de la solicitud: Denegada"
   })
});

}
cargarSolicitudes()


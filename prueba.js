const contenedorSolicitud= document.getElementById("containerSolicitud");




let cargarSolicitudes= async ()=> {
   const solicitudes = await getPeticiones();
   solicitudes.forEach(solicitud => {
      let conten = document.createElement("div");
      conten.className = "tarjetas"
      conten.innerHTML = `
      <h2>${solicitud.id}</h2>
      <h3>${solicitud.nombre}</h3>
      <p>₡${solicitud.sede}</p>
      <p>₡${solicitud.fechaS}</p>
      <p>₡${solicitud.fechaE}</p>
      <p>₡${solicitud.codigo}</p>
      <p>₡${solicitud.estado}</p>
      `;
   
      contenedorSolicitud.appendChild(conten);
      
   let Aceptar = document.createElement("button")
   Aceptar.innerText = "Aceptar solicitud"
   Aceptar.className = "Aceptar"

   conten.appendChild(Aceptar);

   Aceptar.addEventListener("click", function () {
      updatePeticion(solicitud.nombre,solicitud.sede,solicitud.fechaS,solicitud.fechaE,solicitud.codigo,"Aceptada",solicitud.id)
      
   })
  
   let Denegar = document.createElement("button")
   Denegar.innerText = "Denegar solicitud"
   Denegar.className = "Denegar"

   conten.appendChild(Denegar);

   Denegar.addEventListener("click", function () {
      updatePeticion(solicitud.nombre,solicitud.sede,solicitud.fechaS,solicitud.fechaE,solicitud.codigo,"Denegado",solicitud.id)
   })
});

}
cargarSolicitudes()















import {postPeticiones,tryPeticion,eliminarPeticion,getPeticiones,tryPeticion1,updatePeticion} from "/services/services.js";
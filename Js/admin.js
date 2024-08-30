import { eliminarPeticion } from "../services/services";
import {getPeticiones,updatePeticion} from "/services/services.js";


const contenedorSolicitud= document.getElementById("containerSolicitud");
let tryGet=async ()=> {let respuesta= await getPeticiones(); return respuesta}

let historial=JSON.parse(localStorage.getItem("historial")) || [];


//Carga la solicitudes y las muestra en pantalla dado un array en especifico
let cargarSolicitudes= async (solicitudes)=> {
   solicitudes.forEach(solicitud => {
      let conten = document.createElement("div");
      conten.className = "tarjetas"
      conten.innerHTML = `
      <h1>Usuario: ${solicitud.nombre}</h1>
      <h2>Codigo PC: ${solicitud.codigo}</h2>
      <p>Proyecto : ${solicitud.proyecto}</p>
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
      updatePeticion(solicitud.nombre,solicitud.proyecto,solicitud.sede,solicitud.fechaS,solicitud.fechaE,solicitud.codigo,"Aceptada",solicitud.id)
      solicitud.estado="Aceptada"
      historial.push(solicitud)
      localStorage.setItem("historial",JSON.stringify(historial))
      eliminarPeticion(solicitud.id)
      conten.remove()
   })
  
   let Denegar = document.createElement("button")
   Denegar.innerText = "Denegar solicitud"
   Denegar.className = "Denegar"

   conten.appendChild(Denegar);

   Denegar.addEventListener("click", function () {
      updatePeticion(solicitud.nombre,solicitud.proyecto,solicitud.sede,solicitud.fechaS,solicitud.fechaE,solicitud.codigo,"Denegado",solicitud.id)
      solicitud.estado="Denegada"
      historial.push(solicitud)
      localStorage.setItem("historial",JSON.stringify(historial))
      eliminarPeticion(solicitud.id)
      conten.remove()
   })
});
}

//Muestra las solicitudes pasando el array inicial
let displaySoli=async()=>{
   try {
      let solicitudes=await tryGet();
      cargarSolicitudes(solicitudes);  
   } catch (error) {
      console.log("error al cargar solicitudes",error);
   }
}
displaySoli()


//Se obtienen los datos del filtro
let filterIn=document.getElementById("inputFilter")
//funcion que limpia un contenedor traido del HTML

//Se añade la funcionalidad del filter
filterIn.addEventListener("input",async function busqueda(){
   let valor=filterIn.value.trim();
   let peticiones= await getPeticiones();
   let filtrado= peticiones.filter(peticion=>
      peticion.nombre.toLowerCase().includes(valor.toLowerCase())||
      peticion.sede.toLowerCase().includes(valor.toLowerCase())||
      peticion.fechaE.toLowerCase().includes(valor.toLowerCase())||
      peticion.fechaS.toLowerCase().includes(valor.toLowerCase())||
      peticion.codigo.toLowerCase().includes(valor.toLowerCase()))
      while (contenedorSolicitud.firstChild) {
         contenedorSolicitud.firstChild.remove();
     }
      cargarSolicitudes(filtrado);
},true)


//Funcionalidad del boton historial
let cargarHistorial= async (solicitudes)=> {
   solicitudes.forEach(solicitud => {
      let conten = document.createElement("div");
      conten.className = "tarjetas"
      conten.innerHTML = `
      <h1>Usuario: ${solicitud.nombre}</h1>
      <h2>Codigo PC: ${solicitud.codigo}</h2>
      <p>Proyecto : ${solicitud.proyecto}</p>
      <p>Sede ${solicitud.sede}</p>
      <p>Fecha de Salida ${solicitud.fechaS}</p>
      <p>Fecha de Entrega ${solicitud.fechaE}</p>
      <p>Codigo del equipo ${solicitud.codigo}</p>
      `;
      let estadoCont=document.createElement("p")
      estadoCont.innerHTML="Estado de la solicitud: "+ solicitud.estado;
      conten.appendChild(estadoCont)
      contenedorSolicitud.appendChild(conten); 
});
}

let btnHistorial=document.getElementById("btnHistorial");

if (btnHistorial!==null) {
   btnHistorial.addEventListener("click",function () {
      while (contenedorSolicitud.firstChild) {
         contenedorSolicitud.firstChild.remove();
     }
      cargarHistorial(historial)
      filterIn.removeEventListener("input",busqueda,true);
      filterIn.addEventListener("input",async ()=>{
         let valor=filterIn.value.trim();
         let peticiones= await getPeticiones();
         let filtrado= peticiones.filter(peticion=>
            peticion.nombre.toLowerCase().includes(valor.toLowerCase())||
            peticion.sede.toLowerCase().includes(valor.toLowerCase())||
            peticion.fechaE.toLowerCase().includes(valor.toLowerCase())||
            peticion.fechaS.toLowerCase().includes(valor.toLowerCase())||
            peticion.codigo.toLowerCase().includes(valor.toLowerCase()))
            while (contenedorSolicitud.firstChild) {
               contenedorSolicitud.firstChild.remove();
           }
            cargarHistorial(filtrado);
      })
   })
}


//Funcionalidad del boton solicitudes
let btnSolicitud=document.getElementById("btnSolicitud")

if (btnSolicitud!==null) {
   btnSolicitud.addEventListener("click",function () {
      while (contenedorSolicitud.firstChild) {
         contenedorSolicitud.firstChild.remove();
     }
      displaySoli()

   })
   
}
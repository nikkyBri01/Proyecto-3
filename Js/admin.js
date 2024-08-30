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
//Funcion que busca peticiones con filter
async function busqueda(){
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
}

//Se añade la funcionalidad del filter
filterIn.addEventListener("input",busqueda,true)


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

//Funcionalidad del boton solicitudes
let btnSolicitud=document.getElementById("btnSolicitud")

if (btnSolicitud!==null) {
   btnSolicitud.addEventListener("click",function () {
      while (contenedorSolicitud.firstChild) {contenedorSolicitud.firstChild.remove();}
     let mainCont=document.getElementById("historialInput");
     while (mainCont.firstChild) {mainCont.firstChild.remove();}
     filterIn.removeEventListener("input",busquedaH,true);
     filterIn.addEventListener("input",busqueda,true);
     btnSolicitud.style.display="none";
     btnHistorial.style.display="block"
      displaySoli()
   })  
}

//Boton para ir al historial
let btnHistorial=document.getElementById("btnHistorial");

//Funcion que busca en el historial
let busquedaH=async ()=>{
   let valor=filterIn.value.trim();
   let filtrado=historial.filter(peticion=>
      peticion.nombre.toLowerCase().includes(valor.toLowerCase())||
      peticion.sede.toLowerCase().includes(valor.toLowerCase())||
      peticion.fechaE.toLowerCase().includes(valor.toLowerCase())||
      peticion.fechaS.toLowerCase().includes(valor.toLowerCase())||
      peticion.codigo.toLowerCase().includes(valor.toLowerCase()))
      while (contenedorSolicitud.firstChild) {
         contenedorSolicitud.firstChild.remove();
     }
   cargarHistorial(filtrado);
}


//Funcionalidad del boton
if (btnHistorial!==null) {
   btnHistorial.addEventListener("click",function () {
      let mainCont=document.getElementById("historialInput");
      while (contenedorSolicitud.firstChild) {contenedorSolicitud.firstChild.remove();}
      while (mainCont.firstChild) {mainCont.firstChild.remove();}
      mainCont.innerHTML=`
         <input type="text" name="datoInput" id="datoInput" placeholder="Buscar">
         <label for="fechaS">Salida: </label>
         <input type="date" id="fechaS">
         <label for="fechaE">Entrada: </label>
         <input type="date" id="fechaE"></input>
         <button id="btnBuscar">Buscar</button>
      `;
      cargarHistorial(historial);
      btnHistorial.style.display="none";
      btnSolicitud.style="margin-right: 150px;";
      filterIn.removeEventListener("input",busqueda,true);
      filterIn.addEventListener("input",busquedaH,true);
      let btnBuscar=document.getElementById("btnBuscar");
      let dato=document.getElementById("datoInput");
      let fechaS=document.getElementById("fechaS");
      let fechaE=document.getElementById("fechaE");

      if (btnBuscar!==null) {
         btnBuscar.addEventListener("click",function () {
            if (!dato.value||!fechaS||!fechaE) {  
               return createModal("Faltan datos por llenar")
            }
            buscarHistorial(dato.value,fechaS.value,fechaE.value)
         })
      }
   })
}

//Importa la funcion para crear modales
let main=document.getElementById("mainCont")
function createModal(message) {
    
   let modal = document.createElement("div");
   modal.className = "regisModal";

   let modalContent = document.createElement("div");

   let closeButton = document.createElement("span");
   closeButton.innerHTML = "Cerrar";

   let text = document.createElement("p");
   text.textContent = message;

  
   closeButton.onclick = function () {
      main.removeChild(modal);
   };

  
   modalContent.appendChild(text);
   modalContent.appendChild(closeButton);
   modal.appendChild(modalContent);

   main.appendChild(modal);
}

const buscarHistorial = (dato, fechaSalida, fechaEntrada) => {
   // Filtra los registros basados en el valor de búsqueda
   const filtrado = historial.filter(peticion =>
     peticion.nombre.toLowerCase().includes(dato.toLowerCase()) ||
     peticion.sede.toLowerCase().includes(dato.toLowerCase()) ||
     peticion.fechaE.toLowerCase().includes(dato.toLowerCase()) ||
     peticion.fechaS.toLowerCase().includes(dato.toLowerCase()) ||
     peticion.codigo.toLowerCase().includes(dato.toLowerCase())
   );
   //Usa reduce para filtrar los registros basados en el rango de fechas
      const datoFinal = filtrado.reduce((acumulador, item) => {
     const fechaSDate = new Date(item.fechaS);
     const fechaEDate = new Date(item.fechaE);
     if (fechaSDate >= new Date(fechaSalida) && fechaEDate <= new Date(fechaEntrada)) {
       acumulador.push(item);
     }
     return acumulador; 
   }, []);
   while (contenedorSolicitud.firstChild) {
      contenedorSolicitud.firstChild.remove();
  }
   return cargarHistorial(datoFinal)
 };




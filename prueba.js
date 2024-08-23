const contenedorSolicitud= document.getElementById("containerSolicitud");

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
     
        contenedorSolicitud.append(conten);
        
     let Aceptar = document.createElement("button")
     Aceptar.innerText = "Aceptar solicitud"
     Aceptar.className = "Aceptar"

     conten.append(Aceptar);

     
    
});















export {postPeticiones,tryPeticion,eliminarPeticion,getPeticiones,tryPeticion1}
export const emailTemplate = (nombres, nombre_equipo, sede, categoria, id)=>{
    return `
        <div style='text-align:center;'>
            <div style='text-align:center;background-color:black;padding:20px;'>
                <img src='https://mtech.igeco.mx/img/logoMtech2024.webp' width='200' >
            </div>
            <h1>¡Hola ${nombres} !</h1>
            <p>
                Tu equipo <strong>${nombre_equipo}</strong> con folio <strong>F - 000${id}</strong> se ha registrado exitosamente.<br>
                <strong>¡IMPORTANTE!</strong><br>
                Presenta este correo el día de la competencia. 
            </p>
            <h2>Información del equipo:</h2>
            <p> Folio de registro: F - 000${id}</p>
            <p>Nombre del equipo: ${nombre_equipo}</p>
            <p>Sede de participación: ${sede}${categoria} </p>                                                                                         
        </div>
    `
}
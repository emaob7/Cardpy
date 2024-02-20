import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';




const Plantilla2 = ({setProgress, curso, educacion, especifica, general, idioma, herra, referencia, photo, nombre, apellido, profesion, cin, registro, fnac, nacio, telef, correo, direcc, descripcion }) => {

    
    
    let generatePdf = async (item) => {
        setProgress(true);

        //titulos

        const tHerramienta = herra.length > 0 ? `<h2>Habilidades y Herramientas</h2>` : '';
        const tIdiomas = idioma.length > 0 ? `<h2>Idiomas</h2>` : '';
        const tEspecifica = especifica.length > 0 ? `<h2>Experiencia Laboral</h2>` : '';
        const tCursos = curso.length > 0 ? `<h2>Cursos Realizados</h2>` : '';
        const tReferencia = referencia.length > 0 ? `<h2>Referencias</h2>` : '';
        const tEducacion= educacion.length > 0 ? `<h2>Formacion Academica</h2>` : '';
        const imgphoto= photo ? `<section><img src="${photo}" alt="Foto de perfil" style="max-width: 80%; height: auto; border-radius: 10px;"></section>` : '';

        //secciones

        const especificaSection = especifica.map((especificaItem, index) => `
        <section key="especifica-${index}">
          <h3>${especificaItem.empre}  (${especificaItem.desde} - ${especificaItem.hasta})</h3>
          <p>${especificaItem.puesto} </p>
          <p>Tareas: ${especificaItem.tareas}</p>
        </section>
      `).join('');


      const generalSection = general.map((generalItem, index) => `
      <section key="general-${index}">
        <h3>${generalItem.empre} (${generalItem.desde} - ${generalItem.hasta})</h3>
        <p>${generalItem.puesto}</p>
        <p>Tareas: ${generalItem.tareas}</p>
      </section>
    `).join('');

      const idiomaSection = idioma.map((idiomaItem, index) => `
      <section key="idioma-${index}">
        <p>${idiomaItem.idi}: ${idiomaItem.nivel}</p>
      </section>
    `).join('');

    const referenciaSection = referencia.map((referenciaItem, index) => `
      <section key="referencia-${index}">
        <p>${referenciaItem.refe}: ${referenciaItem.telef}</p>
      </section>
    `).join('');

    const herramientaSection = herra.map((herraItem, index) => `
    <section key="herra-${index}">
      <p>${herraItem.herrami}: ${herraItem.nivel}</p>
    </section>
  `).join('');


        const cursosSection = curso.map((cursoItem, index) => `
        <section key="curso-${index}">
          <h3>${cursoItem.titulo}</h3>
          <p>${cursoItem.institucion}, Duracion: ${cursoItem.duracion}</p><p>Culminacion: ${cursoItem.culminacion}</p>
        </section>
      `).join('');

      const educacionSection = educacion.map((educacionItem, index) => `
      <section key="educacion-${index}">
        <h3>${educacionItem.titulo}</h3>
        <p>${educacionItem.institucion}, Duracion: ${educacionItem.duracion}</p><p>Culminacion: ${educacionItem.culminacion}</p>
      </section>
    `).join('');

     
  // <section> <img src="${photo}" alt="Foto de perfil" style="max-width: 100%; height: auto;"> </section>    
    
    
    const html= `
    
    <!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi Currículum</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }

    #curriculum-container {
      max-width: 900px;
      margin: 20px auto;
      display: flex;
    }

    #left-column {
      width: 30%;
      box-sizing: border-box;
      padding: 20px;
    }

    #left-column {
      background-color: #3498db;
      color: #333;
      padding-right: 15px
      
    }

    #right-column {
      width: 69%;
      background-color: #2c3e50;
      color: #333;
      border-left: 0.1px solid #2c3e50;
      padding-left: 15px
    }

    h2 {
      color: #2c3e50;
      text-transform: uppercase;
      font-size: 16px;
      margin-bottom: 8px;
      margin-left: 8px;
      letter-spacing: 2px;

    }

    section {
      margin-bottom: 8px;
    }

    h3{
      margin: 0;
      font-size: 15px;
      font-weight: bold; /* Pone el texto en negrita */
    }
    p {
      font-size: 14px;
      margin: 0; /* Quita los márgenes arriba y abajo */
    }
    h1{
      margin-top: -10px 
    }
    div{
      margin-bottom: 30px
    }
    #main-title {
      text-align: center; /* Alinea el texto al centro */
      color: #2c3e50; /* Color del texto */
      margin-bottom: 20px; /* Espacio inferior */
    }
  </style>
</head>
<body>
<h2 id="main-title">CURRICULUM VITAE</h2>
  <div id="curriculum-container">
 
    <div id="left-column">
    ${imgphoto}
      <h1>${nombre} ${apellido}</h1>
      <p>${profesion}</p>
      <p>Registro Profesional: ${registro}</p>

      <div>
        <h2>Datos Personales</h2>
        <p>CIN: ${cin}</p>
        <p>Fecha Nacimiento: ${fnac} </p>
        <p>Nacionalidad: ${nacio}</p>
        <p>Dirección: ${direcc}</p>
        <p>Teléfono: ${telef}</p>
        <p>Email: ${correo} </p>
      </div>
      <div>
        ${tIdiomas}
       ${idiomaSection}
      </div>
      <div>
      ${tHerramienta}
     ${herramientaSection}
    </div>
    <div>
    ${tReferencia}
   ${referenciaSection}
  </div>
    </div>

    <div id="right-column">
    <div>
    <h2>Perfil</h2>
    ${descripcion}
    </div>
    <div>
    ${tEspecifica}
    ${especificaSection}
    ${generalSection}
  </div>

      <div>
      ${tEducacion}
        ${educacionSection}
      </div>

    

      <div>
      ${tCursos}
      ${cursosSection}
      </div>
    </div>
  </div>

</body>
</html>

    
    
    `;

     const file = await printToFileAsync({
      html: html,
      base64: false
    });
 setProgress(false);
    await shareAsync(file.uri);
  };



return(
    <>
    <TouchableOpacity style={styles.comp} onPress={generatePdf}>
<EvilIcons name="share-apple" size={30} color="#0D7AFF" />
</TouchableOpacity>
    </>
)
    
}

const styles = StyleSheet.create({

    comp:{
        margin:16,
        backgroundColor: "white",
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius:50
      },
})

export default Plantilla2;
import React, { useState, useEffect } from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';


// Compartir Boton





const Plantilla1 = ({setProgress, curso, educacion, especifica, general, idioma, herra, referencia, photo, nombre, apellido, profesion, cin, registro, fnac, nacio, telef, correo, direcc, descripcion, des }) => {

   

  
  
  const herraV = herra.filter(her => her.herrami);
  const idiomaV = idioma.filter(idio => idio.idi);
  const especificaV = especifica.filter(esp => esp.empre);
  const generalV = general.filter(gen => gen.empre);
  const cursoV = curso.filter(cur => cur.titulo);
  const referenciaV = referencia.filter(ref => ref.refe);
  const educacionV = educacion.filter(edu => edu.titulo);

      //  const [loaded, setLoaded] = useState(false);
        //titulos

        const tHerramienta = herraV.length > 0 ? `<h2>Habilidades y Herramientas</h2>` : '';
        const tIdiomas = idiomaV.length > 0 ? `<h2>Idiomas</h2>` : '';
        const tEspecifica = especificaV.length > 0 ? `<h2>Experiencia Laboral</h2>` : '';
        const tCursos = cursoV.length > 0 ? `<h2>Cursos Realizados</h2>` : '';
        const tReferencia = referenciaV.length > "" ? `<h2>Referencias</h2>` : '';
        const tEducacion= educacionV.length > 0 ? `<h2>Educación</h2>` : '';
        const imgphoto= photo ? `<section><img src="${photo}" alt="Foto de perfil" style="max-width: 80%; height: auto; border-radius: 10px;"></section>` : '';
//datos
        const dregistro= registro.length > 0 ? `<p>Registro Profesional: ${registro}</p>` : '';
        const dtelefono= telef.length > 0 ? `<p>Telefono: ${telef}</p>` : '';
        const dfnacimiento= fnac.length > 0 ? `<p>Fecha de nacimiento: ${fnac}</p>` : '';
        const dnacionalidad= nacio.length > 0 ? `<p>Nacionalidad: ${nacio}</p>` : '';
        const dcorreo= correo.length > 0 ? `<p>email: ${correo}</p>` : '';
        const ddireccion= direcc.length > 0 ? `<p>Direccion: ${direcc}</p>` : '';
        const dcin= cin.length > 0 ? `<p>CIN: ${cin}</p>` : '';

        const [interstitial, setInterstitial] = useState(null);
        const [isAdLoaded, setIsAdLoaded] = useState(false);
      
        useEffect(() => {
          const interstitialAd = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
            requestNonPersonalizedAdsOnly: true,
            keywords: ['fashion', 'clothing'],
          });
      
          const onAdLoaded = () => {
            setIsAdLoaded(true);
          };
          const onAdClosed = () => {
            generatePdf();
          };
      
          interstitialAd.addAdEventListener(AdEventType.LOADED, onAdLoaded);
          interstitialAd.addAdEventListener(AdEventType.CLOSED, onAdClosed);
          interstitialAd.load();
      
          setInterstitial(interstitialAd);
      
          return () => {
            interstitialAd.removeAllListeners();
          };
        }, []);
      
        const showInterstitialAd = () => {
          if (isAdLoaded && interstitial) {
            interstitial.show();
            setIsAdLoaded(false);
            interstitial.load(); // Pre-carga otro anuncio
          } else {
            // Si el anuncio no está cargado, ejecuta la lógica inmediatamente
            generatePdf();
          }
        };





        //algunos casos
const cimg= photo ? `<div id="left-column1"><img src="${photo}" alt="Foto de perfil" style="max-width: 80%; height: auto; border-radius: 10px;"></div>` : '';
  // Secciones con viñetas
  const especificaSection = especificaV.map((especificaItem, index) => `
    <li key="especifica-${index}">
      <h3>${especificaItem.empre}</h3>
       <span style=" display: flex; justify-content: space-between; margin-right: 15px;"><p>${especificaItem.puesto}</p><p> (${especificaItem.desde} - ${especificaItem.hasta})</p></span>
      <p>Tareas: ${especificaItem.tareas}</p>
    </li>
  `).join('');

  const generalSection = generalV.map((generalItem, index) => `
    <li key="general-${index}">
      <h3>${generalItem.empre} </h3>
      <span style=" display: flex; justify-content: space-between; margin-right: 15px;"><p>${generalItem.puesto}</p><p> (${generalItem.desde} - ${generalItem.hasta})</p></span>
      <p>Tareas: ${generalItem.tareas}</p>
    </li>
  `).join('');

  const idiomaSection = idiomaV.map((idiomaItem, index) => `
    <li key="idioma-${index}">
      <p>${idiomaItem.idi}: ${idiomaItem.nivel}</p>
    </li>
  `).join('');

  const referenciaSection = referenciaV.map((referenciaItem, index) => `
    <li key="referencia-${index}">
      <p>${referenciaItem.refe}: ${referenciaItem.telef}</p>
    </li>
  `).join('');

  const herramientaSection = herraV.map((herraItem, index) => `
    <li key="herra-${index}">
      <p>${herraItem.herrami}: ${herraItem.nivel}</p>
    </li>
  `).join('');

  const cursosSection = cursoV.map((cursoItem, index) => `
    <li key="curso-${index}">
      <h3>${cursoItem.titulo}</h3>
      <p>${cursoItem.institucion}, Duración: ${cursoItem.duracion}</p>
      <p>Culminación: ${cursoItem.culminacion}</p>
    </li>
  `).join('');

  const educacionSection = educacionV.map((educacionItem, index) => `
    <li key="educacion-${index}">
      <h3>${educacionItem.titulo}</h3>
       <span style=" display: flex; justify-content: space-between; margin-right: 15px;"><p>${educacionItem.institucion}, Duración: ${educacionItem.duracion}</p><p>Culminación: ${educacionItem.culminacion}</p></span>
    </li>
  `).join('');


    














const generatePdf = async () => {
  setProgress(true);

  let html;

  switch(des) {
    case 1:
      html= `
    
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
      color: #333000;
      padding-right: 15px
      
    }

    #right-column {
      width: 69%;
      color: #333000;
      border-left: 0.1px solid #2c3e50;
      padding-left: 15px;
      min-height: 100%;
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

    
    
    `
      break;
    case 2:
      html= `

<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mi Currículum</title>
<style>
@page {
  size: A4;
  margin: 1cm;
}

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

#curriculum-container {
  max-width: 900px;
  margin: 20px auto;
  display: flex;
}
#tittle-container {
  max-width: 900px;
  margin: 0;
  display: flex;
  
}
#left-column1 {
  width: 41%;
  box-sizing: border-box;
  padding: 20px 20px;
  color: #333000;
  padding-bottom: 15px;
  background-color: #e0e0e0;
}


#right-column1 {
  width: 100%;
  color: #333000;
  padding-left: 15px;
  background-color: #e0e0e0;
  
}
#datos {
  background-color: #757575;
  margin-top: -30px;
  margin-bottom: -5px;
  color: #ffffff;
  padding: 0 17px;
  display: flex;
  justify-content: space-between;
}
h4{
  font-size: 14px;
  text-align: center; /* Alinea el texto al centro */
  
}

#left-column {
  width: 30%;
  box-sizing: border-box;
  padding: 0 20px;
  color: #333000;
  padding-right: 15px;
}


#right-column {
  width: 69%;
  color: #333000;
  border-left: 0.1px solid #2c3e50;
  padding-left: 15px;
  min-height: 100%;
}

h2 {
  color: #212121;
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
  margin-top: 10px;
  margin-bottom: -2px;

}
div{
  margin-bottom: 30px
}
#main-title {
  text-align: center; /* Alinea el texto al centro */
  color: #2c3e50; /* Color del texto */
  
}
#perfil {
  margin-top: 18px;
  
}
#profesion {
  margin-top: 4px;
  text-transform: uppercase;
  letter-spacing: 1px;
  
}

* { print-color-adjust:exact !important; }
</style>

</head>
<body>
<div id="tittle-container">

${cimg}

<div id="right-column1">
  <h1>${nombre} ${apellido}</h1>
  <p id="profesion">${profesion}</p>
  
  <div id="perfil">
  <h3>Perfil Profesional</h3>
  <p>${descripcion}</p>
  </div>
 

  </div>
  </div>

<div id="datos"><h4>Email: ${correo}</h4><h4>Teléfono: ${telef}</h4><h4>Dirección: ${direcc}</h4></div>
<div id="curriculum-container">


<div id="left-column">
  <div>
    <h2>Datos Personales</h2>
    ${dcin}
    ${dregistro}
    ${dfnacimiento}
    ${dnacionalidad}
    
  </div>
  <div>
  ${tHerramienta}
 ${herramientaSection}
</div>
  <div>
    ${tIdiomas}
   ${idiomaSection}
  </div>
  
<div>
${tReferencia}
${referenciaSection}
</div>
</div>

<div id="right-column">

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
      break;
    case 3:
      html= `

      <!DOCTYPE html>
      <html lang="es">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Mi Currículum</title>
      <style>
      @page {
        size: A4;
        margin: 1cm;
      }
      
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
      }
      
      #curriculum-container {
        max-width: 900px;
        margin: 20px auto;
        display: flex;
      }
      #tittle-container {
        max-width: 900px;
        margin: 0;
        display: flex;
        
      }
      #left-column1 {
        width: 41%;
        box-sizing: border-box;
        padding: 20px 20px;
        color: #333000;
        padding-bottom: 15px;
        background-color: #eceff1;
      }
      
      
      #right-column1 {
        width: 100%;
        color: #333000;
        padding-left: 15px;
        background-color: #eceff1;
        
      }
      #datos {
        background-color: #eceff1;
        margin-top: -30px;
        margin-bottom: -5px;
        color: #000000;
        padding: 0 17px;
        display: flex;
        justify-content: space-between;
      }
      h4{
        font-size: 14px;
        text-align: center; /* Alinea el texto al centro */
        
      }
      
      #left-column {
        width: 30%;
        box-sizing: border-box;
        padding: 0 20px;
        color: #333000;
        padding-right: 15px;
      }
      
      
      #right-column {
        width: 69%;
        color: #333000;
        border-left: 0.1px solid #2c3e50;
        padding-left: 15px;
        min-height: 100%;
      }
      
      h2 {
        color: #263238;
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
        margin-top: 10px;
        margin-bottom: -2px;
      
      }
      div{
        margin-bottom: 30px
      }
      #main-title {
        text-align: center; /* Alinea el texto al centro */
        color: #2c3e50; /* Color del texto */
        
      }
      #perfil {
        margin-top: 18px;
        
      }
      #profesion {
        margin-top: 4px;
        text-transform: uppercase;
        letter-spacing: 1px;
        
      }
      
      * { print-color-adjust:exact !important; }
      </style>
      
      </head>
      <body>
      <div id="tittle-container">
      
      ${cimg}
      
      <div id="right-column1">
        <h1>${nombre} ${apellido}</h1>
        <p id="profesion">${profesion}</p>
        
        <div id="perfil">
        <h3>Perfil Profesional</h3>
        <p>${descripcion}</p>
        </div>
       
      
        </div>
        </div>
      
      <div id="datos"><h4>Email: ${correo}</h4><h4>Teléfono: ${telef}</h4><h4>Dirección: ${direcc}</h4></div>
      <div id="curriculum-container">
      
      
      <div id="left-column">
        <div>
          <h2>Datos Personales</h2>
          ${dcin}
          ${dregistro}
          ${dfnacimiento}
          ${dnacionalidad}
          
        </div>
        <div>
        ${tHerramienta}
       ${herramientaSection}
      </div>
        <div>
          ${tIdiomas}
         ${idiomaSection}
        </div>
        
      <div>
      ${tReferencia}
      ${referenciaSection}
      </div>
      </div>
      
      <div id="right-column">
      
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
      break;
    case 4:
      html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Currículum Vitae - Harvard</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
          line-height: 1.6;
        }
        #header {
          text-align: center;
        }
        #header h1 {
          margin: 0;
          font-size: 24px;
          margin-bottom: 5px;
          text-transform: uppercase; /* Convertimos el texto en mayúsculas */
        }
        #header p {
          margin: 5px 0;
        }
        #contact-info {
      border-top: 1px solid #000;
      padding-top: 5px;
    }
        #profesion {
      margin-top: -10px;
    }
        h2 {
          font-size: 14px;
          margin-bottom:-5px;
          margin-top: 20px;
          text-align: center; /* Centramos los h2 */
          text-transform: uppercase; /* Convertimos el texto en mayúsculas */
        }
        .section {
          margin-bottom: 0px;
        }
        .section h3 {
          margin: 0;
          font-size: 14px;
          text-transform: uppercase; /* Convertimos el texto en mayúsculas */
        }
        .section p {
          margin: 0;
          text-indent: 20px; /* Agregamos sangría a los párrafos */
        }
        ul {
          list-style-type: disc;
          margin-left: 20px;
        }
      </style>
    </head>
    <body>
      <div id="header">
        <h1>${nombre} ${apellido}</h1>
        <p id="profesion">${profesion}</p>
        <p id="contact-info">${correo} | ${telef} | ${direcc} </p>
      </div>
    
      <div class="section">
        <h2>Perfil</h2>
        <p>${descripcion}</p>
      </div>
    
      <div class="section">
        ${tEspecifica}
        <ul>${especificaSection}</ul>
        <ul>${generalSection}</ul>
      </div>
    
      <div class="section">
          ${tEducacion}
        <ul>${educacionSection}</ul>
      </div>
    
      <div class="section">
      ${tCursos}
        <ul>${cursosSection}</ul>
      </div>
    
      <div class="section">
      ${tHerramienta}
        <ul>${herramientaSection}</ul>
      </div>
    
      <div class="section">
      ${tIdiomas}
        <ul>${idiomaSection}</ul>
      </div>
    
      <div class="section">
      ${tReferencia}
        <ul>${referenciaSection}</ul>
      </div>

            <div class="section">
        <h2>Datos Personales</h2>
        <p>${dcin}</p>
        <p>${dregistro}</p>
        <p>${dfnacimiento}</p>
        <p>${dnacionalidad}</p>
      </div>
    
    </body>
    </html>
    `;
      break;
    default:
      html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Currículum Vitae - Harvard</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
          line-height: 1.6;
        }
        #header {
          text-align: center;
        }
        #header h1 {
          margin: 0;
          font-size: 24px;
          margin-bottom: 5px;
          text-transform: uppercase; /* Convertimos el texto en mayúsculas */
        }
        #header p {
          margin: 5px 0;
        }
        #contact-info {
      border-top: 1px solid #000;
      padding-top: 5px;
    }
        #profesion {
      margin-top: -10px;
    }
        h2 {
          font-size: 12px;
          margin-bottom:-5px;
          margin-top: 20px;
          text-align: center; /* Centramos los h2 */
          text-transform: uppercase; /* Convertimos el texto en mayúsculas */
        }
        .section {
          margin-bottom: 0px;
        }
        .section h3 {
          margin: 0;
          font-size: 12px;
          text-transform: uppercase; /* Convertimos el texto en mayúsculas */
        }
        .section p {
          margin: 0;
          text-indent: 20px; /* Agregamos sangría a los párrafos */
        }
        ul {
          list-style-type: disc;
          margin-left: 20px;
        }
      </style>
    </head>
    <body>
      <div id="header">
        <h1>${nombre} ${apellido}</h1>
        <p id="profesion">${profesion}</p>
        <p id="contact-info">${correo} | ${telef} | ${direcc} </p>
      </div>
    
      <div class="section">
        <h2>Perfil</h2>
        <p>${descripcion}</p>
      </div>
    
      <div class="section">
        ${tEspecifica}
        <ul>${especificaSection}</ul>
        <ul>${generalSection}</ul>
      </div>
    
      <div class="section">
          ${tEducacion}
        <ul>${educacionSection}</ul>
      </div>
    
      <div class="section">
      ${tCursos}
        <ul>${cursosSection}</ul>
      </div>
    
      <div class="section">
      ${tHerramienta}
        <ul>${herramientaSection}</ul>
      </div>
    
      <div class="section">
      ${tIdiomas}
        <ul>${idiomaSection}</ul>
      </div>
    
      <div class="section">
      ${tReferencia}
        <ul>${referenciaSection}</ul>
      </div>

            <div class="section">
        <h2>Datos Personales</h2>
        <p>${dcin}</p>
        <p>${dregistro}</p>
        <p>${dfnacimiento}</p>
        <p>${dnacionalidad}</p>
      </div>
    
    </body>
    </html>
    `;
      break;
  }

  const file = await printToFileAsync({
    html: html,
    base64: false,
  });
  setProgress(false);
  await shareAsync(file.uri);
};





return(
    <>
    <TouchableOpacity style={styles.comp} onPress={showInterstitialAd}>
          <EvilIcons name="share-apple" size={25} color="#FFFFFF" />
        </TouchableOpacity>
    </>
)
    
}
 
const styles = StyleSheet.create({

    comp:{
      width: 35, // Ancho del círculo
      height: 35, // Alto del círculo
      borderRadius: 20, // Mitad del ancho y alto para hacer el círculo
      backgroundColor: "#1863FF", // Color gris claro
      justifyContent: 'center', // Centrar contenido verticalmente
      alignItems: 'center', // Centrar contenido horizontalmente
      marginHorizontal: 5, // Espacio entre los botones
      },
})

export default Plantilla1;
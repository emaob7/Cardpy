import React, { useState, useEffect } from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';








const EnviarPdf = ({setProgress,cin, nombre, fotoUrl1, fotoUrl2}) => {

   


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







    









  const dcin= cin.length > 0 ? `<span>, con CIN: ${cin}</span>` : '';
  const dnombre= nombre.length > 0 ? `<span>Fotocopia de cédula de ${nombre}</span>` : '';

 
  const html = `
  <html>
  <head>
    <style>
      .container {
        text-align: center;
        padding: 20px;
      }
  
      .title {
        font-size: 18px;
        margin-bottom: 20px;
      }
  
      .image-container {
        display: flex;
        justify-content: center;
        gap: 130px; /* Añade espacio entre las imágenes */
        padding: 10px 50px 20px;
        margin-top: -50px;
      }
    
      .image-wrapper {
        width: auto;
      }
    
      .imagen {
        border-radius: 10px;
        width: 200px; /* Ajusta el tamaño aquí según sea necesario */
        transform: rotate(-90deg);
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="title">
         ${dnombre} ${dcin}
      </div>
      <div class="image-container">
        <div class="image-wrapper">
          <img class="imagen" src="${fotoUrl1}" alt="Licencia 1">
        </div>
        <div class="image-wrapper">
          <img class="imagen" src="${fotoUrl2}" alt="Licencia 2">
        </div>
      </div>
    </div>
  </body>
  </html>
`;

let generatePdf = async () => {
    setProgress(true);
    const file = await printToFileAsync({
      html: html,
      base64: false
    });
  setProgress(false);
    await shareAsync(file.uri);
  };





return(
    <>
    <TouchableOpacity style={styles.button} onPress={showInterstitialAd}>
     <EvilIcons name="share-apple" size={22} color="#FFFFFF" /><Text style={styles.text} >Enviar PDF</Text>
     </TouchableOpacity>
    </>
)
    
}
 
const styles = StyleSheet.create({

    button: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: "#1462fc",
        paddingHorizontal: 17,
        marginTop:20,
        borderRadius:10,
        height:40
      },
      text: {
        // paddingVertical: 10,
         //marginLeft: 10,
         justifyContent: 'center',
         fontSize:16,
         color:"#FFFFFF"
       },
})

export default EnviarPdf;
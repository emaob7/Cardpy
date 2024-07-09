import React, { useState, useEffect } from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';








const EnviarCom = ({setProgress,item}) => {

   


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
            generatePdf(item);
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







    









        let generatePdf = async (item) => {
            setProgress(true);
            const dcin= item.cin.length > 0 ? `<span>, con CIN: ${item.cin}</span>` : '';
          const dnombre= item.nombre.length > 0 ? `<span>Fotocopia de cédula de ${item.nombre}</span>` : '';
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
                  <img class="imagen" src="${item.foto1}" alt="Licencia 1">
                </div>
                <div class="image-wrapper">
                  <img class="imagen" src="${item.foto2}" alt="Licencia 2">
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
          <TouchableOpacity
        style={styles.buttonC}
        onPress={showInterstitialAd}
      >
        <MaterialIcons name="ios-share" size={20} color="#0D7AFF" />
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
       buttonC: {
        width: 40, // Ancho del círculo
        height: 40, // Alto del círculo
        borderRadius: 20, // Mitad del ancho y alto para hacer el círculo
        backgroundColor: "#F3F3F6", // Color gris claro
        justifyContent: 'center', // Centrar contenido verticalmente
        alignItems: 'center', // Centrar contenido horizontalmente
        marginHorizontal: 5, // Espacio entre los botones
        
      }, 
})

export default EnviarCom;
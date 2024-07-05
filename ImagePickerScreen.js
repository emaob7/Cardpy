import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { ImagePicker } from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { PDFDocument } from 'pdf-lib'
;

export default function ImagePickerScreen() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [imageFront, setImageFront] = useState(null);
  const [imageBack, setImageBack] = useState(null);

  const cameraRef = useRef(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();
      if (imageFront === null) {
        setImageFront(uri);
      } else if (imageBack === null) {
        setImageBack(uri);
        await generatePDF();
      }
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      if (imageFront === null) {
        setImageFront(result.uri);
      } else if (imageBack === null) {
        setImageBack(result.uri);
        await generatePDF();
      }
    }
  };

  const handleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const generatePDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    const imageFrontBytes = await FileSystem.readAsStringAsync(imageFront, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const imageFrontEmbedded = await pdfDoc.embedPng(imageFrontBytes);

    const imageBackBytes = await FileSystem.readAsStringAsync(imageBack, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const imageBackEmbedded = await pdfDoc.embedPng(imageBackBytes);

    const { width, height } = page.getSize();
    const imageWidth = width / 2 - 20;
    const imageHeight = imageWidth / 1.6;

    page.drawImage(imageFrontEmbedded, {
      x: 10,
      y: height - imageHeight - 10,
      width: imageWidth,
      height: imageHeight,
    });

    page.drawImage(imageBackEmbedded, {
      x: width / 2 + 10,
      y: height - imageHeight - 10,
      width: imageWidth,
      height: imageHeight,
    });

    const pdfBytes = await pdfDoc.saveAsBase64({ dataUri: true });
    await FileSystem.writeAsStringAsync(
      `${FileSystem.documentDirectory}tarjeta.pdf`,
      pdfBytes,
      {
        encoding: FileSystem.EncodingType.Base64,
      }
    );

    setImageFront(null);
    setImageBack(null);
  };

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasCameraPermission(status === 'granted');
  };

  const requestGalleryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    setHasGallery
};

if (hasCameraPermission === null || hasGalleryPermission === null) {
return <View />;
}

if (hasCameraPermission === false || hasGalleryPermission === false) {
return <Text>No tenemos permiso para acceder a la cámara o a la galería</Text>;
}

return (
<View style={styles.container}>
<View style={styles.cameraContainer}>
<Camera style={styles.camera} type={cameraType} ref={cameraRef}>
<View style={styles.buttonContainer}>
<TouchableOpacity
           style={styles.button}
           onPress={handleCameraType}
         >
<Text style={styles.text}>Cambiar Cámara</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.button} onPress={takePicture}>
<Text style={styles.text}>Tomar Foto</Text>
</TouchableOpacity>
</View>
</Camera>
</View>
<View style={styles.imageContainer}>
{imageFront && (
<Image style={styles.image} source={{ uri: imageFront }} />
)}
{imageBack && (
<Image style={styles.image} source={{ uri: imageBack }} />
)}
<TouchableOpacity style={styles.button} onPress={pickImage}>
<Text style={styles.text}>Seleccionar desde Galería</Text>
</TouchableOpacity>
</View>
</View>
);
}

const styles = StyleSheet.create({
container: {
flex: 1,
flexDirection: 'row',
},
cameraContainer: {
flex: 1,
},
camera: {
flex: 1,
justifyContent: 'flex-end',
alignItems: 'center',
},
buttonContainer: {
flexDirection: 'row',
justifyContent: 'space-between',
marginBottom: 36,
marginHorizontal: 20,
},
button: {
backgroundColor: '#FFFFFF',
borderRadius: 5,
padding: 15,
paddingHorizontal: 20,
alignSelf: 'center',
margin: 20,
},
text: {
color: '#000000',
fontSize: 16,
},
imageContainer: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
},
image: {
width: 150,
height: 100,
margin: 10,
},
});
import React, { useState, useEffect } from 'react';
import firebase from "../firebase";
import { Text, TextInput, View, StyleSheet, Keyboard, ScrollView,Alert,ActivityIndicator, TouchableOpacity, Image} from 'react-native';
import FormHerramientas from './FormHerramientas';
import FormIdiomas from './FormIdiomas';
import FormReferencias from './FormReferencias';
import FormEspecificas from './FormEspecifica';
import FormGenerales from './FormGenerales';
import FormEducacion from './FormEducacion';
import FormCursos from './FormCursos';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Octicons } from '@expo/vector-icons';
import {v4 as uuidv4} from "uuid";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Plantilla1 from './Plantilla1';
import FormDatos from './FormDatos';
import FormContactos from './FormContactos';
import { Ionicons } from '@expo/vector-icons';
import Plantilla2 from './Plantilla2';
import ScreenDesign from './ScreenDesign';


const CurriculumScreen = (props) => {
    const  {uid}  = props;
    
    
    const [descripcion, setDescripcion] = useState('');
    const [swi, setSwi] = useState('');
    const [des, setDes] = useState(1);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [profesion, setProfesion] = useState('');
    const [cin, setCin] = useState('');
    const [registro, setRegistro] = useState('');
    const [fnac, setFnac] = useState('');
    const [nacio, setNacio] = useState('');
    const [telef, setTelef] = useState('');
    const [correo, setCorreo] = useState('');
    const [direcc, setDirecc] = useState('');
    const [especifica, setEspecifica] = useState([{empre:"", puesto:"",ciudad:"",desde:"",hasta:"",tareas:""}]);
    const [general, setGeneral] = useState([{empre:"", puesto:"",ciudad:"",desde:"",hasta:"",tareas:""}]);
    const [educacion, setEducacion] = useState([{titulo:"", institucion:"",duracion:"",culminacion:""}]);
    const [curso, setCurso] = useState([{titulo:"", institucion:"",duracion:"",culminacion:""}]);
    const [idioma, setIdioma] = useState([{idi:"", nivel:""}]);
    const [herra, setHerra] = useState([{herrami:"", nivel:""}]);
    const [referencia, setReferencia] = useState([{refe:"", telef:""}]);
    const [photo, setPhoto] = useState(null);
    const [photoUrl, setPhotoUrl] = useState(null);
    const [progress, setProgress] = useState(null);
    
    
    const handleListo = () => {
      Keyboard.dismiss();
    };


    useEffect(() => {
      // Request permission to access the gallery
      obtenerDatos();

      (async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      })();
    }, []);


    const obtenerDatos = async () => {
      try {
        // Verificar si los datos JSON ya están almacenados en AsyncStorage
        const datosJsonGuardados = await AsyncStorage.getItem('@datosJsonCv');
        //await AsyncStorage.removeItem('@datosJson');
        
        if (datosJsonGuardados) {
          // Si los datos existen en AsyncStorage, utilizarlos directamente
        
          const datosJson = JSON.parse(datosJsonGuardados);
          /* calcular el tamaño del json
          const bytes = new Blob([datosJson]).size;
          const megabytes = bytes / (1024 * 1024);
console.log(`El tamaño del objeto JSON es aproximadamente ${megabytes} MB.`);
*/
          // Hacer algo con los datosJson
          setDescripcion(datosJson.descripcion);
          setApellido(datosJson.apellido);
          setCin(datosJson.cin);
          setCorreo(datosJson.correo);
          setCurso(datosJson.curso);
          setDirecc(datosJson.direcc);
          setEducacion(datosJson.educacion);
          setEspecifica(datosJson.especifica);
          setFnac(datosJson.fnac);
          setGeneral(datosJson.general);
          setHerra(datosJson.herra);
          setIdioma(datosJson.idioma);
          setNacio(datosJson.nacio);
          setNombre(datosJson.nombre);
          setPhoto(datosJson.photoUrl);
          setPhotoUrl(datosJson.photoUrl);
          setProfesion(datosJson.profesion);
          setRegistro(datosJson.registro);
          setReferencia(datosJson.referencia);
          setTelef(datosJson.telef);


          console.log('AsyncStorage Cv');

        } else {
          // Si los datos no existen en AsyncStorage, obtenerlos de Firebase Firestore
          // Hacer la llamada a Firebase Firestore aquí y almacenar los datos en AsyncStorage
          // Una vez obtenidos los datos de Firebase, puedes guardarlos en AsyncStorage de la siguiente manera:
          // const datosJsonString = JSON.stringify(datosFirebase);
          // await AsyncStorage.setItem('datosJson', datosJsonString);
          //setDocuments("");
          const fetchDocuments = async () => {
            const response = await firebase.db.collection(uid).get();
            const data = response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
           // setDcv(data);
    //almacenar en el storage los datos obtenidos
    const documentoCV = data.find(item => item.id === "cv");
            const jsonValuecv = JSON.stringify(documentoCV)
           // console.log(jsonValue);
            await AsyncStorage.setItem('@datosJsonCv', jsonValuecv)


                 //buscar cv
      
   

            // Verifica si el documento fue encontrado
            if (documentoCV) {
              // Guarda el documento en el estado
              setDescripcion(documentoCV.descripcion);
              setApellido(documentoCV.apellido);
              setCin(documentoCV.cin);
              setCorreo(documentoCV.correo);
              setCurso(documentoCV.curso);
              setDirecc(documentoCV.direcc);
              setEducacion(documentoCV.educacion);
              setEspecifica(documentoCV.especifica);
              setFnac(documentoCV.fnac);
              setGeneral(documentoCV.general);
              setHerra(documentoCV.herra);
              setIdioma(documentoCV.idioma);
              setNacio(documentoCV.nacio);
              setNombre(documentoCV.nombre);
              setPhoto(documentoCV.photoUrl);
              setPhotoUrl(datosJson.photoUrl);
              setProfesion(documentoCV.profesion);
              setRegistro(documentoCV.registro);
              setReferencia(documentoCV.referencia);
              setTelef(documentoCV.telef);

            } else {
              console.warn('No se encontró un documento con id "cv"');
            }

           console.log("firebase cv");
            
          };
          fetchDocuments();
        }
      } catch (error) {
        // Manejar el error aquí
        console.error('Error al obtener los datos JSON:', error);
      }
    
    
    
    
    };

    const removePhoto = () => {

      Alert.alert(
          'Confirmar eliminación',
          '¿Estás seguro/a de que deseas eliminar esta foto?',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'Eliminar',
              style: 'destructive',
              onPress:  () => {
                if (photoUrl) {
                  // Si photoUrl existe, ejecutar el comando
                  let imageRef1 = firebase.storage.refFromURL(photoUrl).delete();
                  const documentsRef = firebase.db.collection(uid);
                  documentsRef.doc("cv").update({ photoUrl: null });
              
                  setPhoto(null);
                  setPhotoUrl(null);
                } else {
                  // Si photoUrl no existe, mostrar un mensaje en el console.log
                  console.log("no existe url")
                  setPhoto(null);
                }
              },
            },
          ],
          { cancelable: false }
        );
     
    };


     const savePictures = async () => {
  
      //const db = firebase.firestore();
     setProgress(true);

     if (photo) {
     const nombreArchivo = uuidv4();
     const extension = photo.split('.').pop();
     const file = await fetch(photo);
     const blob = await file.blob();
     
     
     const storageRef = firebase.storage.ref();
         const archivoPath = storageRef.child(`photosC/pho-${nombreArchivo}.${extension}`);
         await archivoPath.put(blob, { contentType: `image/${extension}` });;
         const enlaceUrl = await archivoPath.getDownloadURL();

         if (enlaceUrl) {
          setPhotoUrl(enlaceUrl);
          agregarDatos(uid, enlaceUrl);
          guardarEnAsyncStorage(enlaceUrl);
          
        } else {
          console.error('Error: enlaceUrl es undefined');
        }
         
         
     }   else {

      agregarDatos(uid);
      guardarEnAsyncStorage();

     }   
    // setRefre(true);
     setProgress(false);

     };


    const agregarDatos = async (uid, enlaceUrl) => {
      
      try {

        if (enlaceUrl) {
          await firebase.db.collection(uid).doc("cv").set({
            nombre: nombre,
            apellido: apellido,
            descripcion: descripcion,
            profesion: profesion,
            cin: cin,
            registro: registro,
            fnac: fnac,
            nacio: nacio,
            telef: telef,
            correo: correo,
            direcc: direcc,
            especifica: especifica,
            general: general,
            educacion: educacion,
            curso: curso,
            idioma: idioma,
            herra: herra,
            referencia: referencia,
            photoUrl: enlaceUrl
           });
        } else {
          await firebase.db.collection(uid).doc("cv").set({
            nombre: nombre,
            apellido: apellido,
            descripcion: descripcion,
            profesion: profesion,
            cin: cin,
            registro: registro,
            fnac: fnac,
            nacio: nacio,
            telef: telef,
            correo: correo,
            direcc: direcc,
            especifica: especifica,
            general: general,
            educacion: educacion,
            curso: curso,
            idioma: idioma,
            herra: herra,
            referencia: referencia,
            photoUrl: null
           });
        }
   

       // await AsyncStorage.setItem('@datosJson', "")
        //setDocuments("");
        
        
        console.log('Datos agregados firebase');
      } catch (error) {
        console.error('Error al agregar datos firebase:', error);
      }


    };

    const guardarEnAsyncStorage = async (enlaceUrl) => {
      
      if (enlaceUrl) {
      const photoUrl = enlaceUrl;
      try {
        const datos = {
          descripcion,
        nombre,
        apellido,
        profesion,
        cin,
        registro,
        fnac,
        nacio,
        telef,
        correo,
        direcc,
        especifica,
        general,
        educacion,
        curso,
        idioma,
        herra,
        referencia,
        photoUrl,
        };

        
    
        const jsonValuecv = JSON.stringify(datos);
        await AsyncStorage.setItem('@datosJsonCv', jsonValuecv);
    
        console.log('Datos guardados correctamente en AsyncStorage.');
      } catch (error) {
        console.error('Error al guardar datos en AsyncStorage:', error);
        throw error; // Lanzar el error para manejarlo en la función principal
      }
    } else {
      const photoUrl = null;
      try {
        const datos = {
          descripcion,
        nombre,
        apellido,
        profesion,
        cin,
        registro,
        fnac,
        nacio,
        telef,
        correo,
        direcc,
        especifica,
        general,
        educacion,
        curso,
        idioma,
        herra,
        referencia,
        photoUrl,
        };

        
    
        const jsonValuecv = JSON.stringify(datos);
        await AsyncStorage.setItem('@datosJsonCv', jsonValuecv);
    
        console.log('Datos guardados correctamente sin photo.');
      } catch (error) {
        console.error('Error al guardar datos en AsyncStorage:', error);
        throw error; // Lanzar el error para manejarlo en la función principal
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

      const result2 = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        // [{ crop: { originX: 185, originY: 297, width: 351, height: 550 } }],
            [{ resize: { width: 371 } }], // Redimensionar la imagen a un ancho máximo de 800 píxeles
            { compress: 0.02 } // Ajustar la calidad al 2%// Ajustar la calidad al 2%
          );
  
      if (!result2.canceled) {
        setPhoto(result.assets[0].uri);
      }
    };
  


    



  return(
    <View style={styles.container}>
    
     

    <ScrollView>
    {swi=== 3 ? (
      <View style={styles.containerE}>
      <View style={styles.separacion}>
  <Text style={styles.subtitulo}>Datos Personales</Text>
  <TouchableOpacity style={styles.botonE} onPress={() => setSwi("")}>
<Text style={styles.textE}>Listo</Text>
</TouchableOpacity>
  </View>
  <FormDatos 
  nombre={nombre} setNombre={setNombre} 
  apellido={apellido} setApellido={setApellido}
  cin={cin} setCin={setCin}
  fnac={fnac} setFnac={setFnac}
  nacio={nacio} setNacio={setNacio}
  profesion={profesion} setProfesion={setProfesion}
  registro={registro} setRegistro={setRegistro}
  swi={swi}
  />
      </View>
    

    ):(null)}

{swi=== 4 ? (
      <View style={styles.containerE}>
      <View style={styles.separacion}>
  <Text style={styles.subtitulo}>Contactame</Text>
  <TouchableOpacity style={styles.botonE} onPress={() => setSwi("")}>
<Text style={styles.textE}>Listo</Text>
</TouchableOpacity>
  </View>
  <FormContactos 
  telef={telef} setTelef={setTelef} 
  correo={correo} setCorreo={setCorreo}
  direcc={direcc} setDirecc={setDirecc}
  swi={swi}
  />
      </View>
    

    ):(null)}

    {swi=== 5 ? (
      <View style={styles.containerE}>
      <View style={styles.separacion}>
  <Text style={styles.subtitulo}>Experiencias Relacionadas</Text>
  <TouchableOpacity style={styles.botonE} onPress={() => setSwi("")}>
<Text style={styles.textE}>Listo</Text>
</TouchableOpacity>
  </View>
  <FormEspecificas especificas={especifica} setEspecificas={setEspecifica} swi={swi} />
      </View>
    

    ):(null)}

{swi=== 6 ? (
      <View style={styles.containerE}>
      <View style={styles.separacion}>
  <Text style={styles.subtitulo}>Experiencias Generales</Text>
  <TouchableOpacity style={styles.botonE} onPress={() => setSwi("")}>
<Text style={styles.textE}>Listo</Text>
</TouchableOpacity>
  </View>
  <FormGenerales especificas={general} setEspecificas={setGeneral} swi={swi} />
      </View>
    

    ):(null)}

{swi=== 7 ? (
      <View style={styles.containerE}>
      <View style={styles.separacion}>
  <Text style={styles.subtitulo}>Educación</Text>
  <TouchableOpacity style={styles.botonE} onPress={() => setSwi("")}>
<Text style={styles.textE}>Listo</Text>
</TouchableOpacity>
  </View>
  <FormEducacion educacion={educacion} setEducacion={setEducacion} swi={swi} />
      </View>
    

    ):(null)}

{swi=== 8 ? (
      <View style={styles.containerE}>
      <View style={styles.separacion}>
  <Text style={styles.subtitulo}>Cursos Realizados</Text>
  <TouchableOpacity style={styles.botonE} onPress={() => setSwi("")}>
<Text style={styles.textE}>Listo</Text>
</TouchableOpacity>
  </View>
  <FormCursos educacion={curso} setEducacion={setCurso} swi={swi} />
      </View>
    

    ):(null)}


{swi=== 9 ? (
      <View style={styles.containerE}>
      <View style={styles.separacion}>
  <Text style={styles.subtitulo}>Idiomas</Text>
  <TouchableOpacity style={styles.botonE} onPress={() => setSwi("")}>
<Text style={styles.textE}>Listo</Text>
</TouchableOpacity>
  </View>
  <FormIdiomas idioma={idioma} setIdioma={setIdioma} swi={swi} />
      </View>
    

    ):(null)}

{swi=== 10 ? (
      <View style={styles.containerE}>
      <View style={styles.separacion}>
  <Text style={styles.subtitulo}>Habilidades y Herrramientas</Text>
  <TouchableOpacity style={styles.botonE} onPress={() => setSwi("")}>
<Text style={styles.textE}>Listo</Text>
</TouchableOpacity>
  </View>
  <FormHerramientas herramientas={herra} setHerramientas={setHerra} swi={swi} />
      </View>
    

    ):(null)}

{swi=== 11 ? (
      <View style={styles.containerE}>
      <View style={styles.separacion}>
  <Text style={styles.subtitulo}>Referencias</Text>
  <TouchableOpacity style={styles.botonE} onPress={() => setSwi("")}>
<Text style={styles.textE}>Listo</Text>
</TouchableOpacity>
  </View>
  <FormReferencias referencias={referencia} setReferencias={setReferencia} swi={swi} />
      </View>
    

    ):(null)}


{swi=== 12 ? (
      <View style={styles.containerE}>
      <View style={styles.separacion}>
  <Text style={styles.subtitulo}>Elige un Diseño</Text>
  <TouchableOpacity style={styles.botonE} onPress={() => setSwi("")}>
<Text style={styles.textE}>Listo</Text>
</TouchableOpacity>
  </View>
  <ScreenDesign
  des={des}
  setDes={setDes}
  setSwi={setSwi}
  />
      </View>
    

    ):(null)}



</ScrollView>



    {swi==="" ? (

      <>
     <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        paddingTop:5,
        paddingBottom:10,
        backgroundColor: 'white',
        width: '100%', // O ajusta el ancho según tus necesidades
      }}
    >
     
      <Text style={styles.super}>Curriculum</Text>
      <TouchableOpacity onPress={savePictures}  style={{
        marginBottom:-10,
      }}>
      <Ionicons name="save-outline" size={24} color="#0D7AFF" />
</TouchableOpacity>
      <Plantilla2
setSwi={setSwi}
/>
<Plantilla1 
des={des}
setProgress={setProgress}
curso={curso}
educacion={educacion}
especifica={especifica}
general={general}
idioma={idioma}
herra={herra}
referencia={referencia}
photo={photoUrl}
nombre={nombre}
apellido={apellido}
descripcion={descripcion}
profesion={profesion}
cin={cin}
registro={registro}
fnac={fnac}
nacio={nacio}
telef={telef}
correo={correo}
direcc={direcc}
 />
    </View>
      <View style={styles.chipsCont}>

</View>

{progress ? (

<ActivityIndicator size="small" color="#007AFF" style={styles.load} />
) : null}

<ScrollView>

 <View style={styles.divider}>
 <Text style={styles.subtitulo}>Foto</Text>
 {photo ? (
  <>
   <View style={styles.nuevo}>
      <Image source={{ uri: photo }} style={{ width: 150, height: 150, borderRadius: 10 }} />
   
    </View> 
  
    <TouchableOpacity style={styles.remove} onPress={removePhoto} >
    <Octicons name="x-circle-fill" size={24} color="red" />
      </TouchableOpacity>
   
    </>
  ) : (
    <TouchableOpacity style={styles.nuevo} onPress={pickImage}>
      <MaterialIcons name="add-photo-alternate" size={20} color="#0D7AFF" />
      <Text style={styles.textNuevo}>Agregar Foto</Text>
    </TouchableOpacity>
  )}
 </View>
 <View style={styles.divider}>
 <Text style={styles.subtitulo}>Perfil</Text>
 <TextInput
        multiline
        numberOfLines={3}
        value={descripcion}
        onChangeText={setDescripcion}
        placeholder="Escribe aquí..."
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 10,
          padding: 10,
          height: 100, // Ajusta la altura según tus necesidades
        }}
      />
 </View>
 <View style={styles.divider}>
 <View style={styles.separacion}>
  <Text style={styles.subtitulo}>Datos Personales</Text>
<TouchableOpacity style={styles.botonE} onPress={() => setSwi(3)}>
<Text style={styles.textE}>Editar</Text>
</TouchableOpacity>

  </View>
  <FormDatos 
  nombre={nombre} setNombre={setNombre} 
  apellido={apellido} setApellido={setApellido}
  cin={cin} setCin={setCin}
  fnac={fnac} setFnac={setFnac}
  nacio={nacio} setNacio={setNacio}
  profesion={profesion} setProfesion={setProfesion}
  registro={registro} setRegistro={setRegistro}
  swi={""}
  />
  

 </View>
 <View style={styles.divider}>
 <View style={styles.separacion}>
 <Text style={styles.subtitulo}>Contactame</Text>
 <TouchableOpacity style={styles.botonE} onPress={() => setSwi(4)}>
<Text style={styles.textE}>Editar</Text>
</TouchableOpacity>
 </View>
 <FormContactos 
  telef={telef} setTelef={setTelef} 
  correo={correo} setCorreo={setCorreo}
  direcc={direcc} setDirecc={setDirecc}
  swi={""}
  />
 </View>

 <View style={styles.divider}>
 <View style={styles.separacion}>
  <Text style={styles.subtitulo}>Experiencias Relacionadas</Text>
<TouchableOpacity style={styles.botonE} onPress={() => setSwi(5)}>
<Text style={styles.textE}>Editar</Text>
</TouchableOpacity>

  </View>
  
  <FormEspecificas especificas={especifica} setEspecificas={setEspecifica} swi={""} />
  </View>

  <View style={styles.divider}>
  <View style={styles.separacion}>
  <Text style={styles.subtitulo}>Experiencias Generales</Text>
<TouchableOpacity style={styles.botonE} onPress={() => setSwi(6)}>
<Text style={styles.textE}>Editar</Text>
</TouchableOpacity>

  </View>
  <FormGenerales especificas={general} setEspecificas={setGeneral} swi={""} />
 
  </View>

  <View style={styles.divider}>
  <View style={styles.separacion}>
  <Text style={styles.subtitulo}>Educacion</Text>

<TouchableOpacity style={styles.botonE} onPress={() => setSwi(7)}>
<Text style={styles.textE}>Editar</Text>
</TouchableOpacity>
 
 
  </View>
  <FormEducacion educacion={educacion} setEducacion={setEducacion} swi={""} />
  </View>

  <View style={styles.divider}>
  <View style={styles.separacion}>
  <Text style={styles.subtitulo}>Cursos Realizados</Text>

<TouchableOpacity style={styles.botonE} onPress={() => setSwi(8)}>
<Text style={styles.textE}>Editar</Text>
</TouchableOpacity>
 
 
  </View>
  <FormCursos educacion={curso} setEducacion={setCurso} swi={""} />
  </View>

  <View style={styles.divider}>
  <View style={styles.separacion}>
  <Text style={styles.subtitulo}>Idiomas</Text>

<TouchableOpacity style={styles.botonE} onPress={() => setSwi(9)}>
<Text style={styles.textE}>Editar</Text>
</TouchableOpacity>
 
 
  </View>
  <FormIdiomas idioma={idioma} setIdioma={setIdioma} swi={""} />
  </View>

  <View style={styles.divider}>
  <View style={styles.separacion}>
  <Text style={styles.subtitulo}>Herramientas y Habilidades</Text>

<TouchableOpacity style={styles.botonE} onPress={() => setSwi(10)}>
<Text style={styles.textE}>Editar</Text>
</TouchableOpacity>
 

  </View>
  <FormHerramientas herramientas={herra} setHerramientas={setHerra} swi={""} />
  </View>

  <View style={styles.divider}>
  <View style={styles.separacion}>
  <Text style={styles.subtitulo}>Referencias</Text>
  
<TouchableOpacity style={styles.botonE} onPress={() => setSwi(11)}>
<Text style={styles.textE}>Editar</Text>
</TouchableOpacity>
 
 
  </View>
  <FormReferencias referencias={referencia} setReferencias={setReferencia} swi={""} />
</View>


 
 


    
    </ScrollView>


      </>
      
    

    ):(null)}

    
    </View>
  );  
}
const styles = StyleSheet.create({

container: {
    flex: 1,
   // alignItems: 'center',
  marginLeft:-5,
    width: "100%",
    backgroundColor:"white",
    paddingTop:50,
  },
  containerE: {
    flex: 1,
   // alignItems: 'center',
  paddingLeft:10,
  paddingRight: 10,
    width: "100%",
    backgroundColor:"white"
  },
    super: {
        fontSize: 30,
        alignContent:"flex-start",
        marginLeft:0,
        marginTop:10,
        fontWeight: 'bold',
      },
      subtitulo: {
        fontSize: 22,
        alignContent:"flex-start",
        marginStart:1,
        marginTop:13,
        marginBottom:18
        //fontWeight: 'bold',
      },
      divider:{
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginLeft:22,
    paddingBottom:17
    ,width: "92%",
    
      }, 
      input:{
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            marginBottom: 10,
            borderRadius: 10,
      }, 
      separacion:{
        flexDirection: 'row', 
        justifyContent: 'space-between'
      },
      botonE:{
        marginTop:16,
      },
      textE:{
        color: '#0D7AFF', fontSize: 18,
      },
      nuevo: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#0D7AFF',
        borderRadius: 10,
        borderStyle: 'dashed',
        backgroundColor: 'white',
        width: 150,
        height:150,
        marginTop:7,
        
      },
      textNuevo: {
        paddingVertical: 7,
        fontSize:14,
       color:"#0D7AFF",
       marginLeft:5
      },
      remove: {
        marginLeft: 129,
        marginTop: 53,
        position: 'absolute',
        backgroundColor:"white",
        padding:4,
        borderRadius:50
      },
      toca: {
        position: 'absolute',
        backgroundColor:"white",
        borderRadius:20,
        padding:4,

       
      },
      load:{
        margin:20
      },

      comp:{
                        margin:16,
                        backgroundColor: "white",
                        justifyContent: 'center',
                        alignContent: 'center',
                        borderRadius:50
                      },
      
      

})
export default CurriculumScreen;

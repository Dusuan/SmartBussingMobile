import * as React from 'react';
import Text from '../components/AppText';
import { View,  StyleSheet, ImageBackground, Alert } from 'react-native';
import { TextInput, Button, Divider, useTheme } from 'react-native-paper';
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import { router } from 'expo-router';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const separacion = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 10,
    }
    });

    const fondo = StyleSheet.create({
        background: {
          flex: 1,
          justifyContent: 'center',
        },
        content: {
          alignItems: 'center',
        },
      });

      const navigateProfile = () => {
                //redireccion hacia la pagina principal (segun q no jala)
                router.navigate('/');
              };

const Register = () => {

    const [correo, setCorreo] = React.useState('');
    const [nombre, setNombre] = React.useState('');
    const [contraseña, setContraseña] = React.useState('');
    const [confirmarcontraseña, setConfirmarContraseña] = React.useState('');

    const Registro = {
        nombre : nombre,
        email : correo,
        password : contraseña
    }

    const addNewUser = async () => {
        try{

          if(contraseña !== confirmarcontraseña){
            Alert.alert("Por favorverifique que sus contraseñas sean iguales")
          }

          else{

            const response = await fetch("http://{api}/api/v1/user", {
                method:'POST',
                headers : {
                    Accept : 'application/json',
                  'Content-type' : 'application/json'
                },
                credentials : 'include',
                body : JSON.stringify(Registro)
            })
            
            console.log("Response", response.status)

            if(!response.ok){
              Alert.alert("Hubo un error al momento de procesar su solicitud")
            }

            else{
              Alert.alert("Se ha registrado con exito")
              router.navigate("/")
            }
            
          }

        }catch(error){
            Alert.alert("Hubo un error fatal en el sistema")
        } 
    }

  return (

    <ImageBackground
        source={require('../assets/images/fondologinregister.png')}
        style={fondo.background}
        resizeMode="cover"
        >

        <View>
            <Text className="text-2xl mb-10" style={[{ textAlign: 'center', color: '#A4FFD7'}]}>
        Crea tu cuenta
            </Text>
        </View>

        <View className='mt-5'>
        <View className="ml-10 mr-10">
        <TextInput
        left={<TextInput.Icon icon="email" color="#FFFFFF" />}
            label={<Text style={{ color: '#FFFFFF' }}>Correo electrónico</Text>}        
            mode="flat"
            value={correo}
            onChangeText={correo => setCorreo(correo)}
            underlineColor="#3B7C5F"
            activeUnderlineColor="#3B7C5F"
            outlineColor='#FFFFFF'
            activeOutlineColor='#FFFFFF'
            selectionColor="#FFFFFF"
            textColor="#FFFFFF" 
              style={{
                backgroundColor: 'rgba(0,0,0,0.3)',
            }}
  theme={{
    colors: {
      primary: '#FFFFFF',     
      text: '#FFFFFF',        
      placeholder: '#FFFFFF', 
    },
  }}
        />
        </View>

        <View className="mt-5">
        <View className="ml-10 mr-10">
        <TextInput
        left={<TextInput.Icon icon="odnoklassniki" color="#FFFFFF" />}
            label={<Text style={{ color: '#FFFFFF' }}>Nombre de usuario</Text>}        
            mode="flat"
            value={nombre}
            onChangeText={nombre => setNombre(nombre)}
            underlineColor="#3B7C5F"
            activeUnderlineColor="#3B7C5F"
             outlineColor='#FFFFFF'
            activeOutlineColor='#FFFFFF'
           selectionColor="#FFFFFF"
          textColor="#FFFFFF"
  style={{
    backgroundColor: 'rgba(0,0,0,0.3)',
  }}
  theme={{
    colors: {
      primary: '#FFFFFF',     
      text: '#FFFFFF',       
      placeholder: '#FFFFFF', 
    },
  }}
        />
        </View>
        </View>

        <View className="mt-5">
        <View className="ml-10 mr-10">
        <TextInput
        left={<TextInput.Icon icon="lock" color="#FFFFFF" />}
            label={<Text style={{ color: '#FFFFFF' }}>Contraseña</Text>}        
            mode="flat"
            value={contraseña}
            onChangeText={contraseña => setContraseña(contraseña)}
            underlineColor="#3B7C5F"
            activeUnderlineColor="#3B7C5F"
            outlineColor='#FFFFFF'
            activeOutlineColor='#FFFFFF'
            selectionColor="#FFFFFF"
            textColor="#FFFFFF" 
            style={{
            backgroundColor: 'rgba(0,0,0,0.3)',
  }}
  theme={{
    colors: {
      primary: '#FFFFFF',     
      text: '#FFFFFF',        
      placeholder: '#FFFFFF', 
    },
  }}
        />
        </View>
        </View>
        
        <View className="mt-5">
        <View className="ml-10 mr-10">
        <TextInput
        left={<TextInput.Icon icon="refresh" color="#FFFFFF" />}
          label={<Text style={{ color: '#FFFFFF' }}>Confirmar contraseña</Text>}        
          mode="flat"
          value={confirmarcontraseña}
          onChangeText={setConfirmarContraseña}
          underlineColor="#3B7C5F"
          activeUnderlineColor="#3B7C5F"
          outlineColor='#FFFFFF'
          activeOutlineColor='#FFFFFF'
          selectionColor="#FFFFFF"
          textColor="#FFFFFF" 
            style={{
              backgroundColor: 'rgba(0,0,0,0.3)',
           }}  
            theme={{
              colors: {
                  primary: '#FFFFFF',     
                  text: '#FFFFFF',        
                  placeholder: '#FFFFFF', 
          },
      }}
/>
        </View>
        </View>
        
        <View style={separacion.container}>
        <View className="ms-14 mt-20">
        <Button mode="contained" onPress={() => navigateProfile()}
            textColor="#A4FFD7"
            style={{ backgroundColor:'transparent' }}
            >
            Regresar
        </Button>
        </View>

        <View className="me-14 mt-20">
        <Button mode="contained" onPress={() => addNewUser()}
            buttonColor='#1D3A2D'
            textColor='#FFFFFF'
            >
            Registrar
        </Button>
        </View>
        </View>
     </View>
     </ImageBackground>
  );
};


export default Register;

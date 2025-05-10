import * as React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { TextInput, Button, Divider, useTheme } from 'react-native-paper';
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

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

const Login = () => {

    const [correo, setCorreo] = React.useState('');
    const [contraseña, setContraseña] = React.useState('');

    return (

        <ImageBackground
        source={require('../assets/images/fondologinregister.png')}
        style={fondo.background}
        resizeMode="cover"
        >

        <View>
            <Text className="text-2xl mb-10" style={[{ textAlign: 'center', color: '#A4FFD7'}]}>
        ¡Bienvenido!
            </Text>
        </View>

        <View className='mt-5'>
        <View className='ml-10'>
       
            <Text style={{color: '#A4FFD7'}}>Correo electrónico</Text>
        </View>
        <View className="ml-10 mr-10">
        <TextInput
            label="Escriba aqui..."
            mode="flat"
            value={correo}
            onChangeText={correo => setCorreo(correo)}
            theme={{ colors: { primary: '#3B7C5F', background:'#E6FFF4' } }}
            style={{ backgroundColor: '#FFFFFF' }}
            underlineColor="#3B7C5F"
        />
        </View>
        
        <View className="mt-5">
        <View className='ml-10'>
            <Text style={{color: '#A4FFD7'}}>Contraseña</Text>
        </View>
        <View className="ml-10 mr-10">
        <TextInput
            label="Escriba aqui..."
            mode="flat"
            value={contraseña}
            onChangeText={contraseña => setContraseña(contraseña)}
            theme={{ colors: { primary: '#3B7C5F', background:'#E6FFF4' } }}
            style={{ backgroundColor: '#FFFFFF' }}
            underlineColor="#3B7C5F"
        />
        </View>
        </View>

        
        <View style={separacion.container}>
        <View className="ms-14 mt-20">
        <Button mode="contained" onPress={() => console.log('Pressed')}
            textColor="#A4FFD7"
            style={{ backgroundColor:'transparent' }}
            >
            Regresar
        </Button>
        </View>

        <View className="me-14 mt-20">
        <Button mode="contained" onPress={() => console.log('Pressed')}
            buttonColor='#1D3A2D'
            textColor='#FFFFFF'
            >
            Iniciar sesión
        </Button>
        </View>
        </View>
     </View>
     </ImageBackground>
    );
};

export default Login;
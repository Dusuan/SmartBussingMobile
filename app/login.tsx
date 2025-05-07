import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button, Divider } from 'react-native-paper';

const Login = () => {

    const [correo, setCorreo] = React.useState('');
    const [contraseña, setContraseña] = React.useState('');

    return (
        <View className='mt-5'>
            <Text>Correo electrónico</Text>
        <View className="ml-10 mr-10">
        <TextInput
            label="Escriba aqui..."
            mode="flat"
            value={correo}
            onChangeText={correo => setCorreo(correo)}
        />
        </View>
        <View className="mt-5">
            <Text>Contraseña</Text>
            <View className="ml-10 mr-10">
        <TextInput
            label="Escriba aqui..."
            mode="flat"
            value={contraseña}
            onChangeText={contraseña => setContraseña(contraseña)}
        />
        </View>
        </View>

        <View className="mt-10 ml-20 mr-20">
        <Button mode="contained" onPress={() => console.log('Pressed')}>
            Iniciar sesión
        </Button>
        </View>
     </View>
    );
};

export default Login;
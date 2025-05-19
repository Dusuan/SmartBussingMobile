import * as React from 'react';
import {  StyleSheet, ImageBackground } from 'react-native';
import { TextInput, Button, Divider, useTheme, Checkbox } from 'react-native-paper';
import { View } from 'react-native';
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { router } from 'expo-router';
import Text from '../../components/AppText';

export default function Configuracion() {

    const [checkedNightMode, setCheckedNightMode] = React.useState(false);
    const [checkedNotificacion, setCheckedNotificacion] = React.useState(false);

    const fondo = StyleSheet.create({
        background: {
          flex: 1,
          justifyContent: 'center',
        },
        content: {
          alignItems: 'center',
        },
      });

    return (
        
        <>
        <ImageBackground
                source={require('../../assets/images/fondologinregister.png')}
                style={fondo.background}
                resizeMode="cover"
                >

        <View>
            <Text className="text-2xl mt-20" style={[{ textAlign: 'center', color: 'black' }]}>
                Configuración
            </Text>
        </View>
        
        <View className='mt-10'>
            <Checkbox.Item
            label='Notificaciones push'
            status={checkedNotificacion ? 'checked' : 'unchecked'}
            /*style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}*/
            onPress={() => {
                setCheckedNotificacion(!checkedNotificacion);
            }}
            />

            <Checkbox.Item 
            label='Modo oscuro' 
            status={checkedNightMode ? 'checked' : 'unchecked'}
            /*style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}*/
            onPress={() => {
                setCheckedNightMode(!checkedNightMode);
            }}
            />

            <View>
            <Button labelStyle={{fontSize: 15, fontWeight: 'light'}} 
            mode='text' 
            textColor='black' 
            icon="chevron-right"
            contentStyle={{ flexDirection: 'row-reverse' }}
            onPress={() => console.log('5 estrellas omg')}>
                Calificanos
            </Button>
            </View>
        </View>
        </ImageBackground>
      </> 
    )
}
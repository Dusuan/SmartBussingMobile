import * as React from "react";
import { View, StyleSheet, ImageBackground, Alert } from "react-native";
import { TextInput, Button, Divider, useTheme } from "react-native-paper";
import { router } from "expo-router";
import Text from '../components/AppText';
import { useUser } from "./contextUser";
import * as WebBrowser from 'expo-web-browser'
import * as Linking from 'expo-linking'
import { supabase } from '../utils/supabase'

WebBrowser.maybeCompleteAuthSession()

const separacion = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 10,
  },
});

const fondo = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
  },
});

const navigateProfile = () => {
  //redireccion hacia la pagina principal (segun q no jala)
  router.navigate("/");
};

const Login = () => {

  const manageLogin = async ( correo : string , contraseña : string) => {
      try{
        const response = await fetch(`https://smart-bussing-back.onrender.com/api/v1/user/login?email=${correo}&password=${contraseña}`,{
          method : 'POST',
          headers : {
                Accept : 'application/json',
                'Content-Type' : 'application/json'
              },
              credentials : 'include',
        })

        console.log("Response : " , response.status)

        if(response.status === 401){
          Alert.alert("Por favor vuelva a ingresar sus datos")
        }
        else if(!response.ok){
          Alert.alert("Hubo un error en el servidor, vuelva a intentarlo mas tarde")
        }
        else{
          Alert.alert("Bienvenido a SmartBussing")
          asignUserInfo()
          router.navigate("/(dashboard)")
        }

      }catch(error){
        Alert.alert("Hubo un error fatal en el sistema")
      }
  }

  //SIGN IN DE GOOGLE
const signInWithGoogle = async () => {
  const redirectTo = Linking.createURL('auth/callback')

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
      skipBrowserRedirect: true,
    },
  })

  if (error) {
    Alert.alert('Error', error.message)
    return
  }

  if (data?.url) {
    const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo)

    if (result.type === 'success' && result.url) {
      const params = new URLSearchParams(
        result.url.split('#')[1] ?? result.url.split('?')[1]
      )
      const access_token = params.get('access_token')
      const refresh_token = params.get('refresh_token')

      if (access_token) {
        const { error: sessionError } = await supabase.auth.setSession({
          access_token,
          refresh_token: refresh_token ?? '',
        })

        if (sessionError) {
          Alert.alert('Error', sessionError.message)
        } else {
          router.navigate('/(dashboard)')
        }
      } else {
        Alert.alert('Error', 'No se pudo obtener el token de Google')
      }
    }
  }
}
        //FINAL DE SIGN IN GOOGLE
  const {setUser} = useUser();

  const asignUserInfo = async () => {
    try{
      const response = await fetch(`https://smart-bussing-back.onrender.com/api/v1/user/`);

      if(!response.ok){
        console.log("Hubo un error de respuesta del servidor")
      }

      const data = await response.json();
      console.log("Usuario : ", data)
      setUser(data)

    }catch(error){
      console.log("No se pudo obtener la info del usuario", error)
    }
    
  }

  const [correo, setCorreo] = React.useState("");
  const [contraseña, setContraseña] = React.useState("");
  const [mostrarContraseña, setMostrarContraseña] = React.useState(false);

  return (
    <ImageBackground
      source={require("../assets/images/fondologinregister.png")}
      style={fondo.background}
      resizeMode="cover"
    >
      <View>
        <Text
          className="text-2xl mb-10"
          style={[{ textAlign: "center", color: "#A4FFD7" }]}
        >
          ¡Bienvenido!
        </Text>
      </View>

      <View className="mt-5">
        <View className="ml-10 mr-10">
          <TextInput
            left={<TextInput.Icon icon="email" color="#FFFFFF" />}
            label={<Text style={{ color: "#FFFFFF" }}>Correo electrónico</Text>}
            mode="flat"
            value={correo}
            onChangeText={(correo) => setCorreo(correo)}
            underlineColor="#3B7C5F"
            activeUnderlineColor="#3B7C5F"
            outlineColor="#FFFFFF"
            activeOutlineColor="#FFFFFF"
            selectionColor="#FFFFFF"
            textColor="#FFFFFF"
            style={{
              backgroundColor: "rgba(0,0,0,0.3)",
            }}
            theme={{
              colors: {
                primary: "#FFFFFF",
                text: "#FFFFFF",
                placeholder: "#FFFFFF",
              },
            }}
          />
        </View>
      </View>

      <View className="mt-5">
        <View className="ml-10 mr-10">
          <TextInput
            left={<TextInput.Icon icon="lock" color="#FFFFFF" />}
            right={
              <TextInput.Icon
                icon={mostrarContraseña ? "eye-off" : "eye"}
                color="#FFFFFF"
                onPress={() => setMostrarContraseña(!mostrarContraseña)}
              />
            }
            label={<Text style={{ color: "#FFFFFF" }}>Contraseña</Text>}
            mode="flat"
            value={contraseña}
            onChangeText={(contraseña) => setContraseña(contraseña)}
            secureTextEntry={!mostrarContraseña}
            underlineColor="#3B7C5F"
            activeUnderlineColor="#3B7C5F"
            outlineColor="#FFFFFF"
            activeOutlineColor="#FFFFFF"
            selectionColor="#FFFFFF"
            textColor="#FFFFFF"
            style={{
              backgroundColor: "rgba(0,0,0,0.3)",
            }}
            theme={{
              colors: {
                primary: "#FFFFFF",
                text: "#FFFFFF",
                placeholder: "#FFFFFF",
              },
            }}
          />
        </View>
      </View>

      <View style={separacion.container}>
        <View className="ms-14 mt-20">
          <Button
            mode="contained"
            onPress={() => navigateProfile()}
            textColor="#A4FFD7"
            style={{ backgroundColor: "transparent" }}
          >
            Regresar
          </Button>
        </View>

        <View className="me-14 mt-20">
          <Button
            mode="contained"
            onPress={() => manageLogin(correo, contraseña)}
            buttonColor="#1D3A2D"
            textColor="#FFFFFF"
          >
            Iniciar sesión
          </Button>
        </View>
      </View>

      {/* Botón de Google — separado y centrado */}
      <View className="mt-6 ml-10 mr-10">
        <Button
          mode="contained"
          onPress={signInWithGoogle}
          buttonColor="#4285F4"
          textColor="#FFFFFF"
          icon="google"
        >
          Continuar con Google
        </Button>
      </View>
    </ImageBackground>
  );
};

export default Login;

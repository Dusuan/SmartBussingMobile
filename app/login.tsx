import * as React from "react";
import { View, StyleSheet, ImageBackground, Alert } from "react-native";
import { TextInput, Button, Divider, useTheme } from "react-native-paper";
import { router } from "expo-router";
import Text from '../components/AppText';

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
        const response = await fetch(`http://{API}/api/v1/user/login?email=${correo}&password=${contraseña}`,{
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
          router.navigate("/(dashboard)")
        }

      }catch(error){
        Alert.alert("Hubo un error fatal en el sistema")
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
            onPress={() => manageLogin(correo,contraseña)}
            buttonColor="#1D3A2D"
            textColor="#FFFFFF"
          >
            Iniciar sesión
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Login;

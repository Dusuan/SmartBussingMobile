import { router } from "expo-router";
import { Button, View,  ScrollView } from "react-native";
import { Card, IconButton, Icon, Surface } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Flechitaregreso from "../../components/flechitaregreso";
import { StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Rutasfavoritas from "@/components/rutasfavoritas";
import {useFonts} from "expo-font";
import Text from '../../components/AppText';


export default function Profile() {
  const navigateProfile = () => {
    //redireccion hacia la pagina principal (segun q no jala)
    router.navigate("/configuracion");
  };

  const [fontsLoaded] = useFonts({Manrope : require("../../assets/fonts/Manrope-regular.otf")}) //Agregeun esto con el nombre de las fonts que van a usar
      
  if(!fontsLoaded) return null; //Y esto para que no se crashee

  return (
    <SafeAreaView>
      <View className="ml-3">
        <Flechitaregreso ruta={"../"} />
      </View>

      {/*Apartado donde sale el nombre y correo del usuario*/}
      <View className="h-48 w-90 m-6 rounded-[15px] flex flex-wrap">
        <LinearGradient
          colors={["#3c7c5c", "#75bd99", "#a9d6bf"]}
          style={styles.linearGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 2, y: 1 }}
        >
          {/*Aqui adentro poner el icono y el texto de hola usuario*/}
          <View className="absolute">
            <AntDesign
              name="user"
              color="white"
              size={90}
              className="mt-10 ml-3"
            />
          </View>
          <Text style={{fontFamily: "Manrope"}} className="text-4xl mt-14 ml-28 text-white">Hola, Usuario</Text>
          <Text style={{fontFamily: "Manrope"}} className="text-xl ml-28 text-white">
            correo.ejemplo@cetys.edu.mx
          </Text>
        </LinearGradient>
      </View>

      {/*Apartado de Modifical Perfil*/}
      <View className="h-20 w-90 m-6 mt-1 rounded-[15px] flex flex-wrap bg-white">
        <View className="absolute">
          <Feather name="user" color="gray" size={50} className="ml-4 mt-3" />
        </View>

        <Text style={{fontFamily: "Manrope"}} className="text-3xl ml-24 mt-5 text-black">Modificar Perfil</Text>

        <View className="ml-9 mt-2">
          <IconButton
            icon={() => <AntDesign name="arrowright" color="grey" size={40} />}
            onPress={() => navigateProfile()}
          />
        </View>
      </View>

      {/*Apartado para las rutas favoritas */}

      <View className="h-90 w-90 m-6 mt-1 rounded-[15px] bg-white">
        <View className="ml-5 mt-3">
          <AntDesign name="hearto" color="grey" size={45} />
        </View>

        <Text style={{fontFamily: "Manrope"}} className="text-3xl ml-24 mt-4 absolute text-black">
          Rutas Favoritas
        </Text>

        <ScrollView className="h-80 w-90 m-6 mt-1 rounded-[15px] bg-white ">
          {/*Test del scrollview*/}
          <Rutasfavoritas destino={"Cetys"} inicio={"Mi casa"} />
          <Rutasfavoritas destino={"Cetys"} inicio={"Mi casa"} />
          <Rutasfavoritas destino={"Cetys"} inicio={"Mi casa"} />
          <Rutasfavoritas destino={"Cetys"} inicio={"Mi casa"} />
          <Rutasfavoritas destino={"Cetys"} inicio={"Mi casa"} />
          <Rutasfavoritas destino={"Cetys"} inicio={"Mi casa"} />
          <Rutasfavoritas destino={"Cetys"} inicio={"Mi casa"} />
          <Rutasfavoritas destino={"Cetys"} inicio={"Mi casa"} />
          <Rutasfavoritas destino={"Cetys"} inicio={"Mi casa"} />
          <Rutasfavoritas destino={"Cetys"} inicio={"Mi casa"} />
          <Rutasfavoritas destino={"Cetys"} inicio={"Mi casa"} />
          <Rutasfavoritas destino={"Cetys"} inicio={"Mi casa"} />
          <Rutasfavoritas destino={"Cetys"} inicio={"Mi casa"} />
          <Rutasfavoritas destino={"Cetys"} inicio={"Mi casa"} />
          <Rutasfavoritas destino={"Cetys"} inicio={"Mi casa"} />
          <Rutasfavoritas destino={"Cetys"} inicio={"Mi casa"} />
        </ScrollView>
      </View>

      {/*Boton de cerrar sesion*/}
      <View
        style={{
          width: "50%",
          alignSelf: "center",
          borderRadius: 25,
          overflow: "hidden",
        }}
      >
        <Button
          title="Cerrar Sesión"
          color={"black"}
          onPress={() =>
            console.log(
              "Cerrando sesión!"
            )
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Gill Sans",
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
    backgroundColor: "transparent",
  },
});

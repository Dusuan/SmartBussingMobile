import { router } from "expo-router";
import { Button, View, Text } from "react-native";
import { Card, IconButton, Icon, Surface } from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {useFonts} from "expo-font";


type anuncio = {
nombreEmpresa: string;
  descripcion: string;
  distancia: string;
};

export default function anuncio({nombreEmpresa, descripcion, distancia}: anuncio) {

    const [fontsLoaded] = useFonts({Manrope : require("../assets/fonts/Manrope-regular.otf")}) //Agregeun esto con el nombre de las fonts que van a usar
    
      if(!fontsLoaded) return null; //Y esto para que no se crashee

  return (
    <View
      className="w-90 mt-2 mb-2 items-center flex-row justify-between"
      style={{
      backgroundColor: "#f2f2f2",
      borderRadius: 15,
      height: 125,
      }}
    >
      <View className="flex-row justify-center ml-5">
        <View className="h-32 w-32 items-center justify-center border-2 border-solid">
            <MaterialCommunityIcons
            name="advertisements"
            color={"black"}
            size={90}
            />
        </View>

        <View className="flex ml-5">
            <Text style={{fontFamily: "Manrope"}} className="text-xl">{nombreEmpresa}</Text>
            <Text style={{fontFamily: "Manrope"}} className="text-sm">{descripcion}</Text>
            <Text style={{fontFamily: "Manrope"}} className="text-lg">{distancia}</Text>
        </View>
      </View>
    </View>
  );
}

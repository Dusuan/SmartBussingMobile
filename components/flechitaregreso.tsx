import { router } from "expo-router";
import { Button, View, Text } from "react-native";
import { Card, IconButton, Icon, Surface } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

type ruta = {
  ruta: string;
};

export default function flechitaregreso(texto: ruta) {
  const navigate = () => {
    //redireccion hacia la pagina principal (segun q no jala)
    router.navigate(`${texto.ruta}`);
  };
  return (
    <View className="ml-3 ">
      <IconButton
        className=""
        mode="contained-tonal"
        containerColor="#353935"
        icon={() => <AntDesign name="arrowleft" color="#FAF9F6" size={30} />}
        onPress={() => navigate()}
      />
    </View>
  );
}

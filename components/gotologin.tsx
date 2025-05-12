import { router } from "expo-router";
import { Button, View, Text } from "react-native";
import { Card, IconButton, Icon, Surface } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

type ruta = {
  ruta: string;
};

export default function ProfileButton(texto: ruta) {
  const navigateProfile = () => {
    //redireccion hacia la pagina principal (segun q no jala)
    router.navigate(`${texto.ruta}`);
  };
  return (
    <View className="ml-3">
      <IconButton
        className=""
        mode="contained-tonal"
        containerColor="#ffffff"
        icon={() => <AntDesign name="user" color="#2C2C2C" size={30} />}
        onPress={() => navigateProfile()}
      />
    </View>
  );
}

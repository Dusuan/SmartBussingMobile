import { router } from "expo-router";
import { Button, View, Text } from "react-native";
import { Card, IconButton, Icon, Surface } from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";

type ruta = {
  inicio: string;
  destino: string;
};

export default function rutasfavoritas({ inicio, destino }: ruta) {
  const navigateProfile = () => {
    router.navigate("/(dashboard)");
  };

  return (
    <View className="h-20 w-90 m-6 rounded-[15px] items-center flex-row justify-between bg-gray-800" >
      <View className="flex">
        <Text className="text-xl ml-3 mt-1">{inicio}</Text>
        <Text className="text-lg ml-3 mt-1">{destino}</Text>
      </View>
      <IconButton
        icon={() => <AntDesign name="arrowright" color="grey" size={40} />}
        onPress={() => navigateProfile()}
      />
    </View>
  );
}

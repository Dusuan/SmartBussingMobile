import { router } from "expo-router";
import { Button, View, Text, StyleSheet } from "react-native";
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
    <View
      className="w-90 items-center flex-row justify-between"
      style={{
      backgroundColor: "#f2f2f2",
      borderRadius: 15,
      height: 75,
      margin: 10,
      }}
    >
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

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: "relative",
  },
  map: {
    flex: 1,
  },
  bottomSheetContainer: {
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10,
  },
  BottomSheetbackground: {
    flex: 1,
    marginTop: 0,
  },
});

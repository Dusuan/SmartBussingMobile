import { router } from "expo-router";
import { Button, View, Text } from "react-native";
import { Card, IconButton, Icon, Surface } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Dispatch, SetStateAction } from "react";


type bottomSheet = {
  HandleOpenPress: Dispatch<SetStateAction<Boolean>>;
};

export default function pullbottom({HandleOpenPress}: bottomSheet) {

  return (
    <View className="ml-3 ">
      <IconButton
        className=""
        mode="contained-tonal"
        containerColor="#727272"
        icon={() => <AntDesign name="home" color="#2C2C2C" size={30} />}
        onPress={() => HandleOpenPress(true)}
      />
    </View>
  );
}

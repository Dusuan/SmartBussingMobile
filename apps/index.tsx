import React from "react";
import { Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { Button } from "react-native-paper";
import { Image } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../assets/images/logo.png")}
        className="w-1/2 h-1/2"
        />
      <Button>
        <Text className="text-bold">Crear cuenta</Text>
      </Button>
      <Button>
        <Text>Iniciar Sesión</Text>
      </Button>
    </View>
  );
}

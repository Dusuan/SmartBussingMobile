import { View, Pressable, Image } from "react-native";
import {
  Avatar,
  Button,
  Card,
  IconButton,
} from "react-native-paper";
import { Dispatch, SetStateAction } from "react";
import { StyleSheet } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { router } from "expo-router";
import Text from './AppText';

type view = {
  img: string;
  name: string;
  url: string;
  setCurrMap: Dispatch<SetStateAction<string>>;
  setRuta: Dispatch<SetStateAction<string>>;
};

export default function MapView({ img, name, url, setCurrMap, setRuta }: view) {
  const navigate = () => {
    //redireccion hacia la pagina principal (segun q no jala)
    router.navigate(`/(com_rutas)`);
  };
  return (
    <Pressable
      onPress={() => {
        setCurrMap(url);
        setRuta(name);
      }}
    >
      <View
        className="h-20  rounded-[15px] items-center justify-start flex-row"
        style={[
          styles.card,
          {
            backgroundColor: "rgba(0,0,0,.3)",
          },
        ]}
      >
        <Image
          source={require("../assets/images/Microbus.jpg")}
          style={{
            width: 60,
            height: 60,
            borderRadius: 10,
            marginRight: 10,
          }}
          resizeMode="cover"
        />
        <Text
          style={[{ backgroundColor: "transparent" }, styles.text]}
          variant="titleLarge"
        >
          {name}
        </Text>
        <View className="z-[100] flex-1 flex-row justify-end">
          {name != "Mapa de Ensenada" ? (
            <IconButton
              className=""
              mode="contained-tonal"
              containerColor="#353935"
              icon={() => (
                <AntDesign name="exclamationcircle" color="#FAF9F6" size={30} />
              )}
              onPress={() => navigate()}
            />
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "transparent",
  },
  text: {
    color: "white",
  },
});

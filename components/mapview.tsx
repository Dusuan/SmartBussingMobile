import { View, Pressable, Image } from "react-native";
import { Avatar, Button, Card, Text as PaperText } from "react-native-paper";
import { Dispatch, SetStateAction } from "react";
import { StyleSheet } from "react-native";

type view = {
  img: string;
  name: string;
  url: string;
  setCurrMap: Dispatch<SetStateAction<string>>;
  setRuta: Dispatch<SetStateAction<string>>;
};

export default function MapView({ img, name, url, setCurrMap, setRuta }: view) {
  return (
    <Pressable
      onPress={() => {
        setCurrMap(url);
        setRuta(name);
      }}
    >
      <View
        className="h-20  rounded-[15px] items-center flex-row"
        style={[
          styles.card,
          {
            backgroundColor: "rgba(0,0,0,.3)",
          },
        ]}
      >
        <Image
          source={require("../assets/images/primera.jpg")}
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            marginRight: 10,
          }}
          resizeMode="contain"
        />


        <PaperText
          style={[{ backgroundColor: "transparent" }, styles.text]}
          variant="titleLarge"
        >
          {name}
        </PaperText>
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

import { View } from "react-native";
import { Avatar, Button, Card, Text as PaperText } from "react-native-paper";
import { Dispatch, SetStateAction } from "react";
import { StyleSheet } from "react-native";

type view = {
  img: string;
  name: string;
  url: string;
  setCurrMap: Dispatch<SetStateAction<string>>;
};

export default function MapView({ img, name, url, setCurrMap }: view) {
  return (
      <Card style={styles.card} mode="elevated" onPress={() => setCurrMap(url)}>
        <Card.Content>
          <PaperText style={styles.text} variant="titleLarge">{name}</PaperText>
        </Card.Content>
      </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "black",
    borderRadius: 20,
  },
  text : {
    color : "white",
  }
});

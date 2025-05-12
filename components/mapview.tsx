import { View } from "react-native";
import { Avatar, Button, Card, Text as PaperText } from "react-native-paper";
import { Dispatch, SetStateAction } from "react";

type view = {
  img: string;
  name: string;
  url: string;
  setCurrMap: Dispatch<SetStateAction<string>>;
};

export default function MapView({ img, name, url, setCurrMap }: view) {
  return (
      <Card className="bg-slate-900
      " onPress={() => setCurrMap(url)}>
        <Card.Title title="" subtitle="" />
        <Card.Content>
          <PaperText variant="titleLarge">{name}</PaperText>
        </Card.Content>
      </Card>
  );
}

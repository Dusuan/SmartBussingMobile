import { Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import React from "react";
import MapView from "react-native-maps";
import { StyleSheet} from "react-native";


export default function Index() {
  return (
    <View style = {styles.container}>
      <MapView style={styles.map} />
    </View>
  );
}

      const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
        map: {
          width: "100%",
          height: "100%",
        },
  });


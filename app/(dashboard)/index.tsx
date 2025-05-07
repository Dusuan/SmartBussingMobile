import { Text, View } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Mapbox from "@rnmapbox/maps";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import Constants from "expo-constants";
Mapbox.setAccessToken(Constants.expoConfig?.extra?.MAPBOX_DOWNLOAD_TOKEN);

export default function Dashboard() {
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        <Mapbox.MapView style={styles.map} />

        <GestureHandlerRootView style={styles.container}>
          <BottomSheet>
            <BottomSheetView>
              <View className="flex-1 justify-center items-center h-80">
              <Text>Hola</Text>
              </View>
              <Text>Sí funca</Text>
            </BottomSheetView>
          </BottomSheet>
        </GestureHandlerRootView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: "100%",
    width: "100%",
  },
  map: {
    flex: 1,
  },
});

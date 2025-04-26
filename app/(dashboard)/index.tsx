import { Text, View } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Mapbox from '@rnmapbox/maps';
import { StyleSheet } from "react-native";
import Constants from "expo-constants";
Mapbox.setAccessToken(Constants.expoConfig?.extra?.MAPBOX_DOWNLOAD_TOKEN);

export default function Dashboard() {
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}> 
        <Mapbox.MapView style={styles.map}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: "100%",
    width: "100%",
  },
  map: {
    flex: 1
  }
});
import { Text, View } from "react-native";
import { Link } from "expo-router";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Dashboard() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }} >
        <MapView
          style={{ flex: 1 }}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 31.856,
            longitude: -116.61436,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        />
      </View>
    </SafeAreaView>
  );
}

import { Platform, Text, View, PermissionsAndroid } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Mapbox from "@rnmapbox/maps";
import { UserTrackingMode } from "@rnmapbox/maps";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useState } from "react";
import BusCard from "@/components/buscard";

import Constants from "expo-constants";
import { useEffect } from "react";

Mapbox.setAccessToken(Constants.expoConfig?.extra?.MAPBOX_DOWNLOAD_TOKEN);

export default function Dashboard() {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Mapbox.MapView style={styles.map}>
          {/*
          
          Encontrar forma de que no crashee usando la localización del usuario
          <Mapbox.UserLocation visible={true} />
           
          <Mapbox.Camera
            followUserLocation={true}
            followUserMode={UserTrackingMode.Follow}
            zoomLevel={12}
              
          */}
          <Mapbox.Camera
           centerCoordinate={[-122.1797, 37.4518]} // order of [y, x] instead of [x, y]
            zoomLevel={12}
          />
        </Mapbox.MapView>
      </View>
    </View>
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

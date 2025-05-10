import { Platform, Text, View, PermissionsAndroid } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import MapboxGL from "@rnmapbox/maps";
import { UserTrackingMode } from "@rnmapbox/maps";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useState, useRef } from "react";
import BusCard from "@/components/buscard";
import { LocationPuck } from "@rnmapbox/maps";
import Constants from "expo-constants";
import { useEffect } from "react";
import tilesets from "../../assets/tilesets/tilesets.json";

MapboxGL.setAccessToken(Constants.expoConfig?.extra?.MAPBOX_DOWNLOAD_TOKEN);
MapboxGL.setTelemetryEnabled(false);

export default function Dashboard() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  // callbacks

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView
          styleURL="mapbox://styles/dusuan/cmahkukuu00t601rf921chgpg"
          rotateEnabled={true}
          style={styles.map}
        >
          <MapboxGL.Camera
            defaultSettings={{
              zoomLevel: 12,
              centerCoordinate: [-116.6076, 31.8658], // centerCoordinate: [-116.6076, 31.8658] order of [y, x] instead of [x, y]
            }}
            zoomLevel={14}
            //  followUserLocation={true}
            //  followUserMode={UserTrackingMode.Follow}
            pitch={20}
            animationMode="flyTo"
            animationDuration={1000}
          />
          <LocationPuck
            topImage="topImage"
            visible={true}
            scale={["interpolate", ["linear"], ["zoom"], 10, 1.0, 20, 4.0]}
            pulsing={{
              isEnabled: true,
              color: "teal",
              radius: 50.0,
            }}
          />

          {/*  <MapboxGL.VectorSource // adding a vector source and styling it directly in the app
            id="id-lines-source"
            url=""
          >
            <MapboxGL.LineLayer
              id="line-layer"
              style={{
                lineColor: "#FF5733", // Red color for the line
                lineWidth: 5,
              }}
            />
          </MapboxGL.VectorSource>
        */}
        </MapboxGL.MapView>
        {/* */}
        <View className="inset-y-10" style={styles.BottomSheet}>
          <GestureHandlerRootView style={styles.container}>
            <BottomSheet ref={bottomSheetRef}>
              <BottomSheetView>
                <Text>Awesome 🎉</Text>
              </BottomSheetView>
            </BottomSheet>
          </GestureHandlerRootView>
        </View>
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
    flex: 1,
    height: "100%",
    width: "100%",
  },
  map: {
    flex: 1,
  },
  BottomSheet : {
    position : "absolute",

  }
});

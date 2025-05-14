import {
  Platform,
  Text,
  View,
  PermissionsAndroid,
  ImageBackground,
} from "react-native";
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
import MapView from "@/components/mapview";
import Flechitaregreso from "@/components/flechitaregreso";
import ProfileButton from "@/components/gotologin";
import { Modal, Portal, Button, PaperProvider, Card, Text as PaperText } from 'react-native-paper';
import * as React from 'react';
import Anuncio from "@/components/anuncio";

MapboxGL.setAccessToken(Constants.expoConfig?.extra?.MAPBOX_DOWNLOAD_TOKEN);
MapboxGL.setTelemetryEnabled(false);

export default function Dashboard() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  // callbacks

  const [CurrMap, setCurrMap] = useState("mapbox://styles/mapbox/streets-v11");
  const [Ruta, setRuta] = useState("Sin ruta");
  
  //Cosas del modal
  const [visible, setVisible] = React.useState(true);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    height: `${95}%` as `${number}%`,
    width: `${90}%` as `${number}%`,
    borderRadius: 15,
  };


  return (
    <GestureHandlerRootView style={styles.root} className="flex-1 relative">
      <MapboxGL.MapView
        style={styles.map}
        styleURL={CurrMap}
        rotateEnabled={true}
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
    
      {/*Modal verbo*/}
      <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
              <View className="flex-1 justify-start">
                <Anuncio nombreEmpresa={"Empresa"} descripcion={"Descripcion de empresa"} distancia={"Distancia"} />
                <Anuncio nombreEmpresa={"Empresa"} descripcion={"Descripcion de empresa"} distancia={"Distancia"} />
              </View>
            </Modal>
      </Portal>
  
      <View className="absolute top-20 z-2">
        <View
          className="flex-row
         w-full  justify-between"
        >
          <View className="">
            <Flechitaregreso ruta={"/"} />
            <ProfileButton ruta={"/(profile)"} />
          </View>
          <View  style= {{backgroundColor: "#3B7C5F"}} className="flex justify-center mt-2 items-center border-2 border-white px-4 max-h-12 mr-4 border-whit rounded-lg">
            <Text className="" style={{color: "white" }}>{Ruta}</Text>
          </View>
        </View>
      </View>

      <BottomSheet
        index={2}
        snapPoints={["100%", "75%", "50%", "30%", "10%"]}
        enablePanDownToClose={false}
        ref={bottomSheetRef}
      >
        <ImageBackground
          source={require("../../assets/images/fondologinregister.png")}
          style={styles.BottomSheetbackground}
          resizeMode="cover"
        >
          <BottomSheetView style={styles.bottomSheetContainer}>
            {Object.entries(tilesets).map(([key, value]) => (
              <View key={key} className="mx-2 py-4">
                <MapView
                  img={value.url}
                  name={key}
                  url={value.url}
                  setCurrMap={setCurrMap}
                  setRuta={setRuta}
                />
              </View>
              
            ))}
            
            {/*Boton para ver rutas populares (anuncios xd) */}
            <Card
              style={styles.card}
              mode="elevated"
              onPress={() => {
              showModal();
              }}>
              <Card.Content>
                <PaperText style={styles.text} variant="titleLarge">  
                  Ver Lugares Populares
                </PaperText>
              </Card.Content>
            </Card>

          </BottomSheetView>
        </ImageBackground>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: "relative",
  },
  map: {
    flex: 1,
  },
  bottomSheetContainer: {
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10,
  },
  BottomSheetbackground: {
    flex: 1,
    marginTop: 0,
  },
  card: {
    backgroundColor: "black",
    borderRadius: 20,
    width: "97%",
    alignSelf: "center",
    marginTop: 17,
  },
  text: {
    color: "white",
  },
});

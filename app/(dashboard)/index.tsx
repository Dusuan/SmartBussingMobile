import {
  Platform,
  View,
  PermissionsAndroid,
  ImageBackground,
  Dimensions,
  Image,
} from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import MapboxGL from "@rnmapbox/maps";
import { UserTrackingMode } from "@rnmapbox/maps";
import { StyleSheet } from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
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
import useBottomSheetAnimatedIndex from "@gorhom/bottom-sheet";
import { useAnimatedStyle, interpolateColor } from "react-native-reanimated";
import { ScrollView } from "react-native-gesture-handler";
import Pullbottom from "@/components/pullbottom";
import {
  Modal,
  Portal,
  Button,
  PaperProvider,
  IconButton,

} from "react-native-paper";
import * as React from "react";
import Anuncio from "@/components/anuncio";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import Text from '../../components/AppText';


MapboxGL.setAccessToken(Constants.expoConfig?.extra?.MAPBOX_DOWNLOAD_TOKEN);
MapboxGL.setTelemetryEnabled(false);

const width = Dimensions.get("window").width;

export default function Dashboard() {
  const navigate = (ruta: String) => {
    router.navigate(`/${ruta}`);
  };

  const Slides = [
    {
      id: "1",
      render: () => (
        <View className="m-2">
          {Object.entries(tilesets).map(([key, value]) => (
            <View key={key} className=" py-4">
              <MapView
                img={value.url}
                name={key}
                url={value.url}
                setCurrMap={setCurrMap}
                setRuta={setRuta}
              />
            </View>
          ))}
        </View>
      ),
    },
    {
      id: "2",
      render: () => (
        <View className="p-4">
          <Button
            className="mb-8"
            mode="elevated"
            textColor="black"
            onPress={showAds}
          >
            {" "}
            Ver lugares de la semana{" "}
          </Button>
          <Button
            className="mb-8"
            mode="elevated"
            textColor="black"
            onPress={() => navigate("(routeView)")}
          >
            {" "}
            Ejemplo de ruta
          </Button>
        </View>
      ),
    },
    {
      id: "3",
      render: () => (
        <View className="p-4">
          <Button
            className="mb-8"
            mode="elevated"
            textColor="black"
            onPress={showAds}
          >
            {" "}
            Ver lugares de la semana{" "}
          </Button>
        </View>
      ),
    },
  ];
  const bottomSheetRef = useRef<BottomSheet>(null);
  // callbacks
  const HandleOpenPress = () => bottomSheetRef.current?.snapToIndex(3);
  const [CurrMap, setCurrMap] = useState("mapbox://styles/mapbox/streets-v11");
  const [Ruta, setRuta] = useState("Mapa de Ensenada");

  //Cosas del modal
  const [IsAdsVisible, setAdsVisible] = useState(true);

  const showAds = () => setAdsVisible(true);
  const hideAds = () => setAdsVisible(false);
  const containerStyle = {
    backgroundColor: "white",
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
        <Modal
          visible={IsAdsVisible}
          onDismiss={hideAds}
          contentContainerStyle={containerStyle}
        >
          <View className="flex-1 ">
            <View className="flex flex-row items-center justify-between">
              <Text> Revisa los lugares de la semana! </Text>
              <IconButton icon="close" size={30} onPress={hideAds} style={{}} />
            </View>
            <View>
              <Anuncio
                nombreEmpresa={"Empresa"}
                descripcion={"Descripcion de empresa"}
                distancia={"Distancia"}
              />
              <Anuncio
                nombreEmpresa={"Empresa"}
                descripcion={"Descripcion de empresa"}
                distancia={"Distancia"}
              />
            </View>
          </View>
        </Modal>
      </Portal>

      <View className="absolute top-20 z-2">
        <View
          className="flex-row
         w-full  justify-between"
        >
          <View className="">
            {/*<Flechitaregreso ruta={"/"} />*/}
            <ProfileButton ruta={"/(profile)"} />
            <Pullbottom HandleOpenPress={HandleOpenPress}></Pullbottom>
          </View>
          <View
            style={[
              { backgroundColor: "rgba(53,57,53, .9)" },
              { borderColor: "#FAF9F6" },
            ]}
            className="flex justify-center mt-2 items-center border-2 px-4 max-h-12 mr-4 border-whit rounded-lg"
          >
            <Text className="" style={{ color: "#FAF9F6" }}>
              {Ruta}
            </Text>
          </View>
        </View>
      </View>

      <BottomSheet
        style={{ marginRight: 8, marginLeft: 8 }}
        index={2}
        animateOnMount={true}
        snapPoints={["10%", "30%", "50%", "75%", "90%"]}
        enablePanDownToClose={true}
        ref={bottomSheetRef}
        backgroundStyle={{
          backgroundColor: "#FAF9F6",
        }}
      >
        <ImageBackground
          source={require("../../assets/images/fondologinregister.png")}
          style={styles.BottomSheetbackground}
          resizeMode="cover"
        >
          <BottomSheetView style={styles.bottomSheetContainer}>
            <FlatList
              data={Slides}
              contentContainerStyle={{}}
              horizontal
              pagingEnabled
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={true}
              renderItem={({ item }) => (
                <View style={styles.page}>{item.render()}</View>
              )}
            />
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
    flex: 1,
  },
  BottomSheetbackground: {
    flex: 1,
    marginTop: 0,
  },
  page: {
    width: width - 16,
  },
});

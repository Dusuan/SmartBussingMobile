import {
  Platform,
  View,
  PermissionsAndroid,
  ImageBackground,
  Dimensions,
  Image,
  Animated,
} from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import MapboxGL from "@rnmapbox/maps";
import  UserTrackingMode  from "@rnmapbox/maps";
import { StyleSheet } from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useState, useRef, useCallback } from "react";
import BusCard from "@/components/buscard";
import LocationPuck  from "@rnmapbox/maps";
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
  Button,
  IconButton,
} from "react-native-paper";
import * as React from "react";
import Anuncio from "@/components/anuncio";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import Text from "../../components/AppText";
import RouteView from "../(routeView)";
import * as Location from "expo-location";
import SearchBar, { GeocodingFeature } from "@/components/SearchBar";
import uberStyle from "@/assets/tilesets/map-style.json";
import { MapStyleState } from "@/components/mapview";
import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';
import { BannerAd, BannerAdSize, TestIds, useForeground } from 'react-native-google-mobile-ads';

MapboxGL.setAccessToken(Constants.expoConfig?.extra?.MAPBOX_DOWNLOAD_TOKEN);
MapboxGL.setTelemetryEnabled(false);

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-6372485658515796~9768969991';

export default function Dashboard() {
  const navigate = (ruta: String) => {
    router.navigate(`/${ruta}`);
  };
  const bannerRef = useRef<BannerAd>(null);

    useForeground(() => {
    Platform.OS === 'android' && bannerRef.current?.load();
  });

  const bottomSheetRef = useRef<BottomSheet>(null);
  const cameraRef = useRef<MapboxGL.Camera>(null);

  // callbacks
  const HandleOpenPress = () => bottomSheetRef.current?.snapToIndex(0);
  const [CurrMap, setCurrMap] = useState("mapbox://styles/mapbox/dark-v11");

  const [Ruta, setRuta] = useState("Mapa de Ensenada");
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [searchMarker, setSearchMarker] = useState<[number, number] | null>(null);

  //Cosas del slider de anuncios
  const [IsAdsVisible, setAdsVisible] = useState(true);
  const [IsAdsDismissed, setAdsDismissed] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current; // 0 = visible, 1 = hidden (slid down)

  const showAds = () => {
    if (!IsAdsDismissed) {
      setAdsVisible(true);
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 60,
        friction: 12,
      }).start();
    }
  };

  const hideAds = useCallback(() => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      setAdsVisible(false);
      setAdsDismissed(true); // No vuelve a salir
    });
  }, [slideAnim]);

  const sliderHeight = height; // Pantalla completa

  // Request location permissions and get current position
  React.useLayoutEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          const position = await Location.getCurrentPositionAsync({});
          setUserLocation([position.coords.longitude, position.coords.latitude]);
        }
      } catch (error) {
        console.error("Error requesting location permission:", error);
      }
    };
    requestLocationPermission();
    console.log("User location:", userLocation);
  }, []);

  const handleLocationSelect = (feature: GeocodingFeature) => {
    setSearchMarker(feature.center);
    cameraRef.current?.setCamera({
      centerCoordinate: feature.center,
      zoomLevel: 15,
      animationMode: "flyTo",
      animationDuration: 800,
    });
  };

  const Slides = React.useMemo(() => [
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
            onPress={() => console.log("Navegando") /*navigate("(routeView)") */}
          >
            {" "}
            Ejemplo de ruta
          </Button>
        </View>
      ),
    },
    {
      id: "3",
      render: () =>( <View className="p-4">
        <RouteView></RouteView>
      </View>)
    },
  ],[tilesets,setCurrMap,setRuta,showAds]);

  if(userLocation === null){
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-center">Cargando ...</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.root} className="flex-1 relative">
      <MapboxGL.MapView
        style={styles.map}
        styleURL={CurrMap}
        rotateEnabled={true}
      >
        <MapboxGL.Camera
          ref={cameraRef}
          defaultSettings={{
            zoomLevel: 14,
            centerCoordinate: userLocation ?? [-116.6076, 31.8658],
          }}
          zoomLevel={14}
          //  followUserLocation={true}
          //  followUserMode={UserTrackingMode.Follow}
          pitch={20}
          animationMode="flyTo"
          animationDuration={1000}
        />

        <MapboxGL.LocationPuck visible />

        {searchMarker && (
          <MapboxGL.PointAnnotation
            id="search-result"
            coordinate={searchMarker}
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: "#fff",
                borderWidth: 3,
                borderColor: "#508484",
              }}
            />
          </MapboxGL.PointAnnotation>
        )}
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

      {/*------------------------ Slider de Anuncios (Pantalla Completa) ------------------------*/}
      {IsAdsVisible && (
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#1a1a2e",
            zIndex: 50,
            elevation: 20,
            transform: [
              {
                translateY: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, sliderHeight + 50],
                }),
              },
            ],
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              paddingTop: 50,
              paddingBottom: 12,
              borderBottomWidth: 1,
              borderBottomColor: "rgba(255,255,255,0.1)",
            }}
          >
            <Text style={{ color: "#ffffff", fontSize: 20, fontWeight: "700" }}>
              📍 Lugares de la semana
            </Text>
            <IconButton
              icon="close"
              size={28}
              iconColor="#ffffff"
              onPress={hideAds}
              style={{ margin: 0 }}
            />
          </View>

          {/* Contenido con scroll vertical */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
            style={{ flex: 1 }}
          >
            <Anuncio
              nombreEmpresa={"Empresa"}
              descripcion={"Descripcion de empresa"}
              distancia={"Distancia"}
            />
            <Anuncio
              nombreEmpresa={"Empresa 2"}
              descripcion={"Otra descripcion"}
              distancia={"Distancia"}
            />
          </ScrollView>

          {/* Banner Ad fijo en la parte inferior */}
          <View style={{paddingBottom: 24 }}>
            <BannerAd ref={bannerRef} unitId={adUnitId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
          </View>
        </Animated.View>
      )}

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
        index={1}
        animateOnMount={true}
        snapPoints={["15%", "30%", "50%", "75%", "90%"]}
        enablePanDownToClose={false}
        ref={bottomSheetRef}
        backgroundStyle={{
          backgroundColor: "#808080",
        }}
      >
        <View style={{ marginTop: 12 , marginBottom: 12}}>
          <SearchBar
            userLocation={userLocation}
            onSelectLocation={handleLocationSelect}
            setSearchMarker={setSearchMarker}
          />
        </View>
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

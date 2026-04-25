import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform,
} from "react-native";
import MapboxGL from "@rnmapbox/maps";
import UserTrackingMode from "@rnmapbox/maps";
import { FlatList } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useState, useRef, useCallback } from "react";
import BusCard from "@/components/buscard";
import LocationPuck from "@rnmapbox/maps";
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
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Constants from "expo-constants";
import * as React from "react";
import Text from "../../components/AppText";
import * as Location from "expo-location";
import uberStyle from "@/assets/tilesets/map-style.json";
import { MapStyleState } from "@/components/mapview";
import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';
import { BannerAd, BannerAdSize, TestIds, useForeground } from 'react-native-google-mobile-ads';
import { GeocodingFeature } from "@/components/SearchBar";
import DashboardTopBar from "@/components/DashboardTopBar";
import DashboardBottomSheet from "@/components/DashboardBottomSheet";
import { MapRouteController, ModeToggleButton } from "@/components/map/MapRouteController";
import { useRouteFilter } from "@/hooks/useRouteFilter";
import { MapboxPoi } from "@/types/geodata";
import Anuncio from "@/components/anuncio";
import { router } from "expo-router";

MapboxGL.setAccessToken(Constants.expoConfig?.extra?.MAPBOX_DOWNLOAD_TOKEN);
MapboxGL.setTelemetryEnabled(false);

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-6372485658515796~9768969991';

// Ensenada city center — default camera target
const ENSENADA_CENTER: [number, number] = [-116.6060, 31.8600];

// ─── Main Dashboard ─────────────────────────────────────────────────────────────
export default function Dashboard() {
  const bannerRef = useRef<BannerAd>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const cameraRef = useRef<MapboxGL.Camera>(null);
  const mapRef = useRef<MapboxGL.MapView>(null);

  useForeground(() => {
    Platform.OS === 'android' && bannerRef.current?.load();
  });

  const HandleOpenPress = () => bottomSheetRef.current?.snapToIndex(0);
  const [CurrMap, setCurrMap] = useState("mapbox://styles/mapbox/streets-v12");
  const [Ruta, setRuta] = useState("Mapa de Ensenada");
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [searchMarker, setSearchMarker] = useState<[number, number] | null>(null);
  const [selectedMapPoi, setSelectedMapPoi] = useState<MapboxPoi | null>(null);

  // ─── Geo-Routes Module ─────────────────────────────────────────────────────
  const {
    activeRouteId,
    mode,
    setActiveRoute,
    clearRoute,
    toggleMode,
  } = useRouteFilter();

  const handleRouteSelect = useCallback((routeId: string) => {
    setActiveRoute(routeId);
    setRuta(`Ruta ${routeId}`);
    bottomSheetRef.current?.snapToIndex(2);
  }, [setActiveRoute]);

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
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          const position = await Location.getCurrentPositionAsync({});
          setUserLocation([position.coords.longitude, position.coords.latitude]);
        }
      } catch (error) {
        console.error("Error requesting location permission:", error);
      }
    })();
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

  const handleMapPress = async (e: any) => {
    if (!mapRef.current) return;
    const { properties, geometry } = e;
    
    // Clear previously selected POI
    setSelectedMapPoi(null);

    if (properties && properties.screenPointX !== undefined && properties.screenPointY !== undefined) {
      try {
        const TOUCH_RADIUS = 25;
        const bbox = [
          properties.screenPointY - TOUCH_RADIUS, // top
          properties.screenPointX - TOUCH_RADIUS, // left
          properties.screenPointY + TOUCH_RADIUS, // bottom
          properties.screenPointX + TOUCH_RADIUS  // right
        ] as [number, number, number, number];
        // Consultar un área rectangular (caja táctil) para que sea fácil atinarle a los iconos
        const features = await mapRef.current.queryRenderedFeaturesInRect(bbox);
        
        // Encontrar cualquier elemento tocado que tenga nombre, descartando calles y cuerpos de agua
        const poiFeature = features?.features?.find((f: any) => {
          if (!f.properties?.name) return false;
          const layerId = (f.layer?.id || '').toLowerCase();
          const sourceLayer = (f.sourceLayer || '').toLowerCase();
          
          return !layerId.includes('road') && !sourceLayer.includes('road') && !layerId.includes('water');
        });

        if (poiFeature) {
          setSelectedMapPoi({
            id: (poiFeature.id as string) || (poiFeature.properties?.name as string) || Math.random().toString(),
            name: (poiFeature.properties?.name as string) || 'Comercio',
            category: (poiFeature.properties?.type as string) || (poiFeature.properties?.maki as string) || 'Punto de interés',
            coordinates: geometry.coordinates as [number, number],
          });
        }
      } catch (error) {
        console.error("Error querying map features:", error);
      }
    }
  };

  if (userLocation === null) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-center">Cargando ...</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.root}>
      <MapboxGL.MapView ref={mapRef} style={styles.map} styleURL={CurrMap} rotateEnabled onPress={handleMapPress}>
        <MapboxGL.Camera
          ref={cameraRef}
          defaultSettings={{ zoomLevel: 13, centerCoordinate: userLocation ?? ENSENADA_CENTER }}
          zoomLevel={13}
          pitch={20}
          animationMode="flyTo"
          animationDuration={1000}
        />

        <MapboxGL.LocationPuck visible />

        {/* Search result marker */}
        {searchMarker && (
          <MapboxGL.PointAnnotation id="search-result" coordinate={searchMarker}>
            <View style={styles.searchPin} />
          </MapboxGL.PointAnnotation>
        )}
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
          <View style={{ paddingBottom: 24 }}>
            <BannerAd ref={bannerRef} unitId={adUnitId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
          </View>
        </Animated.View>
      )}

      {/* Mode toggle overlay — shown only when a route is active */}
      <ModeToggleButton
        mode={mode}
        onToggle={toggleMode}
        visible={activeRouteId !== null}
      />

      <DashboardTopBar ruta={Ruta} handleOpenPress={HandleOpenPress} />
      <DashboardBottomSheet
        bottomSheetRef={bottomSheetRef}
        userLocation={userLocation}
        handleLocationSelect={handleLocationSelect}
        setSearchMarker={setSearchMarker}
        setCurrMap={setCurrMap}
        setRuta={setRuta}
        showAds={showAds}
        handleRouteSelect={handleRouteSelect}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  map: { flex: 1 },

  // Search pin
  searchPin: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#508484',
  },
});

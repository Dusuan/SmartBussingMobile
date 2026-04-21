import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import MapboxGL from "@rnmapbox/maps";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";
import { useState, useRef, useCallback } from "react";
import Constants from "expo-constants";
import * as React from "react";
import Text from "../../components/AppText";
import * as Location from "expo-location";
import { GeocodingFeature } from "@/components/SearchBar";
import AdsModal from "@/components/AdsModal";
import DashboardTopBar from "@/components/DashboardTopBar";
import DashboardBottomSheet from "@/components/DashboardBottomSheet";
import { MapRouteController, ModeToggleButton } from "@/components/map/MapRouteController";
import { useRouteFilter } from "@/hooks/useRouteFilter";

MapboxGL.setAccessToken(Constants.expoConfig?.extra?.MAPBOX_DOWNLOAD_TOKEN);
MapboxGL.setTelemetryEnabled(false);

// Ensenada city center — default camera target
const ENSENADA_CENTER: [number, number] = [-116.6060, 31.8600];



// ─── Main Dashboard ─────────────────────────────────────────────────────────────
export default function Dashboard() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const cameraRef = useRef<MapboxGL.Camera>(null);

  const HandleOpenPress = () => bottomSheetRef.current?.snapToIndex(0);
  const [CurrMap, setCurrMap] = useState("mapbox://styles/mapbox/dark-v11");
  const [Ruta, setRuta] = useState("Mapa de Ensenada");
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [searchMarker, setSearchMarker] = useState<[number, number] | null>(null);

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

  const [IsAdsVisible, setAdsVisible] = useState(true);
  const showAds = () => setAdsVisible(true);
  const hideAds = () => setAdsVisible(false);

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

  if (userLocation === null) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-center">Cargando ...</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.root}>
      <MapboxGL.MapView style={styles.map} styleURL={CurrMap} rotateEnabled>
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

        {/* ── Geo-Routes Module: routes + stops layers ── */}
        <MapRouteController
          cameraRef={cameraRef}
          activeRouteId={activeRouteId}
          onRoutePress={handleRouteSelect}
        />
      </MapboxGL.MapView>

      {/* Mode toggle overlay — shown only when a route is active */}
      <ModeToggleButton
        mode={mode}
        onToggle={toggleMode}
        visible={activeRouteId !== null}
      />

      <AdsModal visible={IsAdsVisible} onDismiss={hideAds} />
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

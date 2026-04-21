import React from "react";
import { View, Dimensions, StyleSheet, ImageBackground, Text, ScrollView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import SearchBar, { GeocodingFeature } from "@/components/SearchBar";
import MapView from "@/components/mapview";
import RouteView from "@/app/(routeView)";
import { Button } from "react-native-paper";
import { useRoutesData } from "@/hooks/useRoutesData";

const width = Dimensions.get("window").width;

interface DashboardBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet | null>;
  userLocation: [number, number] | null;
  handleLocationSelect: (feature: GeocodingFeature) => void;
  setSearchMarker: React.Dispatch<React.SetStateAction<[number, number] | null>>;
  setCurrMap: (map: string) => void;
  setRuta: (ruta: string) => void;
  showAds: () => void;
  handleRouteSelect?: (routeId: string) => void;
}

export default function DashboardBottomSheet({
  bottomSheetRef,
  userLocation,
  handleLocationSelect,
  setSearchMarker,
  setCurrMap,
  setRuta,
  showAds,
  handleRouteSelect,
}: DashboardBottomSheetProps) {
  const { routeFeatures } = useRoutesData();

  const Slides = React.useMemo(
    () => [
      {
        id: "1",
        render: () => (
          <ScrollView style={{ padding: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginBottom: 12 }}>
              Rutas Disponibles
            </Text>
            {routeFeatures.map((route) => (
              <View 
                key={route.properties.route_id} 
                style={{ backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', elevation: 2, marginBottom: 12, borderWidth: 1, borderColor: '#eee' }}
              >
                <View style={{ padding: 16, borderLeftWidth: 6, borderLeftColor: route.properties.route_color }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1D3A2D', marginBottom: 4 }}>
                    Ruta {route.properties.route_short_name}
                  </Text>
                  <Text style={{ fontSize: 14, color: '#555', marginBottom: 12 }}>
                    {route.properties.route_long_name}
                  </Text>
                  <Button
                    mode="contained"
                    buttonColor="#3B7C5F"
                    onPress={() => {
                      if (handleRouteSelect) handleRouteSelect(route.properties.route_id);
                    }}
                  >
                    Ver en Mapa
                  </Button>
                </View>
              </View>
            ))}
          </ScrollView>
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
          </View>
        ),
      },
      {
        id: "3",
        render: () => (
          <View className="p-4">
            <RouteView />
          </View>
        ),
      },
    ],
    [routeFeatures, showAds, handleRouteSelect]
  );

  return (
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
      <View style={{ marginTop: 12, marginBottom: 12 }}>
        <SearchBar
          userLocation={userLocation}
          onSelectLocation={handleLocationSelect}
          setSearchMarker={setSearchMarker}
        />
      </View>
      <ImageBackground
        source={require("../assets/images/fondologinregister.png")}
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
  );
}

const styles = StyleSheet.create({
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

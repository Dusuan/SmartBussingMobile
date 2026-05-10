import React from "react";
import { router } from "expo-router";
import { View, Dimensions, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GeocodingFeature } from "@/components/SearchBar";
import MapView from "@/components/mapview";
import RouteView from "@/app/(routeView)";
import { Button } from "react-native-paper";
import { useRoutesData } from "@/hooks/useRoutesData";
import { AntDesign } from "@expo/vector-icons";

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
  activeRouteId?: string | null;
  clearRoute?: () => void;
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
  activeRouteId,
  clearRoute,
}: DashboardBottomSheetProps) {
  const { routeFeatures } = useRoutesData();

  const Slides = React.useMemo(
    () => [
      {
        id: "1",
        render: () => (
          <ScrollView style={{ paddingHorizontal: 20, paddingTop: 10 }}>
            <Text style={{ textAlign: "center", fontSize: 15, color: "#333333", marginBottom: 20, fontWeight: "500" }}>
              Ensenada, Baja California
            </Text>
            
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333333', marginBottom: 16 }}>
              Rutas Disponibles
            </Text>

            {routeFeatures.map((route) => (
              <View 
                key={route.properties.route_id} 
                style={styles.routeCardContainer}
              >
                <View style={[styles.routeCardInner, { borderLeftColor: route.properties.route_color }]}>
                  
                  {/* Top Row: Name & Heart */}
                  <View style={styles.cardHeader}>
                    <Text style={styles.routeShortName}>
                      Ruta {route.properties.route_short_name}
                    </Text>
                    {/* Just an example of a heart icon from the design */}
                    <AntDesign 
                      name={route.properties.route_short_name === "203" ? "heart" : "hearto"} 
                      size={18} 
                      color={route.properties.route_short_name === "203" ? "#E53935" : "#333333"} 
                    />
                  </View>
                  
                  {/* Middle Row: Long Name */}
                  <Text style={styles.routeLongName}>
                    {route.properties.route_long_name}
                  </Text>

                  {/* Buttons Row */}
                  <View style={styles.cardButtonsRow}>
                    <TouchableOpacity
                      style={[styles.actionButton, { backgroundColor: activeRouteId === route.properties.route_id ? '#555555' : route.properties.route_color }]}
                      onPress={() => {
                        if (activeRouteId === route.properties.route_id) {
                          if (clearRoute) clearRoute();
                        } else {
                          if (handleRouteSelect) handleRouteSelect(route.properties.route_id);
                        }
                      }}
                    >
                      <Text style={styles.actionButtonText}>
                        {activeRouteId === route.properties.route_id ? 'Activa' : 'Visualizar en el mapa'}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.actionButton, { backgroundColor: route.properties.route_color }]}
                    >
                      <Text style={styles.actionButtonText}>Iniciar</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Links Row */}
                  <View style={styles.cardLinksRow}>
                    <TouchableOpacity>
                      <Text style={styles.linkText}>Comentar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      onPress={() => {
                        router.push({
                          pathname: '/(reportRoute)',
                          params: { 
                            routeId: route.properties.route_id, 
                            routeName: route.properties.route_short_name 
                          }
                        });
                      }}
                    >
                      <Text style={styles.linkText}>Reportar ruta</Text>
                    </TouchableOpacity>
                  </View>

                </View>
              </View>
            ))}
            <View style={{ height: 40 }} />
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
              Ver lugares de la semana
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
    [routeFeatures, showAds, handleRouteSelect, activeRouteId, clearRoute]
  );

  return (
    <BottomSheet
      style={{ marginHorizontal: 0, zIndex: 100 }} // Remove margin to allow full width for the sheet
      index={1}
      animateOnMount={true}
      snapPoints={["15%", "30%", "50%", "75%", "90%"]}
      enablePanDownToClose={false}
      ref={bottomSheetRef}
      backgroundStyle={{
        backgroundColor: "#FFFFFF",
        borderRadius: 30,
      }}
      handleIndicatorStyle={{ backgroundColor: "#D3D3D3", width: 40, height: 5 }}
    >
      <BottomSheetView style={styles.bottomSheetContainer}>
        <FlatList
          data={Slides}
          horizontal
          pagingEnabled
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.page}>{item.render()}</View>
          )}
        />
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  bottomSheetContainer: {
    flex: 1,
  },
  page: {
    width: width, // Use full width instead of width - 16
  },
  routeCardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
    marginBottom: 16,
  },
  routeCardInner: {
    padding: 16,
    borderLeftWidth: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  routeShortName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  routeLongName: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 12,
  },
  cardButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  cardLinksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  linkText: {
    color: '#666666',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
});

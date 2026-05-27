/**
 * @file components/DashboardBottomSheet.tsx
 * @description Sliding bottom panel for the dashboard.
 * - mode "routes": shows available bus routes (default)
 * - mode "trip":   shows SummaryTravel when tripData is available
 * Mode is controlled by the parent via the `tripData` prop.
 * No horizontal sliding — the content swaps in place.
 */

import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { GeocodingFeature } from "@/components/SearchBar";
import { Button } from "react-native-paper";
import { useRoutesData } from "@/hooks/useRoutesData";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SharedValue } from "react-native-reanimated";
import { TripResponse } from "@/types/trips";
import SummaryTravel from "@/components/summaryTravel";

const width = Dimensions.get("window").width;

interface DashboardBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet | null>;
  userLocation: [number, number] | null;
  handleLocationSelect: (feature: GeocodingFeature) => void;
  setSearchMarker: React.Dispatch<React.SetStateAction<[number, number] | null>>;
  setCurrMap: (map: string) => void;
  showAds: () => void;
  handleRouteSelect?: (routeId: string) => void;
  activeRouteId?: string | null;
  clearRoute?: () => void;
  animatedPosition: SharedValue<number>;
  /** Trip data from useTrip — when present, the sheet switches to trip mode */
  tripData?: TripResponse | null;
}

type SheetMode = "routes" | "trip";

export default function DashboardBottomSheet({
  bottomSheetRef,
  userLocation,
  handleLocationSelect,
  setSearchMarker,
  setCurrMap,
  showAds,
  handleRouteSelect,
  activeRouteId,
  clearRoute,
  animatedPosition,
  tripData,
}: DashboardBottomSheetProps) {
  const { routeFeatures } = useRoutesData();
  const [mode, setMode] = useState<SheetMode>("routes");

  // Auto-switch to trip mode when tripData arrives; back to routes when cleared
  useEffect(() => {
    if (tripData) {
      setMode("trip");
      // Expand sheet enough to see the summary
      bottomSheetRef.current?.snapToIndex(3);
    } else {
      setMode("routes");
    }
  }, [tripData]);

  const handleBackToRoutes = () => setMode("routes");

  return (
    <BottomSheet
      style={{ marginHorizontal: 0, zIndex: 100 }}
      index={1}
      animatedPosition={animatedPosition}
      animateOnMount={true}
      snapPoints={["15%", "30%", "50%", "75%", "90%"]}
      enablePanDownToClose={false}
      ref={bottomSheetRef}
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
    >
      {/* ── TRIP MODE ─────────────────────────────────────── */}
      {mode === "trip" && tripData ? (
        <SummaryTravel trip={tripData} onBack={handleBackToRoutes} />
      ) : (
        /* ── ROUTES MODE ────────────────────────────────── */
        <BottomSheetScrollView contentContainerStyle={styles.routesContent}>
          <Text style={styles.cityLabel}>Ensenada, Baja California</Text>
          <Text style={styles.sectionTitle}>Rutas Disponibles</Text>

          {routeFeatures.map((route) => (
            <View
              key={route.properties.route_id}
              style={styles.routeCardContainer}
            >
              <View
                style={[
                  styles.routeCardInner,
                  { borderLeftColor: route.properties.route_color },
                ]}
              >
                {/* Top Row */}
                <View style={styles.cardHeader}>
                  <Text style={styles.routeShortName}>
                    Ruta {route.properties.route_short_name}
                  </Text>
                  <MaterialCommunityIcons
                    name={
                      route.properties.route_short_name === "203"
                        ? "heart"
                        : "heart-outline"
                    }
                    size={20}
                    color={
                      route.properties.route_short_name === "203"
                        ? "#E53935"
                        : "#333333"
                    }
                  />
                </View>

                {/* Long name */}
                <Text style={styles.routeLongName}>
                  {route.properties.route_long_name}
                </Text>

                {/* Action buttons */}
                <View style={styles.cardButtonsRow}>
                  <TouchableOpacity
                    style={[
                      styles.actionButton,
                      {
                        backgroundColor:
                          activeRouteId === route.properties.route_id
                            ? "#555555"
                            : route.properties.route_color,
                      },
                    ]}
                    onPress={() => {
                      if (activeRouteId === route.properties.route_id) {
                        if (clearRoute) clearRoute();
                      } else {
                        if (handleRouteSelect)
                          handleRouteSelect(route.properties.route_id);
                      }
                    }}
                  >
                    <Text style={styles.actionButtonText}>
                      {activeRouteId === route.properties.route_id
                        ? "Activa"
                        : "Visualizar en el mapa"}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.actionButton,
                      { backgroundColor: route.properties.route_color },
                    ]}
                  >
                    <Text style={styles.actionButtonText}>Iniciar</Text>
                  </TouchableOpacity>
                </View>

                {/* Links */}
                <View style={styles.cardLinksRow}>
                  <TouchableOpacity>
                    <Text style={styles.linkText}>Comentar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      router.push({
                        pathname: "/(reportRoute)",
                        params: {
                          routeId: route.properties.route_id,
                          routeName: route.properties.route_short_name,
                        },
                      });
                    }}
                  >
                    <Text style={styles.linkText}>Reportar ruta</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}

          {/* Ads button */}
          <Button
            style={styles.adsButton}
            mode="elevated"
            buttonColor="#5B9EA0"
            textColor="white"
            onPress={showAds}
          >
            Ver lugares de la semana
          </Button>

          <View style={{ height: 40 }} />
        </BottomSheetScrollView>
      )}
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
  },
  handleIndicator: {
    backgroundColor: "#5B9EA0",
    width: 40,
    height: 5,
  },
  routesContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  cityLabel: {
    textAlign: "center",
    fontSize: 15,
    color: "#333333",
    marginBottom: 12,
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 16,
  },
  routeCardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    overflow: "hidden",
    marginBottom: 16,
  },
  routeCardInner: {
    padding: 16,
    borderLeftWidth: 6,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  routeShortName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  routeLongName: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 12,
  },
  cardButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 13,
  },
  cardLinksRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  linkText: {
    color: "#5B9EA0",
    fontSize: 12,
    textDecorationLine: "underline",
  },
  adsButton: {
    marginBottom: 8,
  },
});

import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "@/components/AppText";
import Pullbottom from "@/components/pullbottom";

interface DashboardTopBarProps {
  ruta: string;
  handleOpenPress: () => void;
}

export default function DashboardTopBar({ ruta, handleOpenPress }: DashboardTopBarProps) {
  return (
    <View style={styles.container} pointerEvents="box-none">
      {/* Etiqueta de ruta a la derecha */}
      <View style={styles.routePill}>
        <Text style={styles.routeText}>
          📍 {ruta}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 115, // Moved down to make room for SearchBar
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 8,
  },
  routePill: {
    backgroundColor: "#5B9EA0",
    borderColor: "rgba(255, 255, 255, 0.6)",
    borderWidth: 1.5,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  routeText: {
    color: "#FAF9F6",
    fontSize: 13,
    letterSpacing: 0.3,
  },
});

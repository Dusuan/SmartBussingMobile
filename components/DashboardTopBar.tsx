import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "@/components/AppText";
import ProfileButton from "@/components/gotologin";
import Pullbottom from "@/components/pullbottom";

interface DashboardTopBarProps {
  ruta: string;
  handleOpenPress: () => void;
}

export default function DashboardTopBar({ ruta, handleOpenPress }: DashboardTopBarProps) {
  return (
    <View style={styles.container} pointerEvents="box-none">
      {/* Botones izquierda: usuario y casa en fila */}
      <View style={styles.leftGroup}>
        <ProfileButton ruta={"/(profile)"} />
        <Pullbottom HandleOpenPress={handleOpenPress} />
      </View>

      {/* Etiqueta de ruta a la derecha */}
      <View style={styles.routePill}>
        <Text style={styles.routeText} numberOfLines={1}>
          📍 {ruta}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 52,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  leftGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  routePill: {
    backgroundColor: "rgba(29, 58, 45, 0.92)",
    borderColor: "#A4FFD7",
    borderWidth: 1.5,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    maxWidth: 200,
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

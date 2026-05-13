/**
 * @file components/WalkTimeline.tsx
 * @description Renders a single trip segment step in the vertical timeline.
 * WALKING → dashed gray line, BUS → solid colored line.
 * Shows stop name (paradaDestino) or first instruction as the step label.
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TripSegment } from "@/types/trips";

interface WalkTimelineProps {
  segment: TripSegment;
  isLast?: boolean;
}

const WALK_COLOR = "#9E9E9E";
const BUS_FALLBACK_COLOR = "#B3261E";

function formatMinutes(seconds: number): string {
  const mins = Math.round(seconds / 60);
  return mins <= 1 ? "1 min" : `${mins} min`;
}

export default function WalkTimeline({ segment, isLast = false }: WalkTimelineProps) {
  const isBus = segment.tipo === "BUS";
  const lineColor = isBus ? (segment.routeColor ?? BUS_FALLBACK_COLOR) : WALK_COLOR;
  const iconName = isBus ? "bus" : "walk";

  // Label: prefer stop name, fallback to first instruction, fallback to descripcion
  const stopName =
    segment.directions.paradaDestino?.nombre_parada ??
    segment.directions.instructions?.[0] ??
    segment.descripcion;

  // Sub-label: duration
  const duration = formatMinutes(segment.directions.timeSeconds);

  return (
    <View style={styles.row}>
      {/* Left column: icon + vertical line */}
      <View style={styles.leftCol}>
        {/* Icon bubble */}
        <View style={[styles.iconBubble, { backgroundColor: lineColor }]}>
          <MaterialCommunityIcons name={iconName} size={16} color="#FFFFFF" />
        </View>

        {/* Vertical line — omit for last segment */}
        {!isLast && (
          <View
            style={[
              styles.verticalLine,
              {
                borderColor: lineColor,
                borderStyle: isBus ? "solid" : "dashed",
              },
            ]}
          />
        )}
      </View>

      {/* Right column: text info */}
      <View style={styles.textCol}>
        <Text style={styles.stepLabel} numberOfLines={2}>
          {stopName}
        </Text>
        <Text style={[styles.stepMeta, { color: lineColor }]}>
          {isBus ? "En autobús" : "Caminando"} · {duration}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    minHeight: 64,
  },
  leftCol: {
    width: 36,
    alignItems: "center",
  },
  iconBubble: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  verticalLine: {
    flex: 1,
    borderLeftWidth: 2.5,
    marginTop: 4,
    marginBottom: 0,
    minHeight: 32,
  },
  textCol: {
    flex: 1,
    paddingLeft: 12,
    paddingTop: 8,
    paddingBottom: 16,
  },
  stepLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A2E",
    marginBottom: 2,
  },
  stepMeta: {
    fontSize: 12,
    fontWeight: "500",
  },
});
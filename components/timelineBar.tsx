/**
 * @file components/TimelineBar.tsx
 * @description Horizontal proportional bar that visualizes trip segments.
 * Each segment's width is proportional to its duration (timeSeconds).
 * WALKING → gray, BUS → routeColor from backend (fallback #B3261E).
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TripSegment } from "@/types/trips";

interface TimelineBarProps {
  segments: TripSegment[];
}

const WALK_COLOR = "#9E9E9E";
const BUS_FALLBACK_COLOR = "#B3261E";

export default function TimelineBar({ segments }: TimelineBarProps) {
  if (!segments || segments.length === 0) return null;

  const totalSeconds = segments.reduce(
    (sum, seg) => sum + seg.directions.timeSeconds,
    0
  );

  return (
    <View style={styles.container}>
      {segments.map((seg, index) => {
        const flex =
          totalSeconds > 0 ? seg.directions.timeSeconds / totalSeconds : 1;
        const isBus = seg.tipo === "BUS";
        const bgColor = isBus
          ? (seg.routeColor ?? BUS_FALLBACK_COLOR)
          : WALK_COLOR;
        const iconName = isBus ? "bus" : "walk";
        const isFirst = index === 0;
        const isLast = index === segments.length - 1;

        return (
          <View
            key={index}
            style={[
              styles.segment,
              {
                flex,
                backgroundColor: bgColor,
                borderTopLeftRadius: isFirst ? 8 : 0,
                borderBottomLeftRadius: isFirst ? 8 : 0,
                borderTopRightRadius: isLast ? 8 : 0,
                borderBottomRightRadius: isLast ? 8 : 0,
              },
            ]}
          >
            <MaterialCommunityIcons
              name={iconName}
              size={16}
              color="#FFFFFF"
            />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: 32,
    borderRadius: 8,
    overflow: "hidden",
  },
  segment: {
    alignItems: "center",
    justifyContent: "center",
  },
});
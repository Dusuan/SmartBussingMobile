/**
 * @file components/SummaryTravel.tsx
 * @description Full trip summary card shown inside DashboardBottomSheet when
 * tripData is available. Displays: departure/arrival time, proportional
 * TimelineBar, step-by-step WalkTimeline, and a GO button.
 */

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TripResponse } from "@/types/trips";
import TimelineBar from "./timelineBar";
import WalkTimeline from "./walkTimeline";

interface SummaryTravelProps {
  trip: TripResponse;
  /** Called when user taps "Ver rutas" to go back to the routes list */
  onBack: () => void;
}

function formatDuration(totalSeconds: number): string {
  const mins = Math.round(totalSeconds / 60);
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
}

function calcArrivalTime(durationSeconds: number): string {
  const now = new Date();
  now.setSeconds(now.getSeconds() + durationSeconds);
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function calcDepartureTime(): string {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function SummaryTravel({ trip, onBack }: SummaryTravelProps) {
  const totalDuration = formatDuration(trip.duracionTotalSegundos);
  const departureTime = calcDepartureTime();
  const arrivalTime = calcArrivalTime(trip.duracionTotalSegundos);
  const totalDistanceKm = (trip.distanciaTotalMetros / 1000).toFixed(1);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Header row ─────────────────────────────────── */}
      <View style={styles.header}>
        <View>
          <Text style={styles.departureTime}>Salida a las {departureTime}</Text>
          <Text style={styles.arrivalMeta}>
            Llega ~{arrivalTime} · {totalDistanceKm} km
          </Text>
        </View>

        {/* Back button → routes list */}
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <MaterialCommunityIcons name="map-search" size={16} color="#5B9EA0" />
          <Text style={styles.backBtnText}>Ver rutas</Text>
        </TouchableOpacity>
      </View>

      {/* ── Duration pill ──────────────────────────────── */}
      <View style={styles.durationRow}>
        <MaterialCommunityIcons name="clock-outline" size={16} color="#5B9EA0" />
        <Text style={styles.durationText}>{totalDuration} de viaje</Text>
      </View>

      {/* ── Proportional timeline bar ──────────────────── */}
      <View style={styles.barWrapper}>
        <TimelineBar segments={trip.segmentos} />
      </View>

      {/* ── Step-by-step timeline ──────────────────────── */}
      <View style={styles.stepsWrapper}>
        {trip.segmentos.map((seg, index) => (
          <WalkTimeline
            key={index}
            segment={seg}
            isLast={index === trip.segmentos.length - 1}
          />
        ))}
      </View>

      {/* ── GO button ─────────────────────────────────── */}
      <TouchableOpacity style={styles.goButton} activeOpacity={0.85}>
        <MaterialCommunityIcons name="navigation" size={22} color="#FFFFFF" />
        <Text style={styles.goButtonText}>GO · Comenzar</Text>
      </TouchableOpacity>

      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  departureTime: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A2E",
  },
  arrivalMeta: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#5B9EA0",
  },
  backBtnText: {
    fontSize: 12,
    color: "#5B9EA0",
    fontWeight: "600",
  },
  durationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 10,
  },
  durationText: {
    fontSize: 14,
    color: "#5B9EA0",
    fontWeight: "600",
  },
  barWrapper: {
    marginBottom: 20,
  },
  stepsWrapper: {
    marginBottom: 16,
  },
  goButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#5B9EA0",
    borderRadius: 30,
    paddingVertical: 16,
    marginTop: 4,
    shadowColor: "#5B9EA0",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  goButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
});

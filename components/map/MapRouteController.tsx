/**
 * @file components/map/MapRouteController.tsx
 * @description Orchestrates the route visualization inside MapboxGL.MapView.
 *
 * Responsibilities:
 *  - Renders RouteLineLayer + RouteStopsLayer
 *  - Moves the camera when the active route changes (fitBounds to route)
 *  - Exposes a mode toggle button overlay (network ↔ focused)
 *
 * This component is designed to be placed INSIDE <MapboxGL.MapView>.
 */

import React, { useEffect, useRef, useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import { RouteLineLayer } from './RouteLineLayer';
import { RouteStopsLayer } from './RouteStopsLayer';
import { useRoutesData } from '@/hooks/useRoutesData';
import { useRouteFilter } from '@/hooks/useRouteFilter';
import { MapDisplayMode } from '@/types/geodata';
import AppText from '@/components/AppText';

// ─── Props ────────────────────────────────────────────────────────────────────

interface MapRouteControllerProps {
  /** Ref to the MapboxGL.Camera to allow programmatic camera movement */
  cameraRef: React.RefObject<MapboxGL.Camera | null>;

  /**
   * Controlled activeRouteId from outside (e.g. from BottomSheet route selection).
   * When provided, the controller syncs its internal state to this value.
   */
  activeRouteId?: string | null;

  /**
   * Called when the user taps a route line directly on the map.
   * Receives the route_id of the tapped route.
   */
  onRoutePress?: (routeId: string) => void;
}

// ─── Camera Padding ───────────────────────────────────────────────────────────

const CAMERA_PADDING = {
  paddingTop: 80,
  paddingBottom: 300,   // Account for the bottom sheet
  paddingLeft: 40,
  paddingRight: 40,
};

// ─── Mode Toggle Button ───────────────────────────────────────────────────────

interface ModeToggleProps {
  mode: MapDisplayMode;
  onToggle: () => void;
  visible: boolean;
}

function ModeToggleButton({ mode, onToggle, visible }: ModeToggleProps) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  if (!visible) return null;

  const isNetwork = mode === 'network';

  return (
    <Animated.View style={[styles.modeToggleContainer, { opacity }]}>
      <TouchableOpacity
        style={styles.modeToggleBtn}
        onPress={onToggle}
        activeOpacity={0.8}
      >
        <AppText style={styles.modeToggleText}>
          {isNetwork ? '🗺 Red completa' : '📍 Solo esta ruta'}
        </AppText>
        <View style={styles.modeToggleArrow}>
          <AppText style={styles.modeToggleArrowText}>⇄</AppText>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function MapRouteController({
  cameraRef,
  activeRouteId: externalActiveRouteId,
  onRoutePress,
}: MapRouteControllerProps) {
  const {
    routesGeoJSON,
    stopsGeoJSON,
    getRouteBounds,
    networkBounds,
  } = useRoutesData();

  const {
    activeRouteId,
    mode,
    setActiveRoute,
    clearRoute,
    toggleMode,
    activeRouteFilter,
    inactiveRoutesFilter,
    stopsFilter,
  } = useRouteFilter();

  // Sync external activeRouteId → internal state
  useEffect(() => {
    if (externalActiveRouteId === undefined) return;
    if (externalActiveRouteId === null) {
      clearRoute();
    } else if (externalActiveRouteId !== activeRouteId) {
      setActiveRoute(externalActiveRouteId);
    }
  }, [externalActiveRouteId]);

  // Move camera when active route changes
  useEffect(() => {
    if (!cameraRef.current) return;

    if (!activeRouteId) {
      // Zoom to full network
      if (networkBounds) {
        cameraRef.current.fitBounds(
          networkBounds[1],
          networkBounds[0],
          [CAMERA_PADDING.paddingTop, CAMERA_PADDING.paddingRight, CAMERA_PADDING.paddingBottom, CAMERA_PADDING.paddingLeft],
          800,
        );
      }
      return;
    }

    const bounds = getRouteBounds(activeRouteId);
    if (bounds) {
      cameraRef.current.fitBounds(
        bounds[1],
        bounds[0],
        [CAMERA_PADDING.paddingTop, CAMERA_PADDING.paddingRight, CAMERA_PADDING.paddingBottom, CAMERA_PADDING.paddingLeft],
        900,
      );
    }
  }, [activeRouteId]);

  const handleRoutePress = useCallback((routeId: string) => {
    setActiveRoute(routeId);
    onRoutePress?.(routeId);
  }, [setActiveRoute, onRoutePress]);

  return (
    <>
      {/* Map Layers — rendered inside MapboxGL.MapView */}
      <RouteLineLayer
        shape={routesGeoJSON}
        activeFilter={activeRouteFilter}
        inactiveFilter={inactiveRoutesFilter}
        onRoutePress={handleRoutePress}
      />
      <RouteStopsLayer
        shape={stopsGeoJSON}
        filter={stopsFilter}
      />

      {/* Mode Toggle Overlay — rendered OUTSIDE MapboxGL.MapView */}
      {/* NOTE: This must be placed as a sibling to MapboxGL.MapView in the parent, */}
      {/* not inside it. The parent (Dashboard) renders this separately. */}
    </>
  );
}

// ─── Mode Toggle exported separately for the parent to render as overlay ──────

export { ModeToggleButton };
export type { ModeToggleProps };

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  modeToggleContainer: {
    position: 'absolute',
    bottom: 200,
    alignSelf: 'center',
    zIndex: 50,
  },
  modeToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(29, 58, 45, 0.92)',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#A4FFD7',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modeToggleText: {
    color: '#A4FFD7',
    fontSize: 13,
    fontWeight: '600',
  },
  modeToggleArrow: {
    backgroundColor: 'rgba(164, 255, 215, 0.15)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modeToggleArrowText: {
    color: '#A4FFD7',
    fontSize: 14,
  },
});

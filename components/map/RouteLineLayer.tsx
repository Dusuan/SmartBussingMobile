/**
 * @file components/map/RouteLineLayer.tsx
 * @description Renders all bus route lines on the map using data-driven styling.
 *
 * Uses a SINGLE ShapeSource + TWO LineLayers:
 *  - "routes-inactive": Dimmed lines for routes NOT currently active (network overview)
 *  - "routes-active":   Full-color, wider line for the currently active route
 *
 * Both layers read `route_color` from GeoJSON properties directly,
 * so no hardcoded colors are needed here.
 */

import React, { useMemo } from 'react';
import MapboxGL from '@rnmapbox/maps';
import { SmartBussingGeoJSON } from '@/types/geodata';

// ─── Props ────────────────────────────────────────────────────────────────────

interface RouteLineLayerProps {
  /** The full routes FeatureCollection (only route features, no stops) */
  shape: SmartBussingGeoJSON;

  /**
   * Mapbox filter expression for the active route layer.
   * If null, the active layer is not rendered.
   */
  activeFilter: unknown[] | null;

  /**
   * Mapbox filter expression for inactive routes (shown dimmed in network mode).
   * If null, inactive routes are not shown (focused mode).
   */
  inactiveFilter: unknown[] | null;

  /** Called when the user taps on a route line */
  onRoutePress?: (routeId: string) => void;
}

// ─── Layer Styles ─────────────────────────────────────────────────────────────

const INACTIVE_LINE_STYLE: MapboxGL.LineLayerStyle = {
  lineColor: ['get', 'route_color'],   // Data-driven: reads from GeoJSON properties
  lineWidth: 3,
  lineOpacity: 0.28,
  lineJoin: 'round',
  lineCap: 'round',
};

const ACTIVE_LINE_STYLE: MapboxGL.LineLayerStyle = {
  lineColor: ['get', 'route_color'],   // Data-driven: same property, full color
  lineWidth: 6,
  lineOpacity: 1,
  lineJoin: 'round',
  lineCap: 'round',
  // Subtle glow effect using a wider, semi-transparent layer underneath
  // (the glow is achieved via routes-active-glow layer below)
};

const ACTIVE_GLOW_STYLE: MapboxGL.LineLayerStyle = {
  lineColor: ['get', 'route_color'],
  lineWidth: 12,
  lineOpacity: 0.18,
  lineJoin: 'round',
  lineCap: 'round',
  lineBlur: 4,
};

// ─── Component ────────────────────────────────────────────────────────────────

export const RouteLineLayer = React.memo(function RouteLineLayer({
  shape,
  activeFilter,
  inactiveFilter,
}: RouteLineLayerProps) {
  // Memoize the filter arrays to avoid unnecessary re-renders
  const memoActiveFilter = useMemo(() => activeFilter, [JSON.stringify(activeFilter)]);
  const memoInactiveFilter = useMemo(() => inactiveFilter, [JSON.stringify(inactiveFilter)]);

  const layers = [];

  if (memoInactiveFilter) {
    layers.push(
      <MapboxGL.LineLayer
        key="routes-inactive"
        id="routes-inactive"
        style={INACTIVE_LINE_STYLE}
        filter={memoInactiveFilter as any}
        layerIndex={10}
      />
    );
  }

  if (memoActiveFilter) {
    layers.push(
      <MapboxGL.LineLayer
        key="routes-active-glow"
        id="routes-active-glow"
        style={ACTIVE_GLOW_STYLE}
        filter={memoActiveFilter as any}
        layerIndex={11}
      />
    );
    layers.push(
      <MapboxGL.LineLayer
        key="routes-active"
        id="routes-active"
        style={ACTIVE_LINE_STYLE}
        filter={memoActiveFilter as any}
        layerIndex={12}
      />
    );
  }

  if (!memoActiveFilter && !memoInactiveFilter) {
    layers.push(
      <MapboxGL.LineLayer
        key="routes-all"
        id="routes-all"
        style={ACTIVE_LINE_STYLE}
        layerIndex={10}
      />
    );
  }

  return (
    <MapboxGL.ShapeSource
      id="smartbussing-routes-source"
      shape={shape as any}
      tolerance={0.375}      // Douglas-Peucker simplification — improves render performance
    >
      {layers}
    </MapboxGL.ShapeSource>
  );
});

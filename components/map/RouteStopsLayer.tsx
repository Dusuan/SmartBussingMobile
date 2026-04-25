/**
 * @file components/map/RouteStopsLayer.tsx
 * @description Renders bus stops as a native SymbolLayer on the map.
 *
 * Using SymbolLayer instead of PointAnnotation provides:
 *  - Native GPU rendering (no React bridge overhead)
 *  - Handles hundreds of stops efficiently
 *  - Collision detection (labels auto-hide when overlapping)
 *
 * NOTE: SymbolLayer requires the icon image to be registered in the Mapbox style.
 * This component uses a simple circle via CircleLayer as the stop marker,
 * which works without custom icon images.
 */

import React, { useMemo } from 'react';
import MapboxGL from '@rnmapbox/maps';
import { SmartBussingGeoJSON, StopFeature } from '@/types/geodata';

// ─── Props ────────────────────────────────────────────────────────────────────

interface RouteStopsLayerProps {
  /** FeatureCollection containing only stop Point features */
  shape: SmartBussingGeoJSON;

  /**
   * Mapbox filter expression for which stops to display.
   * If null, all stops are shown.
   */
  filter: unknown[] | null;

  /** Called when the user taps a stop circle */
  onStopPress?: (feature: StopFeature) => void;
}

// ─── Layer Styles ─────────────────────────────────────────────────────────────

/** Outer ring of the stop marker */
const STOP_CIRCLE_STYLE: MapboxGL.CircleLayerStyle = {
  circleRadius: 9,
  circleColor: '#1D3A2D',
  circleStrokeColor: '#A4FFD7',
  circleStrokeWidth: 2,
  circleOpacity: 1,
  circlePitchAlignment: 'map',
};

/** Inner dot of the stop marker */
const STOP_DOT_STYLE: MapboxGL.CircleLayerStyle = {
  circleRadius: 4,
  circleColor: '#A4FFD7',
  circleOpacity: 1,
  circlePitchAlignment: 'map',
};

/** Stop name label */
const STOP_LABEL_STYLE: MapboxGL.SymbolLayerStyle = {
  textField: ['get', 'stop_name'],
  textSize: 11,
  textColor: '#FFFFFF',
  textHaloColor: '#1D3A2D',
  textHaloWidth: 1.5,
  textOffset: [0, 1.8],
  textAnchor: 'top',
  textOptional: true,          // Label can be omitted if it overlaps with others
  textAllowOverlap: false,
  iconAllowOverlap: true,
};

// ─── Component ────────────────────────────────────────────────────────────────

export const RouteStopsLayer = React.memo(function RouteStopsLayer({
  shape,
  filter,
  onStopPress,
}: RouteStopsLayerProps) {
  const memoFilter = useMemo(() => filter, [JSON.stringify(filter)]);

  return (
    <MapboxGL.ShapeSource
      id="smartbussing-stops-source"
      shape={shape as any}
      onPress={(e: any) => {
        if (e.features && e.features.length > 0 && onStopPress) {
          onStopPress(e.features[0] as StopFeature);
        }
      }}
    >
      {/* Outer ring */}
      <MapboxGL.CircleLayer
        id="stops-circle-outer"
        style={STOP_CIRCLE_STYLE}
        filter={memoFilter as any ?? undefined}
        layerIndex={20}
      />

      {/* Inner dot */}
      <MapboxGL.CircleLayer
        id="stops-circle-inner"
        style={STOP_DOT_STYLE}
        filter={memoFilter as any ?? undefined}
        layerIndex={21}
      />

      {/* Name label — shown when zoom is high enough */}
      <MapboxGL.SymbolLayer
        id="stops-label"
        minZoomLevel={13}
        style={STOP_LABEL_STYLE}
        filter={memoFilter as any ?? undefined}
        layerIndex={22}
      />
    </MapboxGL.ShapeSource>
  );
});

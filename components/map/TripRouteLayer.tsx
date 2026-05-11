/**
 * @file components/map/TripRouteLayer.tsx
 * @description Renders the trip direction segments returned by the backend
 * as styled lines on the Mapbox map.
 *
 * Segment rendering rules:
 *  - WALKING → gray dashed line (linePattern via dasharray)
 *  - BUS     → teal solid line with a subtle glow
 *
 * Each segment is a separate ShapeSource so their styles are independent.
 * Placed INSIDE <MapboxGL.MapView>.
 */

import React, { useMemo } from 'react';
import MapboxGL from '@rnmapbox/maps';
import { TripResponse, TripSegment } from '@/types/trips';

// ─── Props ────────────────────────────────────────────────────────────────────

interface TripRouteLayerProps {
  /** The full trip response from the backend. Null hides all layers. */
  tripData: TripResponse | null;
}

// ─── Layer Style Constants ────────────────────────────────────────────────────

const WALKING_LINE_STYLE: MapboxGL.LineLayerStyle = {
  lineColor: '#6B7280',       // Neutral gray
  lineWidth: 3,
  lineOpacity: 0.85,
  lineJoin: 'round',
  lineCap: 'round',
  lineDasharray: [2, 2],      // Dashed → walking feel
};

const BUS_LINE_STYLE: MapboxGL.LineLayerStyle = {
  lineColor: '#3D9970',       // SmartBussing green — matches GetDirectionsButton
  lineWidth: 6,
  lineOpacity: 1,
  lineJoin: 'round',
  lineCap: 'round',
};

const BUS_GLOW_STYLE: MapboxGL.LineLayerStyle = {
  lineColor: '#3D9970',
  lineWidth: 14,
  lineOpacity: 0.18,
  lineJoin: 'round',
  lineCap: 'round',
  lineBlur: 5,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Converts a TripSegment into a minimal GeoJSON FeatureCollection for ShapeSource */
function segmentToGeoJSON(segment: TripSegment) {
  return {
    type: 'FeatureCollection' as const,
    features: [
      {
        type: 'Feature' as const,
        id: segment.tipo,
        geometry: segment.directions.geoJson,
        properties: { tipo: segment.tipo },
      },
    ],
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export const TripRouteLayer = React.memo(function TripRouteLayer({
  tripData,
}: TripRouteLayerProps) {
  // Memoize the GeoJSON shapes to avoid unnecessary Mapbox source updates
  const segmentShapes = useMemo(() => {
    if (!tripData) return [];
    return tripData.segmentos.map((seg, idx) => ({
      idx,
      tipo: seg.tipo,
      shape: segmentToGeoJSON(seg),
    }));
  }, [tripData]);

  if (!tripData || segmentShapes.length === 0) return null;

  return (
    <>
      {segmentShapes.map(({ idx, tipo, shape }) => {
        const sourceId = `trip-segment-source-${idx}`;
        const isWalking = tipo === 'WALKING';

        if (isWalking) {
          return (
            <MapboxGL.ShapeSource key={sourceId} id={sourceId} shape={shape as any}>
              <MapboxGL.LineLayer
                id={`trip-segment-walk-${idx}`}
                style={WALKING_LINE_STYLE}
                aboveLayerID="road-label"
              />
            </MapboxGL.ShapeSource>
          );
        }

        // BUS segment — glow layer underneath + solid line on top
        return (
          <MapboxGL.ShapeSource key={sourceId} id={sourceId} shape={shape as any}>
            <MapboxGL.LineLayer
              id={`trip-segment-bus-glow-${idx}`}
              style={BUS_GLOW_STYLE}
              aboveLayerID="road-label"
            />
            <MapboxGL.LineLayer
              id={`trip-segment-bus-${idx}`}
              style={BUS_LINE_STYLE}
              aboveLayerID={`trip-segment-bus-glow-${idx}`}
            />
          </MapboxGL.ShapeSource>
        );
      })}
    </>
  );
});

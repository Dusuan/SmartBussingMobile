/**
 * @file types/geodata.ts
 * @description TypeScript types for the SmartBussing GeoJSON schema.
 * Inspired by GTFS (General Transit Feed Specification) and RFC 7946 GeoJSON.
 */

// ─── Core GeoJSON primitives ─────────────────────────────────────────────────

export type Coordinates = [number, number]; // [lng, lat]
export type LineCoordinates = Coordinates[];

// ─── Feature Properties ───────────────────────────────────────────────────────

/** Properties for a bus route (LineString feature) */
export interface RouteProperties {
  feature_type: 'route';
  route_id: string;
  route_short_name: string;
  route_long_name: string;
  route_color: string;       // Hex string, e.g. "#34D399"
  route_text_color: string;  // Hex string for labels on the route color
  route_type: 'microbus' | 'bus' | 'express' | 'autobus';
}

/** Properties for a bus stop (Point feature) */
export interface StopProperties {
  feature_type: 'stop';
  stop_id: string;
  stop_name: string;
  stop_description?: string;
  routes: string[];          // Array of route_ids that serve this stop
}

export type SmartBussingProperties = RouteProperties | StopProperties;

// ─── GeoJSON Features ─────────────────────────────────────────────────────────

export interface RouteFeature {
  type: 'Feature';
  id: string;
  geometry: {
    type: 'LineString';
    coordinates: LineCoordinates;
  };
  properties: RouteProperties;
}

export interface StopFeature {
  type: 'Feature';
  id: string;
  geometry: {
    type: 'Point';
    coordinates: Coordinates;
  };
  properties: StopProperties;
}

export type SmartBussingFeature = RouteFeature | StopFeature;

// ─── Top-level FeatureCollection ──────────────────────────────────────────────

export interface SmartBussingGeoJSON {
  type: 'FeatureCollection';
  features: SmartBussingFeature[];
}

// ─── Derived / Convenience Types ─────────────────────────────────────────────

export type MapDisplayMode = 'network' | 'focused';

export interface RouteFilterState {
  mode: MapDisplayMode;
  activeRouteId: string | null;
}

// Type guards
export const isRouteFeature = (f: SmartBussingFeature): f is RouteFeature =>
  f.properties.feature_type === 'route';

export const isStopFeature = (f: SmartBussingFeature): f is StopFeature =>
  f.properties.feature_type === 'stop';

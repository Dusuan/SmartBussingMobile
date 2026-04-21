/**
 * @file hooks/useRoutesData.ts
 * @description Loads and normalizes SmartBussing route geodata.
 *
 * Strategy:
 *  1. Always serves the local GeoJSON immediately (works offline).
 *  2. Optionally fetches from a remote API URL and merges the result,
 *     updating the cache for subsequent loads.
 *
 * To enable remote sync: set DATA_SOURCE_URL to your API endpoint.
 */

import { useMemo } from 'react';
import {
  SmartBussingGeoJSON,
  RouteFeature,
  StopFeature,
  isRouteFeature,
  isStopFeature,
} from '@/types/geodata';

// ─── Configuration ────────────────────────────────────────────────────────────

/**
 * Set this to a remote URL when the backend API is ready.
 * Leave as null to use only the local GeoJSON file.
 *
 * Example: 'https://api.smartbussing.com/v1/geodata/routes'
 */
const DATA_SOURCE_URL: string | null = null;

// ─── Local data source ────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-var-requires
const LOCAL_GEODATA: SmartBussingGeoJSON = require('../assets/geodata/routes.json');

// ─── Hook ─────────────────────────────────────────────────────────────────────

export interface RoutesDataResult {
  /** The full FeatureCollection (routes + stops combined) */
  allFeatures: SmartBussingGeoJSON;

  /** Only route LineString features — useful for RouteLineLayer */
  routeFeatures: RouteFeature[];

  /** Separate FeatureCollection containing only route lines */
  routesGeoJSON: SmartBussingGeoJSON;

  /** Only stop Point features — useful for RouteStopsLayer */
  stopFeatures: StopFeature[];

  /** Separate FeatureCollection containing only stops */
  stopsGeoJSON: SmartBussingGeoJSON;

  /** Get a single route Feature by its route_id */
  getRouteById: (routeId: string) => RouteFeature | undefined;

  /** Get all stops that serve a given route_id */
  getStopsForRoute: (routeId: string) => StopFeature[];

  /** Bounding box [[minLng, minLat], [maxLng, maxLat]] of all routes combined */
  networkBounds: [[number, number], [number, number]] | null;

  /** Bounding box for a specific route */
  getRouteBounds: (routeId: string) => [[number, number], [number, number]] | null;
}

export function useRoutesData(): RoutesDataResult {
  // NOTE: DATA_SOURCE_URL is reserved for future API integration.
  // When ready, implement a useEffect that fetches, validates, and merges
  // the remote data into a local state variable, falling back to LOCAL_GEODATA.
  const data = LOCAL_GEODATA;

  return useMemo<RoutesDataResult>(() => {
    const allFeatures = data;

    const routeFeatures = data.features.filter(isRouteFeature);
    const stopFeatures = data.features.filter(isStopFeature);

    const routesGeoJSON: SmartBussingGeoJSON = {
      type: 'FeatureCollection',
      features: routeFeatures,
    };

    const stopsGeoJSON: SmartBussingGeoJSON = {
      type: 'FeatureCollection',
      features: stopFeatures,
    };

    const getRouteById = (routeId: string) =>
      routeFeatures.find((f) => f.properties.route_id === routeId);

    const getStopsForRoute = (routeId: string) =>
      stopFeatures.filter((f) => f.properties.routes.includes(routeId));

    /** Compute bounding box from a list of route features */
    const computeBounds = (
      routes: RouteFeature[]
    ): [[number, number], [number, number]] | null => {
      const coords = routes.flatMap((f) => f.geometry.coordinates);
      if (coords.length === 0) return null;
      const lngs = coords.map(([lng]) => lng);
      const lats = coords.map(([, lat]) => lat);
      return [
        [Math.min(...lngs), Math.min(...lats)],
        [Math.max(...lngs), Math.max(...lats)],
      ];
    };

    const networkBounds = computeBounds(routeFeatures);

    const getRouteBounds = (routeId: string) => {
      const route = getRouteById(routeId);
      return route ? computeBounds([route]) : null;
    };

    return {
      allFeatures,
      routeFeatures,
      routesGeoJSON,
      stopFeatures,
      stopsGeoJSON,
      getRouteById,
      getStopsForRoute,
      networkBounds,
      getRouteBounds,
    };
  }, [data]);
}

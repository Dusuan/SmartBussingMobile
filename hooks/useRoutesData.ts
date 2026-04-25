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

import { useMemo, useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import {
  SmartBussingGeoJSON,
  RouteFeature,
  StopFeature,
  isRouteFeature,
  isStopFeature,
} from '@/types/geodata';

// ─── Configuration ────────────────────────────────────────────────────────────

/**
 * Remote API endpoint for the route geodata.
 * Falls back to local JSON if this fails or is offline.
 */
const DATA_SOURCE_URL: string | null = 'https://smart-bussing-back.onrender.com/api/v1/geodata/routes';

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

  /** Indicates if data is currently being fetched from the remote API */
  isSyncing: boolean;

  /** Contains error information if the sync fails */
  syncError: string | null;

  /** Manual trigger to re-fetch data from the remote server */
  syncRoutes: () => Promise<void>;
}

export function useRoutesData(): RoutesDataResult {
  const [data, setData] = useState<SmartBussingGeoJSON>(LOCAL_GEODATA);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncError, setSyncError] = useState<string | null>(null);

  const syncRoutes = useCallback(async () => {
    if (!DATA_SOURCE_URL) return;

    setIsSyncing(true);
    setSyncError(null);

    try {
      const response = await fetch(DATA_SOURCE_URL, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const remoteData = await response.json();

      if (
        remoteData &&
        remoteData.type === 'FeatureCollection' &&
        Array.isArray(remoteData.features)
      ) {
        setData(remoteData as SmartBussingGeoJSON);
      } else {
        throw new Error('Formato de datos no válido. Se esperaba FeatureCollection.');
      }
    } catch (error) {
      console.error('Error sincronizando rutas:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido de red';
      setSyncError(errorMessage);
      Alert.alert(
        'Error de sincronización',
        'No se pudo actualizar la información de rutas y paradas. Mostrando datos locales.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsSyncing(false);
    }
  }, []);

  // Fetch from the API once when the component mounts
  useEffect(() => {
    syncRoutes();
  }, [syncRoutes]);

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
      isSyncing,
      syncError,
      syncRoutes,
    };
  }, [data, isSyncing, syncError, syncRoutes]);
}

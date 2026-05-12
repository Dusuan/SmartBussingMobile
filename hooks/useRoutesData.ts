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
import {
  cacheRoutes,
  getCachedRoutes,
  getLastSyncTime,
  isCacheFresh,
} from '@/services/routesCache';


// ─── Configuration ────────────────────────────────────────────────────────────

/**
 * Remote API endpoint — apunta al endpoint real del backend.
 * Falls back to local JSON if this fails or is offline.
 */
const DATA_SOURCE_URL: string | null = 'https://smart-bussing-back.onrender.com/api/v1/ruta';

// ─── Local data source ────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-var-requires
const LOCAL_GEODATA: SmartBussingGeoJSON = require('../assets/geodata/routes.json');

// ─── Backend response types ──────────────────────────────────────────────────

/** Coordenada individual tal como la devuelve el backend */
interface BackendCoordenada {
  id_coordenada: number;
  longitud: number;
  latitud: number;
}

/** Parada tal como la devuelve el backend (si existe en la ruta) */
interface BackendParada {
  id_parada: number;
  nombre_parada: string;
  descripcion_parada?: string;
  coordenadas_parada: {
    id_coordenada: number;
    longitud: number;
    latitud: number;
  };
}

/** Ruta tal como la devuelve el backend */
interface BackendRuta {
  id_ruta: number;
  nombre_ruta: string;
  nombre_corto_ruta: string;
  color_ruta: string;
  color_texto_ruta: string;
  tipo_ruta: string;
  horario_ruta: string | null;
  active: boolean;
  coordenadas: BackendCoordenada[];
  paradas?: BackendParada[];
}

/** Respuesta envuelta del backend */
interface BackendResponse {
  info: string;
  response: BackendRuta[];
  error?: string | null;
}

// ─── Transformer ─────────────────────────────────────────────────────────────

/**
 * Convierte la respuesta del backend (array de rutas con coordenadas planas)
 * al formato GeoJSON FeatureCollection que espera el resto de la app.
 */
function transformBackendToGeoJSON(rutas: BackendRuta[]): SmartBussingGeoJSON {
  const features: SmartBussingGeoJSON['features'] = [];

  // Set para rastrear paradas ya agregadas (evitar duplicados)
  const addedStops = new Set<string>();

  for (const ruta of rutas) {
    // Solo incluir rutas activas
    if (!ruta.active) continue;

    const routeId = ruta.id_ruta.toString();

    // 1. Crear el Feature de la ruta (LineString)
    const coordinates = ruta.coordenadas.map((c) => [c.longitud, c.latitud] as [number, number]);

    if (coordinates.length > 0) {
      features.push({
        type: 'Feature',
        id: `route-${routeId}`,
        geometry: {
          type: 'LineString',
          coordinates,
        },
        properties: {
          feature_type: 'route',
          route_id: routeId,
          route_short_name: ruta.nombre_corto_ruta || routeId,
          route_long_name: ruta.nombre_ruta,
          route_color: ruta.color_ruta || '#34D399',
          route_text_color: ruta.color_texto_ruta || '#065F46',
          route_type: (ruta.tipo_ruta as RouteFeature['properties']['route_type']) || 'microbus',
        },
      });
    }

    // 2. Crear Features de paradas (Points) si existen
    if (ruta.paradas && Array.isArray(ruta.paradas)) {
      for (const parada of ruta.paradas) {
        const stopKey = `${parada.id_parada}`;

        if (addedStops.has(stopKey)) {
          // La parada ya existe — agregar esta ruta a sus rutas
          const existing = features.find(
            (f) => f.properties.feature_type === 'stop' && (f.properties as any).stop_id === stopKey
          );
          if (existing && existing.properties.feature_type === 'stop') {
            (existing.properties as any).routes.push(routeId);
          }
        } else {
          features.push({
            type: 'Feature',
            id: `stop-${stopKey}`,
            geometry: {
              type: 'Point',
              coordinates: [parada.coordenadas_parada.longitud, parada.coordenadas_parada.latitud],
            },
            properties: {
              feature_type: 'stop',
              stop_id: stopKey,
              stop_name: parada.nombre_parada,
              stop_description: parada.descripcion_parada,
              routes: [routeId],
            },
          });
          addedStops.add(stopKey);
        }
      }
    }
  }

  return {
    type: 'FeatureCollection',
    features,
  };
}

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

      const backendData: BackendResponse = await response.json();

      if (
        backendData &&
        Array.isArray(backendData.response) &&
        backendData.response.length > 0
      ) {
        // Transformar del formato del backend a GeoJSON
        const geoJSON = transformBackendToGeoJSON(backendData.response);
        setData(geoJSON);
        await cacheRoutes(geoJSON);
        console.log(`Rutas sincronizadas: ${geoJSON.features.length} features desde el backend`);
      } else {
        throw new Error('No se recibieron rutas del servidor.');
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
      const loadRoutes = async () => {
        // 1. Intentar cargar desde caché
        const cached = await getCachedRoutes();
        if (cached) {
          setData(cached);
          console.log('Rutas cargadas desde caché local');
          // 2. Verificar si el caché todavía es fresco (< 24 horas)
          const lastSync = await getLastSyncTime();
          if(!isCacheFresh(lastSync)){
          console.log('Sincronizando rutas desde el servidor...');
          syncRoutes();
          console.log("Rutas sincronizadas")
          }
          return; 
        }
       
      };
      loadRoutes();
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

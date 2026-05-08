/**
 * @file services/routesCache.ts
 * @description Módulo para guardar y leer rutas desde AsyncStorage (caché local).
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { SmartBussingGeoJSON } from '@/types/geodata';

// ─── Claves de AsyncStorage ──────────────────────────────────────────────────
// Piensa en estas como los "nombres" bajo los que guardamos la info.
const CACHE_KEY = '@smartbussing/routes_geodata';
const CACHE_TIMESTAMP_KEY = '@smartbussing/routes_timestamp';

// ─── Funciones ───────────────────────────────────────────────────────────────

/**
 * Guarda las rutas en caché junto con el timestamp actual.
 * Se llama después de un fetch exitoso al backend.
 */
export async function cacheRoutes(data: SmartBussingGeoJSON): Promise<void> {
  try {
    // AsyncStorage solo guarda strings, así que convertimos el JSON a string
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));
    // Guardamos CUÁNDO se guardó, para saber si ya está "viejo"
    await AsyncStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
  } catch (error) {
    console.error('Error guardando rutas en caché:', error);
  }
}

/**
 * Lee las rutas guardadas en caché.
 * Retorna null si no hay nada guardado.
 */
export async function getCachedRoutes(): Promise<SmartBussingGeoJSON | null> {
  try {
    const cached = await AsyncStorage.getItem(CACHE_KEY);
    if (cached) {
      // Convertimos el string de vuelta a objeto JSON
      return JSON.parse(cached) as SmartBussingGeoJSON;
    }
    return null;
  } catch (error) {
    console.error('Error leyendo caché de rutas:', error);
    return null;
  }
}

/**
 * Obtiene el timestamp de la última vez que se guardaron rutas.
 * Retorna null si nunca se ha guardado.
 */
export async function getLastSyncTime(): Promise<number | null> {
  try {
    const timestamp = await AsyncStorage.getItem(CACHE_TIMESTAMP_KEY);
    return timestamp ? parseInt(timestamp, 10) : null;
  } catch (error) {
    console.error('Error leyendo timestamp de caché:', error);
    return null;
  }
}

/**
 * Verifica si el caché es "fresco" (no ha pasado mucho tiempo).
 * @param timestamp - Cuándo se guardó el caché (en milisegundos)
 * @param maxAgeHours - Máximo de horas antes de considerar el caché "viejo" (default: 24)
 */
export function isCacheFresh(timestamp: number, maxAgeHours: number = 24): boolean {
  const maxAgeMs = maxAgeHours * 60 * 60 * 1000; // Convertir horas a milisegundos
  return (Date.now() - timestamp) < maxAgeMs;
}

/**
 * Borra todo el caché de rutas. Útil para debugging o "forzar refresh".
 */
export async function clearRoutesCache(): Promise<void> {
  try {
    await AsyncStorage.multiRemove([CACHE_KEY, CACHE_TIMESTAMP_KEY]);
  } catch (error) {
    console.error('Error limpiando caché de rutas:', error);
  }
}

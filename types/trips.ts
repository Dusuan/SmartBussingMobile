/**
 * @file types/trips.ts
 * @description TypeScript types for the SmartBussing trip directions API.
 * Models the response from GET /viaje/draft/get-travel
 */

// ─── Stop / Parada ────────────────────────────────────────────────────────────

export interface ParadaCoords {
  id_coordenada: number;
  longitud: number;
  latitud: number;
}

export interface Parada {
  id_parada: number;
  nombre_parada: string;
  descripcion_parada: string;
  coordenadas_parada: ParadaCoords;
}

// ─── Segment ──────────────────────────────────────────────────────────────────

export type SegmentType = 'WALKING' | 'BUS';

export interface SegmentGeoJson {
  type: 'LineString';
  coordinates: [number, number][]; // [lng, lat][]
}

export interface SegmentDirections {
  paradaDestino: Parada | null;
  distanceMeters: number;
  timeSeconds: number;
  geoJson: SegmentGeoJson;
  instructions: string[] | null;
}

export interface TripSegment {
  tipo: SegmentType;
  descripcion: string;
  /** Hex color of the bus route (e.g. "#B3261E"). Only present for BUS segments. */
  routeColor?: string;
  directions: SegmentDirections;
}

// ─── Trip Response ────────────────────────────────────────────────────────────

export interface TripResponse {
  segmentos: TripSegment[];
  distanciaTotalMetros: number;
  duracionTotalSegundos: number;
}

export interface TripApiResponse {
  info: string;
  response: TripResponse;
  error: string | null;
}

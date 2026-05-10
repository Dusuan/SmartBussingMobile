/**
 * @file hooks/useTrip.ts
 * @description Custom hook for managing the trip/directions request lifecycle.
 * Handles loading, error, and trip data state.
 */

import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { fetchTrip } from '@/services/tripsApi';
import { TripResponse } from '@/types/trips';

interface UseTripReturn {
  isLoading: boolean;
  tripData: TripResponse | null;
  error: string | null;
  requestTrip: (origin: [number, number], destination: [number, number]) => Promise<void>;
  clearTrip: () => void;
}

export function useTrip(): UseTripReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [tripData, setTripData] = useState<TripResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const requestTrip = useCallback(
    async (origin: [number, number], destination: [number, number]) => {
      setIsLoading(true);
      setError(null);

      console.log('[useTrip] ▶ requestTrip llamado');
      console.log('[useTrip]   origin (lng, lat)     :', origin);
      console.log('[useTrip]   destination (lng, lat) :', destination);

      try {
        const result = await fetchTrip(origin, destination);
        console.log('[useTrip] ✅ Response raw:', JSON.stringify(result, null, 2));

        if (result.error) {
          throw new Error(result.error);
        }

        console.log('[useTrip]   Segmentos recibidos:', result.response.segmentos.length);
        result.response.segmentos.forEach((s, i) =>
          console.log(`[useTrip]   [${i}] ${s.tipo} — ${s.descripcion}`)
        );

        setTripData(result.response);
      } catch (err: any) {
        const msg: string = err?.message ?? 'Error desconocido';
        console.error('[useTrip] ❌ Error:', msg);
        setError(msg);
        Alert.alert(
          'Sin conexión con el servidor',
          'No se pudieron obtener las direcciones. Intenta de nuevo más tarde.'
        );
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const clearTrip = useCallback(() => {
    setTripData(null);
    setError(null);
  }, []);

  return { isLoading, tripData, error, requestTrip, clearTrip };
}

/**
 * @file services/tripsApi.ts
 * @description HTTP client for the SmartBussing trip directions endpoint.
 * Follows api_communication SKILL: fetch nativo, try/catch, coords in query params (GET).
 */

import { TripApiResponse } from '@/types/trips';
import Constants from 'expo-constants';

const API_BASE: string =
  Constants.expoConfig?.extra?.BACKEND_URL

console.log('[tripsApi] API_BASE =', API_BASE);

/**
 * Fetches the optimized trip from the backend.
 * @param origin      - [longitude, latitude] of the user's current position
 * @param destination - [longitude, latitude] of the selected destination
 */
export const fetchTrip = async (
  origin: [number, number],
  destination: [number, number]
): Promise<TripApiResponse> => {
  const [userLon, userLat] = origin;
  const [destLon, destLat] = destination;

  const url =
    `${API_BASE}/viaje/draft/get-travel` +
    `?userLat=${userLat}&userLon=${userLon}` +
    `&destLat=${destLat}&destLon=${destLon}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json() as Promise<TripApiResponse>;
};

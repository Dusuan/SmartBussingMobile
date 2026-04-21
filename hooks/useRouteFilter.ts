/**
 * @file hooks/useRouteFilter.ts
 * @description Controls which route is active on the map and the display mode.
 *
 * Display Modes:
 *  - 'network': All routes visible. Active route (if set) is highlighted.
 *               Inactive routes are shown at reduced opacity (network overview).
 *  - 'focused': Only the active route is visible. All others are hidden.
 *
 * Usage:
 *  const { activeRouteId, mode, setActiveRoute, clearRoute, setMode } = useRouteFilter();
 */

import { useState, useCallback, useMemo } from 'react';
import { MapDisplayMode } from '@/types/geodata';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RouteFilterResult {
  /** The currently selected route ID, or null if none selected */
  activeRouteId: string | null;

  /** Current display mode: 'network' (all visible) or 'focused' (only active) */
  mode: MapDisplayMode;

  /**
   * Select a route by ID.
   * Automatically switches to 'network' mode so the user can see context.
   * Use setMode('focused') after if you want to isolate the route.
   */
  setActiveRoute: (routeId: string) => void;

  /** Clear the active route selection, return to full network view */
  clearRoute: () => void;

  /** Manually set display mode */
  setMode: (mode: MapDisplayMode) => void;

  /**
   * Toggle between 'network' and 'focused' mode.
   * Only meaningful when an activeRouteId is set.
   */
  toggleMode: () => void;

  // ─── Pre-built Mapbox filter expressions ──────────────────────────────

  /**
   * Filter expression for the "active route" LineLayer.
   * Matches only the currently active route feature.
   * Returns null (show nothing) when no route is selected in focused mode.
   */
  activeRouteFilter: unknown[] | null;

  /**
   * Filter expression for the "inactive routes" LineLayer.
   * In 'network' mode: all routes except the active one.
   * In 'focused' mode: empty (nothing shown).
   */
  inactiveRoutesFilter: unknown[] | null;

  /**
   * Filter expression for the stops SymbolLayer.
   * In 'network' mode + no active route: all stops.
   * In 'network' mode + active route: stops serving the active route.
   * In 'focused' mode: same as above but only for the active route.
   */
  stopsFilter: unknown[] | null;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useRouteFilter(): RouteFilterResult {
  const [activeRouteId, setActiveRouteId] = useState<string | null>(null);
  const [mode, setModeState] = useState<MapDisplayMode>('network');

  const setActiveRoute = useCallback((routeId: string) => {
    setActiveRouteId(routeId);
    // Default to network mode so user sees the full context on first select
    setModeState('network');
  }, []);

  const clearRoute = useCallback(() => {
    setActiveRouteId(null);
    setModeState('network');
  }, []);

  const setMode = useCallback((newMode: MapDisplayMode) => {
    setModeState(newMode);
  }, []);

  const toggleMode = useCallback(() => {
    setModeState((prev) => (prev === 'network' ? 'focused' : 'network'));
  }, []);

  // ─── Derive Mapbox filter expressions ───────────────────────────────────

  const { activeRouteFilter, inactiveRoutesFilter, stopsFilter } = useMemo(() => {
    // Filter: only features with feature_type === 'route'
    const isRoute = ['==', ['get', 'feature_type'], 'route'];
    // Filter: only features with feature_type === 'stop'
    const isStop = ['==', ['get', 'feature_type'], 'stop'];

    if (!activeRouteId) {
      // No selection: show all routes as "inactive" (in network overview mode)
      return {
        activeRouteFilter: null,
        inactiveRoutesFilter: ['all', isRoute] as unknown[],
        stopsFilter: ['all', isStop] as unknown[],
      };
    }

    // Expression: feature's route_id matches the active route
    const isActiveRoute = ['==', ['get', 'route_id'], activeRouteId];

    // Expression: stop's routes array contains the active route_id
    // Uses 'in' operator: ['in', activeRouteId, ['get', 'routes']]
    // NOTE: For SymbolLayer with array properties, use a different approach below
    const stopServesActiveRoute = ['in', activeRouteId, ['get', 'routes']];

    if (mode === 'focused') {
      return {
        // Active: only the selected route line
        activeRouteFilter: ['all', isRoute, isActiveRoute] as unknown[],
        // Inactive: nothing (focused mode hides all others)
        inactiveRoutesFilter: null,
        // Stops: only those serving the active route
        stopsFilter: ['all', isStop, stopServesActiveRoute] as unknown[],
      };
    }

    // mode === 'network'
    return {
      // Active: the selected route line (highlighted)
      activeRouteFilter: ['all', isRoute, isActiveRoute] as unknown[],
      // Inactive: all routes EXCEPT the active one (shown tenuously)
      inactiveRoutesFilter: ['all', isRoute, ['!', isActiveRoute]] as unknown[],
      // Stops: only those serving the active route
      stopsFilter: ['all', isStop, stopServesActiveRoute] as unknown[],
    };
  }, [activeRouteId, mode]);

  return {
    activeRouteId,
    mode,
    setActiveRoute,
    clearRoute,
    setMode,
    toggleMode,
    activeRouteFilter,
    inactiveRoutesFilter,
    stopsFilter,
  };
}

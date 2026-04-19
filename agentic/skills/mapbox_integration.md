# Skill: Mapbox Integration (SmartBussingMobile)

## Contexto
El proyecto utiliza `@rnmapbox/maps` para la visualización del mapa principal en el `Dashboard`. El manejo de la cámara, los marcadores y las rutas son funciones críticas.

## Reglas de Implementación

1.  **Manejo del Token:** Siempre asegurar que `MapboxGL.setAccessToken` se inicializa con el token desde `Constants.expoConfig?.extra?.MAPBOX_DOWNLOAD_TOKEN`. No *hardcodear* tokens.
2.  **Anotaciones de Puntos (Marcadores):**
    *   Para elementos interactivos (buses, paradas), usa `<MapboxGL.PointAnnotation>`.
    *   Siempre asigna un `id` único y una `coordinate={[lng, lat]}`.
    *   Personaliza el marcador renderizando un `View` hijo.
3.  **Trazado de Rutas (Polylines):**
    *   Usa `<MapboxGL.ShapeSource>` o `<MapboxGL.VectorSource>` acoplado con un `<MapboxGL.LineLayer>`.
    *   Ejemplo estándar para una ruta:
        ```tsx
        <MapboxGL.ShapeSource id="routeSource" shape={routeGeoJSON}>
            <MapboxGL.LineLayer id="routeFill" style={{ lineColor: '#3B7C5F', lineWidth: 4 }} />
        </MapboxGL.ShapeSource>
        ```
4.  **Control de Cámara:**
    *   Usa una referencia `cameraRef = useRef<MapboxGL.Camera>(null)`.
    *   Para mover suavemente la cámara a una nueva ubicación (ej. tras geocoding):
        ```typescript
        cameraRef.current?.setCamera({
            centerCoordinate: [lng, lat],
            zoomLevel: 15,
            animationMode: "flyTo",
            animationDuration: 800,
        });
        ```
5.  **Ubicación del Usuario:**
    *   Combina `expo-location` (para obtener el estado inicial) con `<MapboxGL.LocationPuck />` para el renderizado nativo.

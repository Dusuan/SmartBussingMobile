# SmartBussingMobile - Referencias y Dependencias Clave

Esta es una lista de las librerías principales utilizadas en el proyecto y sus versiones, obtenidas de `package.json`.

## Core
- **React Native:** `0.81.5`
- **React:** `19.1.0`
- **Expo:** `~54.0.33`
- **Expo Router:** `~6.0.23`

## Mapas y Localización
- **@rnmapbox/maps (Mapbox):** `^10.1.38`
- **expo-location:** `~19.0.8`

## UI y Estilos
- **react-native-paper:** `^5.13.3` (Componentes Material Design)
- **nativewind:** `^4.1.23` (Tailwind CSS para React Native)
- **tailwindcss:** `^3.4.17`
- **@gorhom/bottom-sheet:** `^5.1.4` (Modal/Hoja inferior interactiva)

## Animaciones y Gestos
- **react-native-reanimated:** `~4.1.1`
- **react-native-gesture-handler:** `~2.28.0`

## Utilidades Adicionales
- **expo-constants:** `~18.0.13` (Para manejo seguro de variables de entorno y manifiesto)
- **react-native-safe-area-context:** `~5.6.0`
- **react-native-vector-icons:** `^10.2.0`

## Patrones de Código e Implementación

### Toques en Mapa (`queryRenderedFeaturesInRect`)
**Cuándo usar:** Cuando necesites detectar toques (taps) del usuario sobre elementos pequeños en el mapa (como Puntos de Interés o POIs) de manera confiable. Evita usar `queryRenderedFeaturesAtPoint` porque exige precisión de 1 píxel y suele fallar con dedos humanos, devolviendo la calle debajo del icono en su lugar.

**Snippet:**
```tsx
const handleMapPress = async (e: any) => {
  if (!mapRef.current) return;
  const { properties } = e;

  // Crear una "caja táctil" de 50x50 píxeles
  const TOUCH_RADIUS = 25;
  const bbox = [
    properties.screenPointY - TOUCH_RADIUS, // top
    properties.screenPointX - TOUCH_RADIUS, // left
    properties.screenPointY + TOUCH_RADIUS, // bottom
    properties.screenPointX + TOUCH_RADIUS  // right
  ];

  const features = await mapRef.current.queryRenderedFeaturesInRect(bbox);
  
  // Buscar el elemento deseado descartando calles y fondo
  const targetFeature = features?.features?.find((f: any) => {
    if (!f.properties?.name) return false;
    const layerId = (f.layer?.id || '').toLowerCase();
    return !layerId.includes('road') && !layerId.includes('water');
  });
};
```

**Gotchas y Detalles Importantes:**
- El orden del arreglo del BBox en `@rnmapbox/maps` es estrictamente `[top, left, bottom, right]`.
- Debido a que las coordenadas de pantalla tienen `Y=0` en la parte superior, `top` es `Y - RADIO` y `bottom` es `Y + RADIO`.
- Siempre que busques POIs globales de Mapbox, filtra explícitamente y descarta las capas enormes (`road`, `water`) ya que la "caja táctil" siempre las interceptará.

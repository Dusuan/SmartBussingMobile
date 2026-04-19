# SmartBussingMobile - Worklog y Backlog

## Estado Actual (Última Actualización)
- Estructura base del proyecto inicializada con Expo Router de forma exitosa.
- Pantallas base construidas e integradas en el Stack de navegación:
  - `index.tsx` (Splash/Landing)
  - `login.tsx` / `register.tsx`
  - `(dashboard)/index.tsx` (Mapa Principal)
- Integración de **Mapbox** (`@rnmapbox/maps`) funcional con centrado en la ubicación real del usuario obtenida vía `expo-location`.
- Interfaz principal (`Dashboard`) con modal interactivo (Bottom Sheet) implementado con `@gorhom/bottom-sheet`.
- Componentes modulares (`SearchBar`, `BusCard`, `Anuncio`, `MapView`) separados lógicamente.
- Autenticación básica (Login) conectada de forma preliminar al backend de producción (Render).
- Contextos globales (`contextUser` y `context`) disponibles para consumo.

## Backlog (Tareas Pendientes)

### Críticas / Seguridad
- [ ] **Refactorizar Endpoint Login:** Modificar `login.tsx` para enviar email y password en el *body* (JSON) en lugar de *Query Parameters*.
- [ ] **Seguridad del UserContext:** Eliminar el almacenamiento del `password` en texto plano dentro de la interfaz global `Usuario`.

### Features de Mapa
- [ ] **Integrar Geocoding Real:** Conectar el componente `SearchBar` a una API de Geocoding (ej. Mapbox Geocoding API) para buscar direcciones reales.
- [ ] **Dibujar Rutas (Polylines):** Implementar `MapboxGL.LineLayer` usando un `VectorSource` para trazar las rutas de los microbuses en el mapa.
- [ ] **Seguimiento de Microbuses:** Renderizar y animar `PointAnnotation` para vehículos en movimiento recuperados de la API de microbuses.

### Integración API
- [ ] Conectar módulo `(routeView)` con el backend para obtener el listado real de rutas.
- [ ] Conectar módulo `(com_microbuses)` con el estado en vivo de la flota.
- [ ] Mejorar la gestión de errores globales en respuestas HTTP.

### UI / UX
- [ ] Implementar la funcionalidad de "Rutas Favoritas" (`(likedRoute)`).
- [ ] Perfeccionar lógica del `TimeContext` para que provea estimaciones precisas (ETA) a partir de coordenadas o peticiones a APIs de enrutamiento (Directions API).

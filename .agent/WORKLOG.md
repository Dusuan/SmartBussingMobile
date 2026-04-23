# SmartBussingMobile - Worklog

## Registro de Actividades (Worklog)
*Registro cronológico de las tareas realizadas, detallando el contexto de los cambios implementados cada día.*

### 2026-04-23
- **Integración de POIs Nativos de Mapbox:** Se implementó un sistema táctil optimizado (`queryRenderedFeaturesInRect`) para atrapar de forma confiable toques del usuario en la base de datos global de lugares (comercios, restaurantes) del mapa base de Mapbox, descartando calles y fondos.
- **Componente StopPopup y Google Maps URL:** Se creó un popup premium modular (`StopPopup.tsx`). Este componente se renderiza nativamente mediante `MarkerView` y soporta dinámicamente paradas de autobús y locales comerciales. Los locales poseen redirección directa hacia Google Maps usando URLs de búsqueda dinámica basados en el nombre.
- **Ajustes Visuales del Mapa:** Se cambió el estilo predeterminado a `streets-v12` para que los Puntos de Interés sean visibles a niveles de zoom estándar, mejorando la UX de búsqueda de patrocinadores.
- **Sincronización de Datos Remotos (API):** Se implementó la función `syncRoutes` en `hooks/useRoutesData.ts` para sincronizar el estado local de rutas con la base de datos (backend Render). Se usa `fetch` nativo con `async/await` y se implementó manejo de errores con resiliencia offline (`Alert` en caso de fallo).
- **Documentación de Skills y Referencias:** Se establecieron y documentaron los estándares para comunicación API y seguridad (`.agent/skills/api_communication/SKILL.md`). También se actualizaron referencias documentales para reflejar los últimos cambios del stack (rendimiento de Mapbox, componentes UI modulares).

### 2026-04-21
- **Refactorización del Dashboard y UI:** Se separaron componentes modulares como `AdsModal`, `DashboardBottomSheet` y `DashboardTopBar` para aligerar la lógica del Dashboard. Se actualizaron iconos en los componentes `Profile` y `rutasfavoritas`.
- **Lógica de Rutas y Estado:** Se implementaron hooks (`useRouteFilter`, `useRoutesData`) con tipado TypeScript para manejo de datos. Se integró el estado del modo de ruta en el `MapRouteController` y se implementó renderizado nativo de MapboxGL.

### 2026-04-20
- **Actualización de Documentación:** Se modificó el archivo `WORKLOG.md` a petición del usuario para estructurarlo de forma cronológica. Ahora cada registro incluye la fecha y un contexto claro de los cambios realizados en cada actividad, mejorando la trazabilidad del proyecto.
- **Optimización de Mapbox Route Implementation:** Se refactorizó la arquitectura de renderizado de rutas mediante un controlador centralizado (`MapRouteController`) utilizando componentes nativos de Mapbox (`LineLayer`, `SymbolLayer`, `ShapeSource`). Se reemplazó el antiguo enfoque de rutas individuales para evitar cuellos de botella en el rendimiento, integrando hooks personalizados (`useRouteFilter`, `useRoutesData`) y un sistema unificado de GeoJSON validado por tipos (`geodata.ts`).

### 2026-04-19
- **Organización de Skills Agénticos:** Refactorización de la estructura en el directorio `.agent/skills/`. Se crearon carpetas dedicadas para cada skill, moviendo el contenido a archivos `SKILL.md` individuales. Se agregaron encabezados estandarizados con título y descripción para optimizar el contexto y la toma de decisiones del agente.
- **Implementación de Funcionalidades Base (Mapa y Arquitectura):** Se avanzó en la implementación de `Mapbox`, logrando dibujar rutas usando `Polylines` e integrando marcadores de paradas (`PointAnnotation`). Además, se completó la refactorización del `Dashboard`, separando limpiamente componentes como modales y bottom sheets para un código más escalable y modular.

## Estado Actual (Última Actualización)
- Estructura base del proyecto inicializada con Expo Router de forma exitosa.
- Pantallas base construidas e integradas en el Stack de navegación:
  - `index.tsx` (Splash/Landing)
  - `login.tsx` / `register.tsx`
  - `(dashboard)/index.tsx` (Mapa Principal)
- Integración de **Mapbox** (`@rnmapbox/maps`) funcional con centrado en la ubicación real del usuario obtenida vía `expo-location`.
- Interfaz principal (`Dashboard`) con modal interactivo (Bottom Sheet) implementado con `@gorhom/bottom-sheet`, dividiendo responsabilidades en `DashboardBottomSheet`, `DashboardTopBar` y `AdsModal`.
- Manejo de rutas interactivo centralizado con `MapRouteController` y hooks tipados.
- Componentes modulares (`SearchBar`, `BusCard`, `Anuncio`, `MapView`) separados lógicamente.
- Autenticación básica (Login) conectada de forma preliminar al backend de producción (Render).
- Sincronización asíncrona remota ("offline-first") de las rutas implementada exitosamente en el hook `useRoutesData.ts`.
- Popups modulares interactivos (`StopPopup.tsx`) anclados geográficamente que exponen búsquedas dinámicas de comercios en Google Maps.

### Qué quedó en progreso
- Integración completa y segura de la autenticación en todo el flujo del `UserContext` evitando guardar passwords de manera expuesta en el estado.
- Reemplazo gradual de las métricas simuladas del Dashboard (datos con símbolo `?`) por datos provenientes del servidor.

### Bloqueos
- Ninguno identificado en este momento.

### Próximos pasos por prioridad
1. Limpiar el objeto de `Usuario` del Contexto global para remover completamente data sensible como `password`.
2. Habilitar la ubicación/telemetría en tiempo real de los vehículos si la API los soporta.
3. Asegurar que las paradas mockeadas del mapa reflejen datos 100% dinámicos en producción sin pérdida de framerates.

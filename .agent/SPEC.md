# SmartBussingMobile - Especificaciones Técnicas (SPEC)

## 1. Requerimientos Técnicos
- **Plataforma:** Aplicación móvil multiplataforma (iOS y Android).
- **Framework Principal:** React Native gestionado con Expo.
- **Enrutamiento:** Expo Router (File-based routing).
- **Mapas y Navegación:** Mapbox GL para renderizado de mapas vectoriales interactivos y visualización de ubicaciones.
- **Geolocalización:** Expo Location para el seguimiento en tiempo real de la ubicación del usuario.
- **Estilos y UI:** Híbrido entre TailwindCSS (NativeWind), React Native Paper (Material Design), y React Native StyleSheet.
- **Gestos y Animaciones:** React Native Reanimated y React Native Gesture Handler (esenciales para el Bottom Sheet y transiciones fluidas).
- **Backend:** Conexión a una API REST alojada en Render (`https://smart-bussing-back.onrender.com`).

## 2. Modelos de Datos Conocidos

### Usuario (Autenticación y Sesión)
```typescript
interface Usuario {
    id_usuario: number;
    nombre: string;
    email: string;
    password: string; // ⚠️ Riesgo: No debería almacenarse en texto plano en el estado del cliente
}
```

### Contexto de Tiempos de Viaje
```typescript
type TypeExContentType = {
    busTime: number;
    walkTime: number;
    allTime: number;
}
```

## 3. Endpoints y Funciones Principales

### Endpoints (Backend API)
- **Base URL:** `https://smart-bussing-back.onrender.com/api/v1`
- **Login:** `POST /user/login?email={email}&password={password}` 
  *(⚠️ Crítico: Los parámetros sensibles se están pasando en la URL. Requiere refactorización hacia el body).*
- **Get User Info:** `GET /user/`

### Funciones Principales (Frontend)
- **Geolocalización (`Dashboard`):**
  - `Location.requestForegroundPermissionsAsync()`: Solicitud de permisos al inicio.
  - `Location.getCurrentPositionAsync()`: Obtención de la coordenada inicial del usuario.
- **Control de Mapas (`Dashboard / Mapbox`):**
  - `cameraRef.current?.setCamera({ centerCoordinate, zoomLevel, animationMode })`: Función para desplazar animadamente la cámara al realizar búsquedas en el `SearchBar`.
  - **`MapRouteController`**: Controlador centralizado que renderiza rutas y paradas optimizadas mediante orígenes vectoriales (`ShapeSource`) y capas nativas de Mapbox (`LineLayer`, `SymbolLayer`). Gestiona directamente el estado del modo de visualización.
- **Gestión de Datos y Estado (Hooks):**
  - `useRouteFilter` / `useRoutesData`: Hooks tipados en TypeScript para el manejo eficiente de la información de rutas y su filtrado dentro del flujo de la UI.
- **Estimación de Tiempo (`Context`):**
  - `calculateAllTime(items: Array<string>)`: Suma acumulativa rudimentaria de `busTime` y `walkTime`.

## 4. Arquitectura Modular de Interfaz
Para evitar un `Dashboard` sobrecargado ("bloat"), la interfaz de usuario se desacopla en los siguientes subcomponentes principales:
- `DashboardTopBar`: Maneja la navegación superior y la barra de búsqueda.
- `DashboardBottomSheet`: Agrupa la lógica y presentación del panel inferior desplazable, sirviendo componentes como `BusCard`.
- `AdsModal`: Modal independiente para visualización de anuncios en flujo.

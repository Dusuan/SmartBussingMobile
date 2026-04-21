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
- **Estimación de Tiempo (`Context`):**
  - `calculateAllTime(items: Array<string>)`: Suma acumulativa rudimentaria de `busTime` y `walkTime`.

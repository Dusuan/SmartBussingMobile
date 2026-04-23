# SmartBussingMobile - Guía de Implementación y Patrones (CLAUDE)

Este documento centraliza los patrones de diseño, convenciones de nombres e implementaciones de referencia para que el asistente de IA los use al generar código nuevo (especialmente con el comando `/new-feature`).

## Comandos Personalizados
- `/load-project`: Lee CLAUDE.md, SPEC.md y WORKLOG.md en ese orden. El asistente debe responder con un resumen del estado actual, qué estaba en progreso y el próximo paso. No debe escribir código hasta recibir aprobación.
- `/review-code`: Revisa el código recién escrito con mentalidad de senior developer estricto. Evalúa: 1) Bugs/Edge cases, 2) Cumplimiento de CLAUDE.md, 3) Simplificación (over-engineering), 4) Manejo de errores, 5) Riesgos en producción. El asistente será directo y claro.
- `/new-feature [descripción]`: Inicia la implementación de una nueva feature. Primero genera un plan para describir el approach. Al ser aprobado, implementa en orden: Backend (modelo → repo → servicio → controller → ruta) y luego Frontend (tipos → hook → componente → integración). Escribe tipos TS primero y usa patrones de REFERENCES.md.
- `/fix-bug [descripción]`: Diagnostica y arregla un bug. El asistente responderá con: 1) Causa probable, 2) Archivos involucrados, y 3) El fix mínimo necesario. Promete estrictamente NO arreglar nada más allá del bug reportado y mostrar el diff exacto de los cambios a realizar.
- `/update-worklog`: Actualiza WORKLOG.md al terminar la sesión. Incluye: Fecha, Qué implementamos (lista de lo hecho), Qué quedó en progreso, Bloqueos y Próximos pasos por prioridad.
- `/add-reference [tema]`: Agrega a REFERENCES.md un snippet de ejemplo para un nuevo patrón o librería. Incluye: Cuándo usar el patrón, snippet mínimo funcional y gotchas/detalles importantes, manteniendo el estilo existente.
- `/update-spec [cambio]`: Actualiza SPEC.md ante cambios de diseño o alcance. Asegura: 1) Marcar [x] features implementadas, 2) Agregar nuevas con [ ], 3) Actualizar modelo de datos, 4) Actualizar endpoints.
- `/agent [rol]`: Invoca un sub-agente experto para revisar código bajo un enfoque específico:
  - `security`: Busca SQL injection, mala autenticación, secrets, inputs no sanitizados y JWT mal configurado. Reporta con severidad (CRÍTICO/ALTO/MEDIO/BAJO).
  - `dba`: DBA experto en PostgreSQL. Revisa queries eficientes/índices, normalización, N+1 queries, foreign keys y constraints.
  - `qa`: QA Engineer. Genera casos de prueba necesarios, edge cases probables y un test de integración (happy path) en el stack del proyecto (Vitest/Jest).
  - `frontend`: Experto en React-native/UX. Evalúa manejo de estado, re-renders innecesarios, UX completa (loading/error/empty) y cohesión del componente (si debe dividirse).

## 1. Patrones de Diseño Arquitectónico
- **Componentes UI Modulares (De-bloating):** Evitar sobrecargar vistas principales (como el `Dashboard`). Extraer responsabilidades en componentes focalizados como `AdsModal`, `DashboardBottomSheet`, `DashboardTopBar`.
- **Renderizado Eficiente de Mapas:** No mapear y renderizar componentes independientes para cada ruta/línea. Utilizar **MapboxGL** de forma centralizada a través del `MapRouteController`, alimentando la data en bloque vía `ShapeSource` y renderizando estilos nativos con `LineLayer` y `SymbolLayer`.
- **Separación Lógica (Custom Hooks):** Toda la lógica compleja de negocio, filtrado de datos y manejo de estado (especialmente para los mapas) debe ser extraída a **Hooks en TypeScript** (ej. `useRouteFilter`, `useRoutesData`).
- **Estados Desacoplados:** Enviar el estado o control directamente a los manejadores visuales pertinentes (ej. estado de *route mode* dentro de `MapRouteController`).

## 2. Convenciones de Nombres
- **Componentes React:** `PascalCase` (ej. `DashboardBottomSheet`, `BusCard`).
- **Custom Hooks:** Empezar con `use` seguido de `PascalCase` (ej. `useRoutesData`).
- **Interfaces y Tipos (TypeScript):** `PascalCase` y ser lo más descriptivos posible respecto a la estructura de datos que validan.
- **Archivos de Enrutamiento (Expo Router):** Usar `kebab-case` para nombres de carpetas o parámetros de ruta (ej. `(dashboard)/index.tsx`, `[id].tsx`).

## 3. UI, Estilos y UX
- **NativeWind (Tailwind):** Priorizar el uso de clases utilitarias de NativeWind para la maquetación principal.
- **React Native Paper:** Utilizado preferentemente para componentes atómicos estandarizados de Material Design (inputs, switches, cards genéricos).
- **Animaciones Premium:** Para transiciones interactivas (como el comportamiento de la hoja inferior / bottom sheet) o marcadores dinámicos, usar siempre **React Native Reanimated** y **React Native Gesture Handler**.
- **Consistencia Visual:** Mantener un diseño limpio con jerarquía visual en los popups interactivos y bottom sheets.

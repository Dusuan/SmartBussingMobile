------
titulo: ui_components
descripcion: Reglas para la implementación de componentes UI usando Tailwind (NativeWind), React Native Paper y StyleSheet, incluyendo interactividad y tipografía.
------

# Skill: Creación de Componentes UI (SmartBussingMobile)

## Contexto
La arquitectura de interfaz del proyecto es un híbrido entre Tailwind CSS (vía NativeWind), React Native Paper y estilos tradicionales (`StyleSheet`).

## Reglas de Implementación Visual

1.  **Prioridad de Estilos:**
    *   Usa **Tailwind (NativeWind)** mediante el prop `className` para márgenes, paddings, flexbox, y alineaciones (ej. `className="flex-1 items-center justify-center"`).
    *   Usa **React Native Paper** para componentes interactivos estándar (Buttons, TextInputs, Modals) para heredar comportamientos de Material Design accesibles.
    *   Usa `StyleSheet.create` **solo** para propiedades dinámicas, complejas o que no estén cubiertas eficientemente por Tailwind (como `...StyleSheet.absoluteFillObject` o sombras complejas).
2.  **Jerarquía de Componentes:**
    *   Si un componente se usa en múltiples pantallas (ej. tarjetas de ruta, botones de retorno), colócalo en `/components/`.
    *   Si un componente es exclusivo de una pantalla (ej. la estructura del Bottom Sheet del Dashboard), mantenlo dentro del archivo de la ruta en `/app/` o en una carpeta anidada local.
3.  **Tipografía:**
    *   Usa el componente wrapper personalizado `Text` importado desde `../components/AppText` en lugar del nativo de React Native para asegurar que la fuente `MyFont` (Manrope) se aplique globalmente de manera uniforme.
4.  **Interactividad y Bottom Sheets:**
    *   Para paneles deslizables, el estándar del proyecto es `@gorhom/bottom-sheet`.
    *   Siempre usa `useRef<BottomSheet>(null)` para el control programático (`snapToIndex`).

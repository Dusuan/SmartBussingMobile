# Skill: Proceso de Code Review (SmartBussingMobile)

## Contexto
Esta skill define los estándares y la lista de verificación (checklist) que el Agente debe seguir al revisar código antes de dar por finalizada una tarea o al evaluar código existente.

## Checklist de Revisión de Código

### 1. Seguridad y Datos
- [ ] ¿Hay contraseñas, tokens o PII (Personal Identifiable Information) expuestos en la URL (Query Params)? *Debe usarse siempre el Body.*
- [ ] ¿Se están guardando contraseñas en texto plano en contextos globales o AsyncStorage? *Nunca guardar contraseñas, solo tokens (JWT).*
- [ ] ¿El Token de Mapbox está expuesto directamente en el código? *Debe consumirse desde `Constants.expoConfig`.*

### 2. Estándares UI/UX
- [ ] ¿Se usó `Text` nativo en lugar del componente personalizado `AppText`? *Cambiar a `AppText` para mantener la fuente `Manrope`.*
- [ ] ¿Se abusó de `StyleSheet` para layouts simples? *Preferir Tailwind (`className`) para flexbox, márgenes y alineaciones.*
- [ ] ¿Los botones e inputs interactivos usan `react-native-paper` para garantizar accesibilidad y feedback visual (Material Design)?

### 3. Rendimiento y Mejores Prácticas
- [ ] En Mapbox, ¿las anotaciones dinámicas o componentes de la cámara causarán re-renderizados innecesarios? *Usar `useMemo` o dependencias correctas en `useEffect`.*
- [ ] ¿Las llamadas API (`fetch`) manejan adecuadamente los errores (`try/catch` y `!response.ok`) y proveen feedback al usuario?
- [ ] ¿Existen `console.log` residuales de debugging que expongan datos del usuario o llenen la consola innecesariamente?

## Acción de Cierre
Si la revisión detecta una falla en estos puntos críticos, el Agente debe corregir el código o notificar al usuario sobre el problema antes de proceder.

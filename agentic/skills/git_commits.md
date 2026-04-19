# Skill: Generación de Commit Messages (SmartBussingMobile)

## Contexto
Esta skill define cómo el Agente debe redactar mensajes de *commit* para mantener el historial de Git limpio, descriptivo y en español.

## Estructura del Commit Message

Seguiremos una adaptación de *Conventional Commits* en **español**:

`<tipo>(<alcance opcional>): <descripción breve>`

`[línea en blanco]`

`[cuerpo opcional detallando el POR QUÉ y el QUÉ]`

### Tipos Permitidos (`<tipo>`)
- `feat`: Una nueva característica funcional (ej. nueva pantalla, nueva conexión API).
- `fix`: Corrección de un error o bug (ej. fallo en el login, mapa que no centra).
- `refactor`: Cambio de código que no añade features ni corrige bugs, pero mejora la estructura interna (ej. mover componentes a su propia carpeta).
- `style`: Cambios que no afectan la lógica (espacios, formateo, ordenamiento de imports).
- `docs`: Cambios exclusivos en la documentación (ej. actualización de `SPEC.md` o `WORKLOG.md`).
- `chore`: Tareas de mantenimiento, actualización de dependencias o configuración del repositorio.

### Alcance (`<alcance>`)
Indica el módulo afectado (en minúsculas). Ejemplos: `login`, `mapa`, `ui`, `api`, `dashboard`.

## Reglas de Redacción
1. La **descripción breve** no debe superar los 50 caracteres y debe escribirse en imperativo o presente simple (ej. "Añadir marcador de usuario", "Corregir error de login").
2. **No usar mayúsculas** al inicio del `<tipo>`.
3. Mantener el idioma **siempre en español**.

## Ejemplos Correctos

**Ejemplo 1 (Feature):**
```text
feat(mapa): implementar geocoding en el searchbar

Se conectó el componente SearchBar a la API de Geocoding para obtener
coordenadas a partir del texto ingresado. La cámara ahora se desplaza 
suavemente al destino seleccionado.
```

**Ejemplo 2 (Fix):**
```text
fix(login): asegurar envío de credenciales en el body

Se eliminaron los query parameters en la llamada a /user/login para 
evitar la exposición de contraseñas. Ahora se envían codificadas en 
JSON dentro del cuerpo de la petición.
```

**Ejemplo 3 (Chore/Docs):**
```text
docs(agent): actualizar worklog y backlog de tareas
```

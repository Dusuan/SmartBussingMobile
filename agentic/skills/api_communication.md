# Skill: Comunicaciones con API (SmartBussingMobile)

## Contexto
El proyecto se conecta a un backend en Render (`https://smart-bussing-back.onrender.com/api/v1`). Existen deudas técnicas previas (como pasar passwords por Query Params) que deben evitarse estrictamente.

## Reglas de Implementación HTTP

1.  **Uso de fetch API:** Utilizar `fetch` nativo con `async/await` para todas las peticiones de red.
2.  **Seguridad de Datos Sensibles (POST/PUT):**
    *   **NUNCA** envíes datos sensibles (`password`, tokens, emails personales) en la URL (Query Parameters).
    *   Envíalos siempre en el `body` serializados como JSON.
    *   Ejemplo de Petición Segura:
        ```typescript
        const response = await fetch(`${API_BASE}/user/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include'
        });
        ```
3.  **Manejo de Errores Global:**
    *   Siempre verifica `response.ok` o los `status` codes específicos (401, 500).
    *   Usa bloques `try...catch` para interceptar errores de red o excepciones fatales.
    *   Usa `Alert.alert` (o un Toast personalizado) para notificar al usuario de forma amigable ("Hubo un error en el servidor, vuelva a intentarlo más tarde").
4.  **Uso del Contexto de Usuario (`UserContext`):**
    *   Al recuperar información de sesión o usuario, hidrata inmediatamente el contexto global `setUser(data)`.
    *   (Tarea Pendiente): El objeto `Usuario` en el contexto nunca debe almacenar la propiedad `password`.

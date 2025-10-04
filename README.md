# workout-tracker-api
# Workout Tracker API 🏋️

API RESTful para gestionar usuarios, ejercicios, planes de entrenamiento, sesiones programadas e informes de progreso.  
Incluye autenticación con headers y manejo de estados HTTP según las buenas prácticas REST.

---

## 🚀 Recursos principales y Endpoints

### 👤 Users
- **GET /users** → Lista todos los usuarios (con `?limit=n`).
- **GET /users/:id** → Obtiene un usuario por ID.
- **POST /users** → Crea un nuevo usuario.
- **PUT /users/:id** → Actualiza completamente un usuario.
- **PATCH /users/:id** → Actualiza parcialmente un usuario.
- **DELETE /users/:id** → Elimina un usuario.

📌 **Ejemplo de creación**
```http
POST /users
Content-Type: application/json

{
  "name": "Vanessa",
  "email": "vanessa@example.com"
}

{
  "message": "Usuario creado",
  "user": { "id": 1, "name": "Vanessa", "email": "vanessa@example.com" }
}

🏋️ Exercises

GET /exercises → Lista todos los ejercicios (con ?category=fuerza).
GET /exercises/:id → Obtiene un ejercicio.
POST /exercises → Crea un nuevo ejercicio.
PUT /exercises/:id → Actualiza completamente un ejercicio.
PATCH /exercises/:id → Actualiza parcialmente un ejercicio.

GET /exercises?category=fuerza

[
  { "id": 1, "name": "Sentadillas", "category": "fuerza", "muscle": "piernas" }
]

📋 Plans (Workouts)

GET /plans → Lista planes (?userId=1).
GET /plans/:id → Obtiene un plan.
POST /plans → Crea un plan.
PUT /plans/:id → Actualiza un plan.
PATCH /plans/:id → Actualiza parcialmente un plan.
DELETE /workouts/:id → Elimina un plan.

POST /plans
Content-Type: application/json

{
  "userId": 1,
  "name": "Rutina Full Body"
}

{
  "message": "Plan creado",
  "plan": { "id": 2, "userId": 1, "name": "Rutina Full Body" }
}

⏰ Sessions

GET /sessions → Lista sesiones (?planId=2).
GET /sessions/:id → Obtiene una sesión.
POST /sessions → Crea una sesión.
PUT /sessions/:id → Actualiza una sesión.
PATCH /sessions/:id → Actualiza parcialmente una sesión.

📊 Reports

GET /reports → Lista informes (?userId=1&from=2025-09-01&to=2025-09-15).
GET /reports/:id → Obtiene un informe (requiere X-API-Key y Authorization).
POST /reports → Crea un informe.
PUT /reports/:id → Actualiza un informe.
PATCH /reports/:id → Actualiza parcialmente un informe.

GET /reports/1
Authorization: Bearer secret123
X-API-Key: 12345

{
  "id": 1,
  "userId": 1,
  "start": "2025-09-01",
  "end": "2025-09-15",
  "summary": "Buen progreso",
  "sessions": 5,
  "calories": 2000
}

⚡ Códigos de Estado HTTP

200 OK → Lecturas o actualizaciones exitosas.
201 Created → Recurso creado correctamente.
204 No Content → Recurso eliminado.
400 Bad Request → Parámetros o body inválidos.
401 Unauthorized → Falta autenticación (Authorization).
403 Forbidden → API Key inválida.
404 Not Found → Recurso inexistente.
500 Internal Server Error → Error inesperado en el servidor.
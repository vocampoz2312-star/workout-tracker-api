const express = require("express"); // Import express
const app = express(); // Create an instance of express
const { port } = require('./config/env'); // Import the port from the env file

// Inicializacion del servidor y primera ruta
app.get("/", (req, res) => {
  res.send("Hola mi server en Express");
});

// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

// Middleware global para JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================== RECURSOS PRINCIPALES ==================

// Datos simulados
const users = [
  {id: 1, name: "Vanessa", email: "vanessa@example.com"},
  {id: 2, name: "Santiago", email: "santy@example.com"},
  {id: 3, name: "Juan", email: "juan@example.com"},
  {id: 4, name: "Andrés", email: "andres@example.com"}
];

const exercises = [
  {id: 1, name: "Sentadillas", category: "fuerza", muscle: "piernas"},
  {id: 2, name: "Correr", category: "cardio", muscle: "full body"},
  {id: 3, name: "Flexiones", category: "fuerza", muscle: "pecho"}
];

const plans = [
  {id: 1, userId: 1, name: "Rutina Full Body"},
  {id: 2, userId: 2, name: "Rutina Piernas"},
  {id: 3, userId: 1, name: "Rutina Cardio"}
];

const sessions = [
  {id: 1, planId: 1, date: "2025-09-20", time: "08:00"},
  {id: 2, planId: 1, date: "2025-09-21", time: "19:00"},
  {id: 3, planId: 2, date: "2025-09-22", time: "10:00"}
];

const reports = [
  {id: 1, userId: 1, start: "2025-09-01", end: "2025-09-15", summary: "Buen progreso", sessions: 5, calories: 2000},
  {id: 2, userId: 2, start: "2025-08-01", end: "2025-08-30", summary: "Constante", sessions: 8, calories: 3500}
];



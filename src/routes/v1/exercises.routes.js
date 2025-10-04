const express = require("express");
const router = express.Router();

let exercises = [
  { id: 1, name: "Sentadillas", category: "fuerza", muscle: "piernas" },
  { id: 2, name: "Correr", category: "cardio", muscle: "full body" },
  { id: 3, name: "Flexiones", category: "fuerza", muscle: "pecho" },
];

// GET /api/v1/exercises?category=fuerza&muscle=piernas
router.get("/", (req, res) => {
  let results = [...exercises];
  const { category, muscle } = req.query;

  if (category) {
    results = results.filter(e => e.category.toLowerCase() === category.toLowerCase());
  }

  if (muscle) {
    results = results.filter(e => e.muscle.toLowerCase().includes(muscle.toLowerCase()));
  }

  res.status(200).json(results);
});

// GET /api/v1/exercises/:id
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

  const exercise = exercises.find(e => e.id === id);
  if (!exercise) return res.status(404).json({ error: "Ejercicio no encontrado" });

  res.status(200).json(exercise);
});

// POST /api/v1/exercises
router.post("/", (req, res) => {
  const { name, category, muscle } = req.body;
  if (!name || !category || !muscle) {
    return res.status(400).json({ error: "Faltan datos obligatorios: name, category, muscle" });
  }

  const newExercise = { id: Date.now(), name, category, muscle };
  exercises.push(newExercise);

  res.status(201).json(newExercise);
});

module.exports = router;

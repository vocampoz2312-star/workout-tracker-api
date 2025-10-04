const express = require("express");
const router = express.Router();

let plans = [
  { id: 1, userId: 1, name: "Rutina Full Body" },
  { id: 2, userId: 2, name: "Rutina Piernas" },
  { id: 3, userId: 1, name: "Rutina Cardio" },
];

// GET /api/v1/plans?userId=1
router.get("/", (req, res) => {
  let results = [...plans];
  const { userId } = req.query;

  if (userId) {
    const parsed = Number(userId);
    if (isNaN(parsed)) return res.status(400).json({ error: "userId debe ser numérico" });
    results = results.filter(p => p.userId === parsed);
  }

  res.status(200).json(results);
});

// GET /api/v1/plans/:id
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

  const plan = plans.find(p => p.id === id);
  if (!plan) return res.status(404).json({ error: "Plan no encontrado" });

  res.status(200).json(plan);
});

// POST /api/v1/plans
router.post("/", (req, res) => {
  const { userId, name } = req.body;
  if (!userId || !name) return res.status(400).json({ error: "Faltan datos: userId y name" });

  const newPlan = { id: Date.now(), userId: Number(userId), name };
  plans.push(newPlan);

  res.status(201).json(newPlan);
});

module.exports = router;

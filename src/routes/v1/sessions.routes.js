const express = require("express");
const router = express.Router();

let sessions = [
  { id: 1, planId: 1, date: "2025-09-20", time: "08:00" },
  { id: 2, planId: 1, date: "2025-09-21", time: "19:00" },
  { id: 3, planId: 2, date: "2025-09-22", time: "10:00" },
];

// GET /api/v1/sessions?planId=1
router.get("/", (req, res) => {
  let results = [...sessions];
  const { planId } = req.query;

  if (planId) {
    const parsed = Number(planId);
    if (isNaN(parsed)) return res.status(400).json({ error: "planId debe ser numérico" });
    results = results.filter(s => s.planId === parsed);
  }

  res.status(200).json(results);
});

// GET /api/v1/sessions/:id
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

  const session = sessions.find(s => s.id === id);
  if (!session) return res.status(404).json({ error: "Sesión no encontrada" });

  res.status(200).json(session);
});

// POST /api/v1/sessions
router.post("/", (req, res) => {
  const { planId, date, time } = req.body;
  if (!planId || !date || !time) {
    return res.status(400).json({ error: "Faltan datos obligatorios: planId, date, time" });
  }

  const newSession = { id: Date.now(), planId: Number(planId), date, time };
  sessions.push(newSession);

  res.status(201).json(newSession);
});

module.exports = router;

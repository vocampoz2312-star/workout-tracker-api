const express = require("express");
const router = express.Router();

let reports = [
  { id: 1, userId: 1, start: "2025-09-01", end: "2025-09-15", summary: "Buen progreso", sessions: 5, calories: 2000 },
  { id: 2, userId: 2, start: "2025-08-01", end: "2025-08-30", summary: "Constante", sessions: 8, calories: 3500 },
];

// GET /api/v1/reports?userId=1&from=2025-09-01&to=2025-09-15
router.get("/", (req, res) => {
  let results = [...reports];
  const { userId, from, to } = req.query;

  if (userId) {
    const parsed = Number(userId);
    if (isNaN(parsed)) return res.status(400).json({ error: "userId debe ser numérico" });
    results = results.filter(r => r.userId === parsed);
  }

  if (from && to) {
    results = results.filter(r => r.start >= from && r.end <= to);
  }

  res.status(200).json(results);
});

// GET /api/v1/reports/:id
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

  const report = reports.find(r => r.id === id);
  if (!report) return res.status(404).json({ error: "Reporte no encontrado" });

  res.status(200).json(report);
});

// POST /api/v1/reports
router.post("/", (req, res) => {
  const { userId, start, end, summary } = req.body;
  if (!userId || !start || !end || !summary) {
    return res.status(400).json({ error: "Faltan datos: userId, start, end, summary" });
  }

  const newReport = {
    id: Date.now(),
    userId: Number(userId),
    start,
    end,
    summary,
    sessions: 0,
    calories: 0
  };

  reports.push(newReport);
  res.status(201).json(newReport);
});

module.exports = router;

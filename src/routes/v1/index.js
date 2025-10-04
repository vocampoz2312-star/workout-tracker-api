const express = require("express");
const router = express.Router();

// Importar subrutas
const usersRouter = require("./users.routes");
const exercisesRouter = require("./exercises.routes");
const plansRouter = require("./plans.routes");
const sessionsRouter = require("./sessions.routes");
const reportsRouter = require("./reports.routes");

// Montar con prefijo
router.use("/users", usersRouter);
router.use("/exercises", exercisesRouter);
router.use("/plans", plansRouter);
router.use("/sessions", sessionsRouter);
router.use("/reports", reportsRouter);

module.exports = router;

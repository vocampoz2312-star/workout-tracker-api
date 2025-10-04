const express = require("express");
const router = express.Router();

let users = [
  { id: 1, name: "Vanessa", email: "vanessa@example.com" },
  { id: 2, name: "Santiago", email: "santy@example.com" },
  { id: 3, name: "Juan", email: "juan@example.com" },
];

// GET /api/v1/users
router.get("/", (req, res) => {
  res.status(200).json(users);
});

// GET /api/v1/users/:id
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

  res.status(200).json(user);
});

// POST /api/v1/users
router.post("/", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: "Datos faltantes" });

  const newUser = { id: Date.now(), name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT /api/v1/users/:id
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: "Faltan datos obligatorios" });

  const index = users.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ error: "Usuario no encontrado" });

  users[index] = { id, name, email };
  res.status(200).json(users[index]);
});

// PATCH /api/v1/users/:id
router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;

  res.status(200).json(user);
});

// DELETE /api/v1/users/:id
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

  const exists = users.some(u => u.id === id);
  if (!exists) return res.status(404).json({ error: "Usuario no encontrado" });

  users = users.filter(u => u.id !== id);
  res.status(204).send();
});

module.exports = router;

// GET /api/v1/users?name=Vanessa&limit=2
router.get("/", (req, res) => {
  let results = [...users]; // copiamos los usuarios

  const { name, email, limit } = req.query;

  // Filtro por nombre
  if (name) {
    results = results.filter(u =>
      u.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  // Filtro por email
  if (email) {
    results = results.filter(u =>
      u.email.toLowerCase().includes(email.toLowerCase())
    );
  }

  // Límite de resultados
  if (limit) {
    const n = Number(limit);
    if (isNaN(n) || n <= 0) {
      return res.status(400).json({ error: "El parámetro 'limit' debe ser un número positivo" });
    }
    results = results.slice(0, n);
  }

  res.status(200).json(results);
});

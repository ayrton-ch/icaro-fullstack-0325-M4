const { PersonalTrainer } = require("../models");

// GET /trainers
async function index(req, res) {
  try {
    const trainers = await PersonalTrainer.findAll();
    res.json(trainers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// GET /trainers/:id
async function show(req, res) {
  try {
    const { id } = req.params;
    const trainer = await PersonalTrainer.findByPk(id);

    if (!trainer) {
      return res.status(404).json({ error: "Entrenador no encontrado" });
    }

    res.json(trainer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// POST /trainers
async function create(req, res) {
  try {
    const trainer = await PersonalTrainer.create(req.body);
    res.status(201).json(trainer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// PATCH /trainers/:id
async function update(req, res) {
  try {
    const { id } = req.params;
    const trainer = await PersonalTrainer.findByPk(id);

    if (!trainer) {
      return res.status(404).json({ error: "Entrenador no encontrado" });
    }

    await trainer.update(req.body);
    res.json(trainer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// DELETE /trainers/:id
async function destroy(req, res) {
  try {
    const { id } = req.params;
    const trainer = await PersonalTrainer.findByPk(id);

    if (!trainer) {
      return res.status(404).json({ error: "Entrenador no encontrado" });
    }

    await trainer.destroy();
    res.json({ message: "Entrenador eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};

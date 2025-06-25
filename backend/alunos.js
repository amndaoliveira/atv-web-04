const express = require("express");
const router = express.Router();
const Aluno = require("./models/aluno");

// GET - Listar todos os alunos
router.get("/", (req, res) => {
  try {
    const alunos = Aluno.getAll();
    res.json(alunos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar alunos" });
  }
});

// GET - Buscar aluno por ID
router.get("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const aluno = Aluno.getById(id);

    if (!aluno) {
      return res.status(404).json({ error: "Aluno não encontrado" });
    }

    res.json(aluno);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar aluno" });
  }
});

// POST - Criar novo aluno
router.post("/", (req, res) => {
  try {
    const { nome, curso, ira } = req.body;

    // Validação básica
    if (!nome || !curso || ira === undefined) {
      return res.status(400).json({
        error: "Campos obrigatórios: nome, curso, ira",
      });
    }

    if (ira < 0 || ira > 10) {
      return res.status(400).json({
        error: "IRA deve estar entre 0 e 10",
      });
    }

    const novoAluno = Aluno.create({ nome, curso, ira: parseFloat(ira) });
    res.status(201).json(novoAluno);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar aluno" });
  }
});

// PUT - Atualizar aluno
router.put("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nome, curso, ira } = req.body;

    // Validação
    if (!nome || !curso || ira === undefined) {
      return res.status(400).json({
        error: "Campos obrigatórios: nome, curso, ira",
      });
    }

    if (ira < 0 || ira > 10) {
      return res.status(400).json({
        error: "IRA deve estar entre 0 e 10",
      });
    }

    const alunoAtualizado = Aluno.update(id, {
      nome,
      curso,
      ira: parseFloat(ira),
    });

    if (!alunoAtualizado) {
      return res.status(404).json({ error: "Aluno não encontrado" });
    }

    res.json(alunoAtualizado);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar aluno" });
  }
});

// DELETE - Remover aluno
router.delete("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const sucesso = Aluno.delete(id);

    if (!sucesso) {
      return res.status(404).json({ error: "Aluno não encontrado" });
    }

    res.json({ message: "Aluno removido com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover aluno" });
  }
});

module.exports = router;

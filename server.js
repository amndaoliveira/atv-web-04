const express = require("express");
const cors = require("cors");
const path = require("path");
const alunosRoutes = require("./routes/alunos");

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

// Rotas
app.use("/api/alunos", alunosRoutes);

// Servir frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

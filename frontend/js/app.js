class AlunoApp {
  constructor() {
    this.apiUrl = "/api/alunos";
    this.editingId = null;
    this.initElements();
    this.bindEvents();
    this.loadAlunos();
  }

  initElements() {
    this.form = document.getElementById("aluno-form");
    this.formTitle = document.getElementById("form-title");
    this.submitBtn = document.getElementById("submit-btn");
    this.cancelBtn = document.getElementById("cancel-btn");
    this.alunosContainer = document.getElementById("alunos-container");

    this.inputs = {
      id: document.getElementById("aluno-id"),
      nome: document.getElementById("nome"),
      curso: document.getElementById("curso"),
      ira: document.getElementById("ira"),
    };
  }

  bindEvents() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
    this.cancelBtn.addEventListener("click", () => this.cancelEdit());
  }

  async handleSubmit(e) {
    e.preventDefault();

    const aluno = {
      nome: this.inputs.nome.value.trim(),
      curso: this.inputs.curso.value.trim(),
      ira: parseFloat(this.inputs.ira.value),
    };

    try {
      if (this.editingId) {
        await this.updateAluno(this.editingId, aluno);
      } else {
        await this.createAluno(aluno);
      }

      this.resetForm();
      this.loadAlunos();
    } catch (error) {
      alert("Erro ao salvar aluno: " + error.message);
    }
  }

  async createAluno(aluno) {
    const response = await fetch(this.apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aluno),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }

    return response.json();
  }

  async updateAluno(id, aluno) {
    const response = await fetch(`${this.apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aluno),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }

    return response.json();
  }

  async deleteAluno(id) {
    if (!confirm("Tem certeza que deseja excluir este aluno?")) {
      return;
    }

    try {
      const response = await fetch(`${this.apiUrl}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }

      this.loadAlunos();
    } catch (error) {
      alert("Erro ao excluir aluno: " + error.message);
    }
  }

  async loadAlunos() {
    try {
      const response = await fetch(this.apiUrl);
      const alunos = await response.json();
      this.renderAlunos(alunos);
    } catch (error) {
      console.error("Erro ao carregar alunos:", error);
      this.alunosContainer.innerHTML =
        '<p class="empty-message">Erro ao carregar alunos</p>';
    }
  }

  renderAlunos(alunos) {
    if (alunos.length === 0) {
      this.alunosContainer.innerHTML =
        '<p class="empty-message">Nenhum aluno cadastrado</p>';
      return;
    }

    this.alunosContainer.innerHTML = alunos
      .map(
        (aluno) => `
            <div class="aluno-card">
                <div class="aluno-info">
                    <h3>${aluno.nome}</h3>
                    <p><strong>Curso:</strong> ${aluno.curso}</p>
                    <p class="ira"><strong>IRA:</strong> ${aluno.ira.toFixed(
                      1
                    )}</p>
                </div>
                <div class="aluno-actions">
                    <button class="edit" onclick="app.editAluno(${
                      aluno.id
                    })">Editar</button>
                    <button class="delete" onclick="app.deleteAluno(${
                      aluno.id
                    })">Excluir</button>
                </div>
            </div>
        `
      )
      .join("");
  }

  editAluno(id) {
    fetch(`${this.apiUrl}/${id}`)
      .then((response) => response.json())
      .then((aluno) => {
        this.editingId = id;
        this.inputs.nome.value = aluno.nome;
        this.inputs.curso.value = aluno.curso;
        this.inputs.ira.value = aluno.ira;

        this.formTitle.textContent = "Editar Aluno";
        this.submitBtn.textContent = "Atualizar";
        this.cancelBtn.style.display = "block";
      })
      .catch((error) => {
        alert("Erro ao carregar dados do aluno");
      });
  }

  cancelEdit() {
    this.resetForm();
  }

  resetForm() {
    this.form.reset();
    this.editingId = null;
    this.formTitle.textContent = "Cadastrar Aluno";
    this.submitBtn.textContent = "Cadastrar";
    this.cancelBtn.style.display = "none";
  }
}

const app = new AlunoApp();

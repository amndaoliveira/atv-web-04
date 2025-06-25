let alunos = [
  { id: 1, nome: "Marcos Silva", curso: "Engenharia de Software", ira: 8.3 },
  { id: 2, nome: "Maria Santos", curso: "Ciência da Computação", ira: 9.2 },
  { id: 3, nome: "Pedro Oliveira", curso: "Sistemas de Informação", ira: 6.8 },
];

let nextId = 4;

class Aluno {
  static getAll() {
    return alunos;
  }

  static getById(id) {
    return alunos.find((aluno) => aluno.id === id);
  }

  static create(dadosAluno) {
    const novoAluno = {
      id: nextId++,
      ...dadosAluno,
    };
    alunos.push(novoAluno);
    return novoAluno;
  }

  static update(id, dadosAluno) {
    const index = alunos.findIndex((aluno) => aluno.id === id);
    if (index === -1) return null;

    alunos[index] = { id, ...dadosAluno };
    return alunos[index];
  }

  static delete(id) {
    const index = alunos.findIndex((aluno) => aluno.id === id);
    if (index === -1) return false;

    alunos.splice(index, 1);
    return true;
  }
}

module.exports = Aluno;

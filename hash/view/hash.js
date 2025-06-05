// hash.js - Simula Hash Extensível (simplificado para visualização)

class Cesto {
  constructor(profundidadeLocal, capacidade) {
    this.profundidadeLocal = profundidadeLocal;
    this.capacidade = capacidade;
    this.itens = [];
  }

  cheio() {
    return this.itens.length >= this.capacidade;
  }

  inserir(chave) {
    if (this.cheio()) return false;
    this.itens.push(chave);
    this.itens.sort((a, b) => a - b);
    return true;
  }

  remover(chave) {
    const index = this.itens.indexOf(chave);
    if (index !== -1) {
      this.itens.splice(index, 1);
      return true;
    }
    return false;
  }

  contem(chave) {
    return this.itens.includes(chave);
  }
}

class Diretorio {
  constructor(capacidadeCesto = 2) {
    this.pg = 1;
    this.capacidadeCesto = capacidadeCesto;
    this.cestos = [new Cesto(1, capacidadeCesto), new Cesto(1, capacidadeCesto)];
  }

  hash(chave) {
    return chave % Math.pow(2, this.pg);
  }

  inserir(chave) {
    let idx = this.hash(chave);
    let cesto = this.cestos[idx];

    if (cesto.contem(chave)) {
      mostrar("Elemento já existe.");
      return;
    }

    if (!cesto.cheio()) {
      cesto.inserir(chave);
    } else {
      this.dividir(idx);
      this.inserir(chave); // tenta de novo
    }
    desenhar();
  }

  dividir(idx) {
    let cestoAntigo = this.cestos[idx];
    let novaPL = cestoAntigo.profundidadeLocal + 1;

    if (novaPL > this.pg) {
      this.pg++;
      let novosCestos = [];
      for (let i = 0; i < Math.pow(2, this.pg); i++) {
        novosCestos[i] = this.cestos[i % this.cestos.length];
      }
      this.cestos = novosCestos;
    }

    let c1 = new Cesto(novaPL, this.capacidadeCesto);
    let c2 = new Cesto(novaPL, this.capacidadeCesto);

    let novoCestos = this.cestos.map((c, i) => {
      if (i % Math.pow(2, novaPL) === idx % Math.pow(2, novaPL)) return c1;
      else return c2;
    });

    let dados = [...cestoAntigo.itens];
    this.cestos = novoCestos;
    dados.forEach(e => this.inserir(e));
  }

  remover(chave) {
    let idx = this.hash(chave);
    if (this.cestos[idx].remover(chave)) mostrar("Removido com sucesso.");
    else mostrar("Chave não encontrada.");
    desenhar();
  }

  buscar(chave) {
    let idx = this.hash(chave);
    if (this.cestos[idx].contem(chave)) mostrar("Encontrado em " + idx);
    else mostrar("Não encontrado");
  }
}

// Visualização simples com canvas
let diretorio = new Diretorio();

function inserir() {
  const chave = parseInt(document.getElementById('inputChave').value);
  if (!isNaN(chave)) diretorio.inserir(chave);
}

function remover() {
  const chave = parseInt(document.getElementById('inputChave').value);
  if (!isNaN(chave)) diretorio.remover(chave);
}

function buscar() {
  const chave = parseInt(document.getElementById('inputChave').value);
  if (!isNaN(chave)) diretorio.buscar(chave);
}

function mostrar(msg) {
  document.getElementById("resultado").innerText = msg;
}

function desenhar() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 1000;
  canvas.height = 300;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const cestos = diretorio.cestos;
  for (let i = 0; i < cestos.length; i++) {
    let x = 50 + i * 150;
    ctx.strokeRect(x, 50, 100, 100);
    ctx.fillText("Cesto " + i, x + 10, 45);
    cestos[i].itens.forEach((el, j) => {
      ctx.fillText(el, x + 10, 70 + j * 20);
    });
  }
}

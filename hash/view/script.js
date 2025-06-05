let profundidadeGlobal = 2;
let capacidadeCesto = 3;

let diretorio = [];
let buckets = [];

function criarEstruturaInicial() {
  diretorio = [];
  buckets = [];
  const qtd = Math.pow(2, profundidadeGlobal);
  for (let i = 0; i < qtd; i++) {
    const b = {
      pl: profundidadeGlobal,
      itens: [],
      id: i
    };
    buckets.push(b);
    diretorio.push({ bin: i.toString(2).padStart(profundidadeGlobal, '0'), bucket: b });
  }
  renderizar();
}

function inserir() {
  const chave = parseInt(document.getElementById("chave").value);
  if (isNaN(chave)) return;

  const hash = chave % Math.pow(2, profundidadeGlobal);
  const bin = hash.toString(2).padStart(profundidadeGlobal, '0');
  const bucket = diretorio[hash].bucket;

  document.getElementById("explicacao").innerText =
    `hash = ${chave} % 2^${profundidadeGlobal} = ${hash} → diretório binário ${bin}`;

  if (bucket.itens.length < capacidadeCesto) {
    bucket.itens.push(chave);
  } else {
    alert("Ainda não cabe (bucket cheio). Divisão seria necessária.)");
  }
  renderizar();
}

function limpar() {
  criarEstruturaInicial();
  document.getElementById("explicacao").innerText = "";
  document.getElementById("chave").value = "";
}

function renderizar() {
  const dirDiv = document.getElementById("diretorio");
  const bucketDiv = document.getElementById("buckets");
  const setaSvg = document.getElementById("svg-setas");
  document.getElementById("pg-label").innerText = `(p = ${profundidadeGlobal})`;

  dirDiv.innerHTML = "";
  bucketDiv.innerHTML = "";
  setaSvg.innerHTML = "";

  diretorio.forEach((entry, i) => {
    const d = document.createElement("div");
    d.innerText = `${entry.bin}`;
    dirDiv.appendChild(d);
  });

  buckets.forEach((b, i) => {
    const wrap = document.createElement("div");
    wrap.className = "bucket";
    wrap.innerHTML = `<p>p' = ${b.pl}</p><p>${b.itens.join(" | ") || "(vazio)"}</p>`;
    bucketDiv.appendChild(wrap);
  });
}

criarEstruturaInicial();

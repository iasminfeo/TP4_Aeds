# Visualização Interativa da Tabela Hash Extensível

## 📌 O que o trabalho faz?

Este trabalho implementa uma **visualização interativa de uma Tabela Hash Extensível**, simulando visualmente o funcionamento da estrutura de dados estudada na disciplina. A aplicação permite inserir chaves e observar como elas são armazenadas nos buckets com base no hash calculado, seguindo a profundidade global `p`. Além disso, exibe claramente o cálculo da função hash (`chave % 2^p`) e o mapeamento para o diretório binário correspondente. A interface foi inspirada em um exemplo visual de aula para se aproximar ao máximo da representação utilizada.

---

## 👥 Participantes

- **Iasmin Oliveira**
- **Cauã Costa**
- **Andriel Mark**


---

## 🧱 Estrutura do Projeto

O projeto está dividido em três arquivos principais:

### `index.html`

- Estrutura da página com:
  - Campo de inserção de chave;
  - Botões de controle;
  - Áreas para visualização do diretório, buckets e explicação do hash.

### `style.css`

- Responsável por:
  - Estilização das áreas de diretório e buckets;
  - Layout responsivo e limpo;
  - Destaques para profundidade, setas e mensagens informativas.

### `script.js`

Contém a lógica do funcionamento da Tabela Hash Extensível.

#### Classes e Funções principais:

- **`criarEstruturaInicial()`**
  - Inicializa o diretório com profundidade global `p`.
  - Cria os buckets e mapeia-os para entradas binárias do diretório.

- **`inserir()`**
  - Realiza a operação de `hash = chave % 2^p`;
  - Verifica se há espaço no bucket;
  - Exibe o cálculo e insere o valor se possível;
  - Alerta quando o bucket está cheio (simulação da divisão futura).

- **`renderizar()`**
  - Atualiza a visualização do diretório e buckets;
  - Recalcula e redesenha todos os elementos na tela.

- **`limpar()`**
  - Reinicializa toda a estrutura para recomeçar a simulação.

---

## 🧪 Relato da Experiência

O desenvolvimento do TP foi desafiador e ao mesmo tempo enriquecedor. Inicialmente, a lógica da Tabela Hash Extensível foi compreendida a partir do código Java fornecido, que usa arquivos binários e manipulação de bytes. Para a visualização interativa, essa lógica foi adaptada para JavaScript, respeitando o comportamento conceitual da estrutura, porém trabalhando totalmente em memória.

A interface foi inspirada no modelo apresentado em aula, priorizando clareza e didática na exibição da profundidade global, diretório binário e buckets. Um dos desafios foi representar visualmente a ligação entre o diretório e os buckets, bem como garantir que a simulação dos cálculos do hash fosse fiel e compreensível.

Apesar das limitações do ambiente web quanto a manipulação de arquivos, todos os requisitos funcionais foram representados de maneira equivalente.

---

## ✅ Checklist

- [x] A visualização interativa da Tabela Hash Extensível foi criada?
- [x] Há um vídeo de até 2 minutos demonstrando o uso da visualização?
- [x] O trabalho está funcionando corretamente?
- [x] O trabalho está completo?
- [x] O trabalho é original e não a cópia de um trabalho de um colega?

---

## 🔗 Como executar

1. Clone o repositório ou baixe o ZIP.
2. Extraia o conteúdo e abra o arquivo `index.html` em qualquer navegador moderno.
3. Insira valores e observe o funcionamento da tabela hash extensível.

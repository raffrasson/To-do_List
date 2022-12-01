// funcionalidade de seleção (marcação em cinza)

function seleciona(evento) {
  for (let index = 0; index < itens.length; index += 1) {
    itens[index].classList.remove('selecionado');
  }

  evento.target.classList.toggle('selecionado');
}

// funcionalidade de riscar:
// adiciona listener de dois cliques aos itens da lista:

function risca(evento) {
  if (evento.target.classList.contains('completed')) {
    evento.target.classList.remove('completed');
  } else {
    evento.target.classList.add('completed');
  }
}

// funcionalidade de apagar tudo:

function apagaTudo() {
  document.getElementById('lista-tarefas').innerText = '';
}

// funcionalidade de apagar finalizado:

function apagaFinalizado() {
  const elementos = document.getElementsByClassName('completed');
  for (let index = 0; index < elementos.length; index += 1) {
    document.querySelector('.completed').innerText = '';
  }
}

// funcionalidade de salvar lista:

function salvaLista() {
  const tarefasDaLista = document.getElementById('lista-tarefas').children; // pega os nós que estão na lista
  for (let index = 0; index < tarefasDaLista.length; index += 1) {
    // loop para guardar o conteúdo de cada elemento num item de localStorage
    if (
      document
        .getElementById('lista-tarefas')
        .children[index].classList.contains('completed')
    ) {
      // separa os completos para adição posterior da classe "completed"
      localStorage.setItem(
        `completed${[index]}`,
        tarefasDaLista[index].innerText,
      );
    } else {
      localStorage.setItem(index, tarefasDaLista[index].innerText);
    }
  }
}

// funcionalidade de carregar lista:

function carregaLista() {
  const tarefasDaLista = window.localStorage;
  for (let index = 0; index < tarefasDaLista.length; index += 1) {
    if (localStorage.getItem(index)) { // adiciona os itens sem classe "completed"
      const storage = localStorage.getItem(index);
      const newItem = document.createElement('li');
      newItem.append(storage);
      document.getElementById('lista-tarefas').appendChild(newItem);
    }
    if (localStorage.getItem(`completed${index}`)) {
      // adiciona os itens com classe "completed"
      const storage = localStorage.getItem(`completed${index}`);
      const newItem = document.createElement('li');
      newItem.append(storage);
      newItem.classList.add('completed');
      document.getElementById('lista-tarefas').appendChild(newItem);
    }
    return tarefasDaLista;
  }
}

window.onload = carregaLista(); // carrega a lista ao abrir a página

// funcionalidade de subir/descer:

// uma é "o oposto" da outra.

function sobe() {
  // o que será feito é uma sequência de troca de valores. O elemento anterior "se transformará" no selecionado ao adquirir seu valor e vice versa:
  if (document.querySelector('.selecionado') == null) {
    // se não existe elemento selecionado, nada acontece
  } else if (
    document.querySelector('.selecionado').previousSibling.innerText
    === undefined
  ) {
    // se não existe elemento anterior, nada acontece
  } else {
    const selecionado = document.querySelector('.selecionado'); // o elemento selecionado.
    const anterior = document.querySelector('.selecionado').previousSibling; // o elemento de cima, que será transformado no selecionado.
    const valorSelecionado = selecionado.innerText; // guarda valor do elemento selecionado para transformação.
    const valorAnterior = anterior.innerText; // guarda valor do elemento de cima para transformação.
    selecionado.innerText = valorAnterior; // faz o texto do selecionado se transformar no do anterior...
    anterior.innerText = valorSelecionado; // ...e vice-versa.
    selecionado.classList.remove('selecionado'); // tira a classe do selecionado...
    anterior.classList.add('selecionado'); // ...e joga para o elemento de cima
  }
}

function desce() {
  // mesma lógica que a função de subir, mas no outro sentido
  if (document.querySelector('.selecionado') == null) {
  } else if (document.querySelector('.selecionado').nextSibling == null) {
  } else {
    const selecionado = document.querySelector('.selecionado');
    const posterior = document.querySelector('.selecionado').nextSibling;
    const valorSelecionado = selecionado.innerText;
    const valorPosterior = posterior.innerText;
    selecionado.innerText = valorPosterior;
    posterior.innerText = valorSelecionado;
    selecionado.classList.remove('selecionado');
    posterior.classList.add('selecionado');
  }
}

// variável que armazena os itens da lista:

const itens = document.getElementsByTagName('li');

// função para capturar o valor num novo item de lista e limpar o input:
// referência utilizada: https://www.w3schools.com/jsref/prop_text_value.asp

function criarTarefa() {
  const novaTarefa = document.getElementById('texto-tarefa').value; // captura a entrada do usuário
  const itemLista = document.createElement('li'); // cria o item da lista ao qual a tarefa será adicionada
  const textoTarefa = document.createTextNode(novaTarefa); // cria um nó de texto com a entrada do usuário para ser adicionado ao item da lista
  itemLista.appendChild(textoTarefa); // fixa o nó criado ao item da lista
  document.getElementById('lista-tarefas').appendChild(itemLista); // adiciona o item lista na lista de tarefas
  document.getElementById('texto-tarefa').value = null; // limpa a entrada do usuário
  itemLista.addEventListener('click', seleciona); // adiciona listener para a funcionalidade de selecionar (marcar em cinza) um item
  itemLista.addEventListener('dblclick', risca); // adiciona listener para a funcionalidade de riscar um item
}

// funcionalidade de remover selecionado:

function removeSelecionado() {
  document.querySelector('.selecionado').remove();
}

// variáveis dos botões e listener para os cliques:

const botaoCria = document.getElementById('criar-tarefa');
botaoCria.addEventListener('click', criarTarefa);

const botaoApaga = document.getElementById('apaga-tudo');
botaoApaga.addEventListener('click', apagaTudo);

const botaoApagaFinalizado = document.getElementById('remover-finalizados');
botaoApagaFinalizado.addEventListener('click', apagaFinalizado);

const botaoSalvar = document.getElementById('salvar-tarefas');
botaoSalvar.addEventListener('click', salvaLista);

const botaoSobe = document.getElementById('mover-cima');
botaoSobe.addEventListener('click', sobe);

const botaoDesce = document.getElementById('mover-baixo');
botaoDesce.addEventListener('click', desce);

const botaoRemoveSelecionado = document.getElementById('remover-selecionado');
botaoRemoveSelecionado.addEventListener('click', removeSelecionado);

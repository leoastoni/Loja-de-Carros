document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.carros-container');
  if (!container) return;

  fetch('/api/carros')
    .then(res => res.json())
    .then(carros => {
      container.innerHTML = '';
      carros.forEach(carro => {
        const div = document.createElement('div');
        div.className = 'galeria-carros';
        div.style.cursor = 'pointer';
        div.setAttribute('data-id', carro.id);
        div.innerHTML = `
          <img src="${carro.imagem}" alt="${carro.nome}" />
          <h2>${carro.nome}</h2>
          <p>Ano: ${carro.ano}</p>
          <p>Preço: ${carro.preco}</p>
        `;
        div.addEventListener('click', () => {
          window.location.href = `/html/detalhescarros.html?id=${carro.id}`;
        });
        container.appendChild(div);
      });
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.carros-container');
  const inputPesquisa = document.getElementById('pesquisa-nome');
  const filtroAno = document.getElementById('filtro-ano');
  const filtroPreco = document.getElementById('filtro-preco');

  let todosCarros = [];

  function renderizarCarros(carros) {
    container.innerHTML = '';
    carros.forEach(carro => {
      const div = document.createElement('div');
      div.className = 'galeria-carros';
      div.style.cursor = 'pointer';
      div.setAttribute('data-id', carro.id);
      div.innerHTML = `
        <img src="${carro.imagem}" alt="${carro.nome}" />
        <h2>${carro.nome}</h2>
        <p>Ano: ${carro.ano}</p>
        <p>Preço: ${carro.preco}</p>
      `;
      div.addEventListener('click', () => {
        window.location.href = `/html/detalhescarros.html?id=${carro.id}`;
      });
      container.appendChild(div);
    });
  }

  function aplicarFiltros() {
    let filtrados = todosCarros;


    const texto = inputPesquisa.value.trim().toLowerCase();
    if (texto) {
      filtrados = filtrados.filter(carro =>
        carro.nome.toLowerCase().includes(texto)
      );
    }


    const ano = filtroAno.value;
    if (ano) {
      filtrados = filtrados.filter(carro =>
        carro.ano.includes(ano)
      );
    }


    const preco = filtroPreco.value;
    if (preco) {
      filtrados = filtrados.filter(carro => {

        const precoNum = Number(String(carro.preco).replace(/\D/g, ''));
        if (preco === "0-200000") return precoNum <= 200000;
        if (preco === "200001-500000") return precoNum > 200000 && precoNum <= 500000;
        if (preco === "500001-1000000") return precoNum > 500000 && precoNum <= 1000000;
        if (preco === "1000001") return precoNum > 1000000;
        return true;
      });
    }

    renderizarCarros(filtrados);
  }

  fetch('/api/carros')
    .then(res => res.json())
    .then(carros => {
      todosCarros = carros;
      aplicarFiltros();
    });

  inputPesquisa.addEventListener('input', aplicarFiltros);
  filtroAno.addEventListener('change', aplicarFiltros);
  filtroPreco.addEventListener('change', aplicarFiltros);
});
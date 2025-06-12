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
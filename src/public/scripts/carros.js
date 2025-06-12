document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('filme-form');
  const tbody = document.getElementById('filmes-tbody');

  // Carregar carros cadastrados
  function carregarCarros() {
    fetch('/api/carros')
      .then(res => res.json())
      .then(carros => {
        tbody.innerHTML = '';
        carros.forEach(carro => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${carro.nome}</td>
            <td>${carro.marca}</td>
            <td>${carro.ano}</td>
            <td>${carro.km}</td>
            <td><img src="${carro.imagem}" class="filme-imagem" style="max-width:60px"></td>
            <td>${carro.info}</td>
          `;
          tbody.appendChild(tr);
        });
      });
  }

  carregarCarros();

  // Cadastro de novo carro
  form.addEventListener('submit', e => {
    e.preventDefault();
    const novoCarro = {
      nome: form.nome.value,
      marca: form.marca.value,
      ano: form.ano.value,
      km: form.km.value,
      preco: form.preco.value,
      imagem: form.imagem.value,
      info: form.info.value
    };
    fetch('/api/carros', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoCarro)
    })
      .then(res => res.json())
      .then(() => {
        form.reset();
        carregarCarros();
      });
  });
});
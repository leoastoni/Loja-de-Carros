document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('filme-form');
  const tbody = document.getElementById('filmes-tbody');

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
            <td>
              <button class="btn-editar" data-id="${carro.id}">Editar</button>
              <button class="btn-excluir" data-id="${carro.id}">Excluir</button>
            </td>
          `;
          tbody.appendChild(tr);
        });

        tbody.querySelectorAll('.btn-excluir').forEach(btn => {
          btn.addEventListener('click', function () {
            const id = this.getAttribute('data-id');
            if (confirm('Tem certeza que deseja excluir este carro?')) {
              fetch(`/api/carros/${id}`, { method: 'DELETE' })
                .then(res => {
                  if (res.ok) carregarCarros();
                  else alert('Erro ao excluir carro.');
                });
            }
          });
        });

        tbody.querySelectorAll('.btn-editar').forEach(btn => {
          btn.addEventListener('click', function () {
            const id = this.getAttribute('data-id');
            window.location.href = `/html/editarcarro.html?id=${id}`;
          });
        });
      });
  }

  carregarCarros();

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
      .then(res => {
        if (res.ok) {
          form.reset();
          carregarCarros();
        } else {
          alert('Erro ao cadastrar carro.');
        }
      });
  });
});
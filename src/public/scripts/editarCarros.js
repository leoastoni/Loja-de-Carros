document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const form = document.getElementById('editar-form');

  if (!id) {
    alert('ID do carro não informado!');
    window.location.href = '/html/carros.html';
    return;
  }


  fetch(`/api/carros/${id}`)
    .then(res => res.json())
    .then(carro => {
      form.carroId.value = carro.id;
      form.nome.value = carro.nome;
      form.marca.value = carro.marca;
      form.ano.value = carro.ano;
      form.km.value = carro.km;
      form.preco.value = carro.preco;
      form.imagem.value = carro.imagem;
      form.info.value = carro.info;
    });


  form.addEventListener('submit', e => {
    e.preventDefault();
    const carroAtualizado = {
      nome: form.nome.value,
      marca: form.marca.value,
      ano: form.ano.value,
      km: form.km.value,
      preco: form.preco.value,
      imagem: form.imagem.value,
      info: form.info.value
    };
    fetch(`/api/carros/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(carroAtualizado)
    })
      .then(res => {
        if (res.ok) {
          alert('Carro atualizado com sucesso!');
          window.location.href = '/html/carros.html';
        } else {
          alert('Erro ao atualizar carro.');
        }
      });
  });
});
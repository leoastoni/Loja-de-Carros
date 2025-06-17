document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) return;

  fetch(`/api/carros/${id}`)
    .then(res => res.json())
    .then(carro => {
      document.querySelector('.nome-item').textContent = carro.nome;
      document.querySelector('.imagem-item').src = carro.imagem;
      document.querySelector('.imagem-item').alt = carro.nome;
      document.querySelector('.marca-item').textContent = carro.marca;
      document.querySelector('.ano-item').textContent = carro.ano;
      document.querySelector('.quilometragem-item').textContent = carro.km;
      document.querySelector('.preco-item').textContent = carro.preco;
      document.querySelector('.info-item').textContent = carro.info;
    });
});
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../src/public')));

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

const fs = require('fs');
const carrosPath = path.join(__dirname, '../src/db/carros.json');

// Middleware para aceitar JSON
app.use(express.json());

// Listar todos os carros
app.get('/api/carros', (req, res) => {
  fs.readFile(carrosPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ erro: 'Erro ao ler o arquivo' });
    const carros = data ? JSON.parse(data) : [];
    res.json(carros);
  });
});

// Cadastrar novo carro
app.post('/api/carros', (req, res) => {
  fs.readFile(carrosPath, 'utf8', (err, data) => {
    let carros = data ? JSON.parse(data) : [];
    const novoCarro = { id: Date.now(), ...req.body };
    carros.push(novoCarro);
    fs.writeFile(carrosPath, JSON.stringify(carros, null, 2), err => {
      if (err) return res.status(500).json({ erro: 'Erro ao salvar' });
      res.status(201).json(novoCarro);
    });
  });
});

// Buscar carro por ID
app.get('/api/carros/:id', (req, res) => {
  fs.readFile(carrosPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ erro: 'Erro ao ler o arquivo' });
    const carros = data ? JSON.parse(data) : [];
    const carro = carros.find(c => String(c.id) === req.params.id);
    if (!carro) return res.status(404).json({ erro: 'Carro não encontrado' });
    res.json(carro);
  });
});
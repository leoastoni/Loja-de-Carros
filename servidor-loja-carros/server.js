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


app.use(express.json());
app.use('/db', express.static(path.join(__dirname, '../src/db')));

app.get('/api/carros', (req, res) => {
  fs.readFile(carrosPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ erro: 'Erro ao ler o arquivo' });
    const carros = data ? JSON.parse(data) : [];
    res.json(carros);
  });
});

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

app.get('/api/carros/:id', (req, res) => {
  fs.readFile(carrosPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ erro: 'Erro ao ler o arquivo' });
    const carros = data ? JSON.parse(data) : [];
    const carro = carros.find(c => String(c.id) === req.params.id);
    if (!carro) return res.status(404).json({ erro: 'Carro não encontrado' });
    res.json(carro);
  });
});

const usuariosPath = path.join(__dirname, '../src/db/usuarios.json');

app.get('/api/usuarios', (req, res) => {
  fs.readFile(usuariosPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ erro: 'Erro ao ler o arquivo' });
    const usuarios = data ? JSON.parse(data) : { usuarios: [] };
    res.json(usuarios);
  });
});

app.post('/api/usuarios', (req, res) => {
  fs.readFile(usuariosPath, 'utf8', (err, data) => {
    let usuariosObj = data ? JSON.parse(data) : { usuarios: [] };
    const novoUsuario = req.body;
    usuariosObj.usuarios.push(novoUsuario);
    fs.writeFile(usuariosPath, JSON.stringify(usuariosObj, null, 2), err => {
      if (err) return res.status(500).json({ erro: 'Erro ao salvar' });
      res.status(201).json(novoUsuario);
    });
  });
});

app.delete('/api/carros/:id', (req, res) => {
  fs.readFile(carrosPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ erro: 'Erro ao ler o arquivo' });
    let carros = data ? JSON.parse(data) : [];
    const id = req.params.id;
    const carrosFiltrados = carros.filter(c => String(c.id) !== id);
    if (carros.length === carrosFiltrados.length) {
      return res.status(404).json({ erro: 'Carro não encontrado' });
    }
    fs.writeFile(carrosPath, JSON.stringify(carrosFiltrados, null, 2), err => {
      if (err) return res.status(500).json({ erro: 'Erro ao salvar' });
      res.status(204).end();
    });
  });
});

app.put('/api/carros/:id', (req, res) => {
  fs.readFile(carrosPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ erro: 'Erro ao ler o arquivo' });
    let carros = data ? JSON.parse(data) : [];
    const id = req.params.id;
    const idx = carros.findIndex(c => String(c.id) === id);
    if (idx === -1) return res.status(404).json({ erro: 'Carro não encontrado' });
    carros[idx] = { ...carros[idx], ...req.body, id: carros[idx].id };
    fs.writeFile(carrosPath, JSON.stringify(carros, null, 2), err => {
      if (err) return res.status(500).json({ erro: 'Erro ao salvar' });
      res.json(carros[idx]);
    });
  });
});
const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

const contatos = [
  {
    id: 1,
    nome: 'Julia',
    email: 'julia@email.com'
  }
];

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

// Listar contatos
app.get('/contatos', (req, res) => {
  res.json(contatos);
});

// Criar contato
app.post('/contatos', (req, res) => {
  const { nome, email } = req.body;

  const contato = {
    id: contatos.length + 1,
    nome,
    email
  };

  contatos.push(contato);

  res.status(201).json(contato);
});

// Atualizar contato
app.put('/contatos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  const contatoIndex = contatos.findIndex(
    contato => contato.id === id
  );

  if (contatoIndex !== -1) {
    const updatedContato = {
      id,
      ...req.body
    };

    contatos[contatoIndex] = updatedContato;

    res.json(updatedContato);
  } else {
    res.status(404).send('Contato não encontrado');
  }
});

// Excluir contato
app.delete('/contatos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  const contatoIndex = contatos.findIndex(
    contato => contato.id === id
  );

  if (contatoIndex !== -1) {
    contatos.splice(contatoIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Contato não encontrado');
  }
});

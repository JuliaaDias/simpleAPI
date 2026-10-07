const express = require('express');

const app = express();

const port = 3000;

app.use(express.json());

app.listen(port, () => {

console.log(`Servidor rodando em http://localhost:${port}`);

});

const items = [

{ id: 1, name: 'Item 1' },

{ id: 2, name: 'Item 2' },

];

app.get('/items', (req, res) => {

res.json(items);

});

app.post('/items', (req, res) => {

const newItem = req.body;

newItem.id = items.length + 1;

items.push(newItem);

res.status(201).json(newItem);

});

app.put('/items/:id', (req, res) => {

const id = parseInt(req.params.id, 10);

const itemIndex = items.findIndex(item => item.id === id);

if (itemIndex !== -1) {

const updatedItem = { id, ...req.body };

items[itemIndex] = updatedItem;

res.json(updatedItem);

} else {

res.status(404).send('Item não encontrado');

}

});

app.delete('/items/:id', (req, res) => {

const id = parseInt(req.params.id, 10);

const itemIndex = items.findIndex(item => item.id === id);

if (itemIndex !== -1) {

items.splice(itemIndex, 1);

res.status(204).send();

} else {

res.status(404).send('Item não encontrado');

}

});
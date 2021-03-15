const express = require("express");

const AccountsRouter = require('./accounts/accounts-router');

const server = express();

server.use(express.json());

server.use('/api/accounts', AccountsRouter);

server.get('/', (req, res) => {
    res.json({ message: 'up and running 😁' });
});

module.exports = server;

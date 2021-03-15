const express = require('express');
const Accounts = require('./accounts-model');
const router = require('express').Router();
const { checkAccountPayload, checkAccountNameUnique, checkAccountId } = require('./accounts-middleware');

router.get('/', (req, res, next) => {
  Accounts.getAll()
  .then(account => {
    res.status(200).json(account);
  })
  .catch(err => {
    res.status(500).json({ message: 'Something went wrong fetching all' });
  })
});

router.get('/:id', checkAccountId, (req, res, next) => {
  res.json(req.account);
});

router.post('/', checkAccountPayload, async (req, res, next) => {
  try {
    const data = await Accounts.create(req.body);
    res.status(200).json(data);
  } catch {
    res.status(500).json({ message: 'something went wrong adding this account' });
  }
});

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.use((err, req, res, next) => { // eslint-disable-line
  // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
  res.status(500).json({
    message: 'something went wrong inside the accounts router',
    errMessage: err.message,
  })
});

module.exports = router;

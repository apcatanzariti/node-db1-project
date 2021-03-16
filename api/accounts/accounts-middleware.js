const dbConfig = require('../../data/db-config');
const Accounts = require('./accounts-model');


// this still needs some more work, but functions for now
const checkAccountPayload = (req, res, next) => {
  const name = req.body.name.trim();
  const budget = req.body.budget;

  if (!name || !budget) {
    res.status(400).json({ message: 'name and budget required' });
  } else if (typeof name !== 'string') {
    res.status(400).json({ message: 'name of account must be a string' });
  } else if (name.length < 3 || name.length > 100) {
    res.status(400).json({ message: 'name of account must be between 3 and 100' });
  } else if (typeof budget !== 'number') {
    res.status(400).json({ message: 'budget of account must be a number' });
  } else if (budget < 0 || budget > 1000000) {
    res.status(400).json({ message: 'budget of account is too large or too small' });
  } else {
    next();
  }
};

const checkAccountNameUnique = async (req, res, next) => {
    const test = await Accounts.getByName(req.body.name);
    const name = req.body.name.trim();

    if (test[0].name.trim() === name) {
      res.status(400).json({ message: 'that name is taken' });
    } else {
      next();
    }
};

const checkAccountId = async (req, res, next) => {
  try {
    const account = await Accounts.getById(req.params.id);
    if (!account) {
      res.status(404).json('account not found');
    } else {
      req.account = account;
      next();
    }
  } catch {
    res.status(500).json({ message: 'uh oh, there was an error when checking the ID' });
  }
};

module.exports = {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId
};

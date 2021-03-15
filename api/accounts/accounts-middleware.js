const dbConfig = require('../../data/db-config');
const Accounts = require('./accounts-model');


// this still needs some more work, but functions for now
const checkAccountPayload = (req, res, next) => {
  if (!req.body.name || !req.body.budget) {
    res.status(400).json({ message: 'name and budget required' });
  } else {
    next();
  }
};

const checkAccountNameUnique = async (req, res, next) => {
  try {
    const account = await Accounts.get(req.body.name.trim());
    if (account) {
      res.status(400).res.json({ message: 'that name is taken' });
    } else {
      req.account = account;
      next();
    }
  } catch {
    res.status(500).json({ message: 'something went wrong checking the name' });
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

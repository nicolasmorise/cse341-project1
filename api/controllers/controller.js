const express = require('express');
const app = express();

const models = require('../models/models')

const hello_world = (req, res, next) => {
  try {
    res.send('Hello World');
  } catch (err) {
    next(err);
  }
};

const getContacts = async (req, res, next) => {
    try{
        const data = await models.getContactsData();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(data);
    } catch(err) {
        next(err);
    }
};

const getSingleContacts = async (req, res, next) => {
    try {
        const id = req.params.id;
        const contact = await models.getContactSingleData(id);
        if (!contact) return res.status(404).json({ error: 'Contact not found' });
        res.status(200).json(contact);
    } catch (err) {
        next(err);
    }
};

const createUsers = async (req, res, next) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    const result = await models.createUser(contact);

     if (result.acknowledged) {
      res.status(201).json({ message: 'User created successfully', id: result.insertedId });
    } else {
      res.status(500).json({ error: 'Failed to create user' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateContacts(req, res) {
  try {
    const userId = req.params.id;

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    const result = await models.updateContact(userId, contact);

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    if (result.modifiedCount === 0) {
      return res.status(200).json({ message: 'No changes made' });
    }

    res.status(200).json({ message: 'Contact updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteContacts(req, res, next) {
    try {
      const id = req.params.id;
      const result = await models.deleteContact(id);
      if (result.deletedCount === 0){
        return res.status(404).json({ error: 'Contact not found' });
      } 
      res.status(200).json({message: 'Contact Deleted successfully'});
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};



module.exports = { hello_world, getContacts, getSingleContacts, createUsers, updateContacts, deleteContacts };

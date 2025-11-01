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



module.exports = { hello_world, getContacts, getSingleContacts };

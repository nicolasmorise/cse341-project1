const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');


// Get all contacts data
async function getContactsData() {
    const db = mongodb.getDb().db('project');
    const result = await db.collection('contacts').find();
    const contacts = await result.toArray();
    return contacts;
}

// Get data from one single contact through id
async function getContactSingleData(id) {
    if (!id || !ObjectId.isValid(id)) return null;
    const db = mongodb.getDb().db('project');
    return await db.collection('contacts').findOne({ _id: new ObjectId(id) });
}

// Create a contact
async function createUser(contact) {
    const db = mongodb.getDb().db('project');
    const result = await db.collection('contacts').insertOne(contact);
    return result;
}

// Update the contact
async function updateContact(id, contact) {
    const db = mongodb.getDb().db('project');
    const result = db.collection('contacts').replaceOne({_id: new ObjectId(id)}, contact);
    return result;
}

// Delete a contact
async function deleteContact(id) {
    const db = mongodb.getDb().db('project');
    const result = await db.collection('contacts').deleteOne({_id: new ObjectId(id)});
    return result;
}

module.exports = { getContactsData, getContactSingleData, createUser, updateContact, deleteContact};
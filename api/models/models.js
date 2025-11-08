const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');

async function getContactsData() {
    const db = mongodb.getDb().db('project');
    const result = await db.collection('contacts').find();
    const contacts = await result.toArray();
    return contacts;
}

async function getContactSingleData(id) {
    if (!id || !ObjectId.isValid(id)) return null;
    const db = mongodb.getDb().db('project');
    return await db.collection('contacts').findOne({ _id: new ObjectId(id) });
}

async function createUser(contact) {
    const db = mongodb.getDb().db('project');
    const result = await db.collection('contacts').insertOne(contact);
    return result;
}

async function updateContact(id, contact) {
    const db = mongodb.getDb().db('project');
    const result = db.collection('contacts').replaceOne({_id: new ObjectId(id)}, contact);
    return result;
}

async function deleteContact(id) {
    const db = mongodb.getDb().db('project');
    const result = await db.collection('contacts').deleteOne({_id: new ObjectId(id)});
    return result;
}

module.exports = { getContactsData, getContactSingleData, createUser, updateContact, deleteContact};
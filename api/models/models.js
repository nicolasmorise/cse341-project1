const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');

async function getContactsData() {
    const db = mongodb.getDb().db('project');
    const result = await db.collection('contacts').find();
    const contacts = await result.toArray();
    return contacts;
}

// model
async function getContactSingleData(id) {
    if (!id || !ObjectId.isValid(id)) return null;
    const db = mongodb.getDb().db('project');
    return await db.collection('contacts').findOne({ _id: new ObjectId(id) });
}



module.exports = { getContactsData, getContactSingleData };
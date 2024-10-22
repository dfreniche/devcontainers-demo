// function to connect to mongodb and do CRUD functions using a URI without mongoose 
const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017/contactsDB'; // Replace with your MongoDB URI
const client = new MongoClient(uri);

// Connect to MongoDB
async function connectToMongoDB() {
    if (client !== null) {
        return;
    }

    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

// CRUD functions
async function createDocument(collectionName, document) {
    const collection = client.db().collection(collectionName);
    const result = await collection.insertOne(document);
    return result.acknowledged ? result.insertedId : null;
}

async function readDocuments(collectionName, filter = {}) {
    const collection = client.db().collection(collectionName);
    const documents = await collection.find(filter).toArray();
    return documents;
}

async function updateDocument(collectionName, filter, update) {
    const collection = client.db().collection(collectionName);
    const result = await collection.updateOne(filter, { $set: update });
    console.log('Document updated:', result.modifiedCount);
}

async function deleteDocument(collectionName, filter) {
    const collection = client.db().collection(collectionName);
    const result = await collection.deleteOne(filter);
    console.log('Document deleted:', result.deletedCount);
}

// export all functions
module.exports = {
    connectToMongoDB,
    createDocument,
    readDocuments,
    updateDocument,
    deleteDocument,
    client
};


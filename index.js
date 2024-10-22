const express = require('express');
const { client, createDocument, readDocuments, connectToMongoDB, deleteDocument } = require('./mongodb');
var ObjectId = require('mongodb').ObjectId; 

// Express app listening on port 3000
const app = express();
app.use(express.json());

const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/contacts', async (req, res) => {
    var message = "<h1>Contacts</h1>";
    await connectToMongoDB();
    // Perform CRUD operations
    // await createDocument("mycollection", { name: "John", age: 30 });
    const documents = await readDocuments("mycollection");
    console.log('Documents:', documents);

    message = message + JSON.stringify(documents);    
    res.send(message);
});

app.post('/contacts', async (req, res) => {
    console.log(req.headers['content-type']);
    var message = "Hello World!";
    await connectToMongoDB();
    // Insert a doc
    const insertedId = await createDocument("mycollection", { name: req.body.name, age: req.body.age });
 
    // updateDocument("mycollection", { name: "John" }, { age: 31 });
    // deleteDocument("mycollection", { name: "John" });
    
    res.send("Inserted doc with _id " + insertedId);
});

app.delete("/contacts/:id", async (req, res) => {
  var message = "Deleted " + req.params.id;
  console.log(req.params.id);
  await connectToMongoDB();
 
  await deleteDocument("mycollection", { _id: new ObjectId(req.params.id) });
  message = message + " all OK";
  res.send(message);
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
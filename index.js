const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = 3000;
require("dotenv").config();
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster01.re7h9hf.mongodb.net/?appName=Cluster01`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();

    const db = client.db("book-db");
    const bookCollection = db.collection("books");

    //* 1 see all the data in browser for models
    app.get("/books", async (req, res) => {
      const result = await bookCollection.find().toArray();
      res.send(result);
    });

    //* post the data
    app.post("/books", async (req, res) => {
      const data = req.body;
      // console.log(data)
      const result = await bookCollection.insertOne(data);
      res.send({
        success: true,
        result,
      });
    });

    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("tajwar-server is running fine!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

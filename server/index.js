const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb');

const cors = require('cors')
require('dotenv').config()
const port = 3001

// middleware
app.use(
  cors({
    origin: ["http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
    credentials: true,
  })
);
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ts8x6gb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // notes
    const religiousCollection = client.db('primaryNotes').collection('religiousNotes')
    const usersCollection = client.db('primaryNotes').collection('users')
    
    // notes
    app.get('/allreligiousnotes', async(req, res) =>{
      const resul = await religiousCollection.find().toArray();
      res.send(resul)
    })
   
    app.post('/addregiliousnotes', async (req, res) =>{
      const serviceData = req.body
        const result = await religiousCollection.insertOne(serviceData);
        res.send(result)
      })
     
    app.delete('/deletereligiousnotes/:id', async(req, res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await religiousCollection.deleteOne(query);
        console.log(result)
        res.send(result)
      })
    
    app.post('/signup', async (req, res) => {
      const userData = req.body
      const query = { email: userData.email };
      const existingUser = await usersCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: "user already exists", insertedId: null });
      }
      const result = await usersCollection.insertOne(userData)
      res.send(result)
    })

    
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
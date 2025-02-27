const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 4000;


app.use(cors());
app.use(express.json());

// 70RXJHrXSZMj6NzJ
// kambuu


const uri = "mongodb+srv://kambuu:70RXJHrXSZMj6NzJ@cluster0.ardmi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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

// database
    const database = client.db('moviedb').collection('allmovie')
    const favMovie = client.db('favmovie').collection('favMovies')


// get api
    app.get('/allmovies',async(req,res)=>{
        const cursor = database.find()
        const result = await cursor.toArray()
        res.send(result)
    });

    app.get('/allmovies/:id',async(req,res)=>{
        const {id}=req.params
        const quary = {_id: new ObjectId(id)}
        const result = await database.findOne(quary)
        res.send(result)  
    });


    app.get('/favmovies',async(req,res)=>{
        const cursor = favMovie.find();
        const result = await cursor.toArray();
        res.send(result)
    })




//    post api
    app.post("/movies",async(req,res)=>{
        const data = req.body
        const result = await database.insertOne(data)
        res.send(result)
    });
    app.post('/favMovies/:id',async(req,res)=>{
        const id = req.params.id;
        const quary = {_id: new ObjectId(id)}
        const find = await database.findOne(quary)
        console.log(find)
        const result= await favMovie.insertOne(find);
        res.send(result)
    })




// delete api
    app.delete('/allmovies/:id',async(req,res)=>{
        const id = req.params.id
        const quary = {_id: new ObjectId(id)}
        const result = await database.deleteOne(quary)
        res.send(result)
    });

    app.delete('/favmovies/:id',async(req,res)=>{
        const id = req.params.id;
        const quary = {_id: new ObjectId(id)};
        const result = await favMovie.deleteOne(quary);
        res.send(result)
    })


   
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send("server is running")
})



app.listen(port,()=>{
    console.log(`running nnnon ${port}`)
})
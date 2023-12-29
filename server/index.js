const express = require('express')
const app = express();
const cors = require('cors')
require("dotenv").config()

const {connectToMongoDB} = require('./connect')
// const PORT = 8002;



// t7fgyicMJRmtlXgZ

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://prasadmutnale1234:t7fgyicMJRmtlXgZ@cluster0.8yh7l2x.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);




const urlRoute = require('./routes/url')
const userRoute = require('./routes/user')

// const uri = "mongodb+srv://prasadmutnale1234:mutnale1234@cluster0.8yh7l2x.mongodb.net/?retryWrites=true&w=majority";
// const uri = "mongodb://localhost:27017/shortUrl";

const uri = "mongodb+srv://prasadmutnale1234:t7fgyicMJRmtlXgZ@cluster0.8yh7l2x.mongodb.net/url-Shortener?retryWrites=true&w=majority";

connectToMongoDB(uri)
.then(()=> console.log("Db is connected"))
.catch((err)=>console.log("Not connected to db",err))


app.use(cors())
app.use(express.json())

app.use("/url", urlRoute)
app.use("/user", userRoute)

app.listen(process.env.PORT, ()=>{
    console.log(`Server started at ${process.env.PORT}`)
})
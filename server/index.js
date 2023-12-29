const express = require('express')
const app = express();
const cors = require('cors')

const {connectToMongoDB} = require('./connect')
const PORT = 8001;



const urlRoute = require('./routes/url')
const userRoute = require('./routes/user')

// const uri = "mongodb+srv://prasadmutnale1234:mutnale1234@cluster0.8yh7l2x.mongodb.net/?retryWrites=true&w=majority";
const uri = "mongodb://localhost:27017/shortUrl";
connectToMongoDB(uri)
.then(()=> console.log("Db is connected"))
.catch((err)=>console.log("Not connected to db",err))


app.use(cors())
app.use(express.json())

app.use("/url", urlRoute)
app.use("/user", userRoute)

app.listen(PORT, ()=>{
    console.log(`Server started at ${PORT}`)
})
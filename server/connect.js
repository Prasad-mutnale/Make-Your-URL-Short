const mongoose = require('mongoose');
// mongoose.set("strictQuery", true);


// const connectionParams={
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true 
// }
async function connectToMongoDB(url){
    return mongoose.connect(url);
}

module.exports = {
    connectToMongoDB,
}



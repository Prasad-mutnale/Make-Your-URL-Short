
const shortid = require('shortid');
const URL = require('../models/url')
async function generateNewShortURL(req, res) {
    const body = req.body;
    console.log(body.url)
    if (!body.url) return res.status(400).json({ error: " url is required" })
    const shortID = shortid();

    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    });


    return res.status(201).json({ result:shortID, status:"shorturl created"})

}


async function getURL(req, res) {

    let shortId = req.params.shortid
    console.log("short version", shortId)
    const entry = await URL.findOneAndUpdate({
        shortId
    },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            },
        }
    );

    console.log(entry.redirectURL)
    return res.redirect(entry.redirectURL)
    // return res.send("Updated data ")

}

async function getAnalytics(req, res) {

    const shortid = req.params.shortid;
    console.log("Short id", shortid)

    const result = await URL.findOne({ shortId:shortid });
    console.log("Result data", {result});

    if(Array.isArray(result.visitHistory) && result.visitHistory.length !== undefined){
    return res.json({
        // Object.keys(users).length //3
         totalClicks: result.visitHistory.length, 
         analytics: result.visitHistory 
        })
    }else{
        return res.json({
             totalClicks: 0,
             analytics: null 
            })
    }

}

async function getAllURL(req,res){

    const result = await URL.find({})
    console.log("get data", {result})
    if(result){
    return res.json({ result  })
}else{
    return res.status(401).send('No Data Found')
}

}

module.exports = {
    generateNewShortURL,
    getURL,
    getAnalytics,
    getAllURL
}
const User = require('../models/user')


const handleUserSignup = async (req,res)=>{

    const {name,email,password} = req.body;

    const userExist = await User.find({email:email})
    // console.log(userExist)

    if(!userExist){

    await User.create({
        name,
        email,
        password,
    })

    return res.status(201).send("User created successfully")
}else{
    return res.status(409).send("Email already in use")
}

}


const handleUserSignin= async (req,res)=>{
    const {email,password}=req.body;

    const user = await User.findOne({email, password});

    if(!user ) return res.status(404).json({'error':"Invalid User details"})
    else{
        return res.status(200).json({status:200, "data":"Successfully logged in"})
    }

}


module.exports={
    handleUserSignup,
    handleUserSignin,
}
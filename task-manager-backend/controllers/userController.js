const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')
const {hashPassword, comparePassword} = require('../utils/hashPassword')

const registerUser = async (req, res) =>{
    try{
        const { username, email, password } = req.body;
        if(!username || !email || !password ) return res.status(400).json({ message : 'all field required'})

        const ExistUser = await User.findOne({ email })
        if(ExistUser) return res.status(400).json({ message : 'User already Exist'})

        const hashingPassword = await hashPassword(password)    

        const newUser = await User.create({
            username,
            email,
            password : hashingPassword
        })

        const token = generateToken(newUser._id)

        res.status(201).json({
            message: 'Successfully created User',
            token : token,
            user : {
                id: newUser._id,
                username: newUser.username,
            }
        })
    }
    catch{
        res.status(500).json({ message : 'Server Error'})
    }
}



const loginUser = async (req,res) =>{
    try{
        const { email, password } = req.body;
        if(!email || !password ) return res.status(400).json({ message : 'all field required'})

        const findUser = await User.findOne({ email })
        if(!findUser) return res.status(400).json({ message : 'User Not Found'})

        const isValidPassword = await comparePassword(password, findUser.password)
        if(!isValidPassword) return res.status(400).json({ message : 'Error'})     

        const token = generateToken(findUser._id)
        
        res.status(200).json({message : 'Successefuly to Login',
             token : token,
             user:{
                id: findUser._id,
                username: findUser.username,
             } 
            })

    }
    catch{
        res.status(500).json({ message : 'Server Error'})
    }
}

module.exports = { registerUser, loginUser }
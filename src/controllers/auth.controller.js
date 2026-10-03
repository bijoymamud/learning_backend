const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const { json } = require("express");
const jwt = require("jsonwebtoken");


//sign up
const signup = async (req, res) =>{
    try {
        const {email, password, name} = req.body;

        if (!email || !password) {
            return res.status(400).json({message: "Email and password required"});
        }

        const existingUser = await prisma.user.findUnique({where: {email}});

        if (existingUser) {
            return res.status(400).json({message: "User already exists with this email"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name
            }
        })

        res.status(201),json({
            message: "User register successfully",
            data: {id: user.id, email: user.email, name: user.name}
        })

            } catch (error) {
                return res.status(500).json({message: "Failed to register user", error: error.message})
            }
}


const login = async (req,res)=>{
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({message: "Email and password are required"})
        }

        const user = await prisma.user.findUnique({
            where: {email}
        })

        if (!user) {
            return res.status(401).json({message: "Invalid email and password"})
        }

        const isPasswordValid = await bcrypt.compare(password, user?.password);
        if (!isPasswordValid) {
            return res.status(401).json({message: "Invalid email and password"})
        }

        const token = jwt.sign(
            {userId: user?.id, email:user?.mail},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        );

        res.status(200).json({
            message: "Login successfull"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Login failed", error: error.message})
    }
}






module.exports = {
    signup,
}
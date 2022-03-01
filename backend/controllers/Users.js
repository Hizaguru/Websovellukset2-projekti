import Credentials from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
    validateEmail,
    hasUpperCase,
    hasSpecialCharacters,
    validLength,
    passwordsMatch
} from "./credentialController.js";





/**
 * lists the users in the database.
 * **/
export const getUsers = async(req, res) => {
    try {
        const users = await Credentials.findAll({
            attributes:['id','name','email']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

export const findUser = async (email) => {
    try{
        const user = await Credentials.findOne({
            where: {email: email}
        });
        return user !== null;
    } catch (error){
        console.log(error);
    }
}
/**
 * Validates the user input, Generates user and adds user to the database.
 * **/
export const Register = async(req, res) => {
    const { name, email, password, confPassword } = req.body;

    if(name === "" || email === "" || password === "" || confPassword === ""){
        return res.status(400).json({msg: "Fill all fields"});
    }else if (!passwordsMatch(password, confPassword)){
        return res.status(400).json({msg: "Passwords don't match"});
    }else if(!validateEmail(email)){
        return res.status(400).json({msg: "Incorrect email"});
    }else if(await findUser(email)){
        return res.status(400).json({msg: "User already exists"})
    }else if(!hasUpperCase(password)){
        return res.status(400).json({msg: "Password needs to contain at least one uppercase"})
    }else if(!hasSpecialCharacters(password)){
        return res.status(400).json({msg: "Password needs to contain at least one special character."})
    }else if(!validLength(password)){
        return res.status(400).json({msg: "Password needs to be longer than 8 characters."})
    }

    //Encrypts the password and adds credentials to the database.
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Credentials.create({
            name: name,
            email: email,
            password: hashPassword
        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}
/**
 * Logs the user in.
 * **/
export const Login = async(req, res) => {
    try {
        const user = await Credentials.findAll({
            where:{
                email: req.body.email
            }
        });
        //Informs the user if the user fills the wrong password.
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match){
            return res.status(400).json({msg: "Wrong Password"});
        }
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        //Creates the access token for the user that expires in 15 seconds.
        const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15s'
        });
        //Creates the refresh token for the user that expires after 24 hours.
        const refreshToken = jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await Credentials.update({refresh_token: refreshToken},{
            where:{
                id: userId
            }
        });
        //Creates the cookie that expires after 24 hours.
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });
    } catch (error) {
        //Informs the user if he fills the wrong email.
        res.status(404).json({msg:"Email not found"});
    }
}
/**
 * Logs out the user.
 * **/
export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Credentials.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Credentials.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}
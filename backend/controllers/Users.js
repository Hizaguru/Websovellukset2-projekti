import Credentials from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * @author Jukka-Pekka Lappalainen
 * @param {string} password - User's password.
 * Checks if the string contains uppercase.
 * **/
function hasUpperCase(password) {
    return(/[A-Z]/.test(password))
}
/**
 * Validates the user's email address.
 * @param {string} email - The users email address.
 * **/
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
/**
 * @param {string} password - The user's password
 * @param {string} confPass - The user's confirmation password.
 * Validates the user password
 * **/
const validatePassword =(password) => {
    let passwordValidation;

    if(hasUpperCase(password)){
        passwordValidation = true;
    }else{
        console.log("uppercase")
    }
}
/**
 * lists the users in the database.
 * **/
export const getUsers = async(req, res) => {
    try {
        const users = await Credentials.findAll({
            attributes:['id','name','email']
        });
        console.log(users)
        console.log("getUsers method")
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
        console.log(user)
        console.log("findUser method")
        if(user === null){
            return false;
        }
        return true;
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
    }else if (password !== confPassword){
        return res.status(400).json({msg: "Passwords don't match"});
    }else if(!validateEmail(email)){
        return res.status(400).json({msg: "Incorrect email"});
    }else if(await findUser(email)){
        return res.status(400).json({msg: "User already exists"})
    }else if(isUppercase(password)){
        return res.status(400).json({msg: "Password needs to be at least 8 characters and contain one uppercase"})
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
        isUppercase(password)
        console.log(password, "lll")
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}

export const Login = async(req, res) => {
    try {
        const user = await Credentials.findAll({
            where:{
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg: "Wrong Password"});
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15s'
        });
        const refreshToken = jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await Credentials.update({refresh_token: refreshToken},{
            where:{
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({msg:"Email not found"});
    }
}

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
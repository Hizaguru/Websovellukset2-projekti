import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'


/**
 * @author Jukka - Pekka Lappalainen
 * Returns the users from the database.
 * **/
export const getUsers = async(req,res) => {
    try {
        const users = await Users.findAll({
            attributes:['id', 'name', 'email']
        });
        res.json(users);
    }catch (error) {
        console.log(error);
    }
}
/**
 * Hashes and salts the password and adds the user into the database.
 * @author Jukka - Pekka Lappalainen
 * @param res
 * @param req
 * @return {status} - http response status
 * **/
export const Register = async (req,res) => {
    const {name, email, password, confPassword} = req.body;
    // if the passwords don't match, returns status(400).
    if(password !== confPassword) {
        return res.status(400).json({
            msg: "Passwords don't match"
        })
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password,salt);
    //Adds user to the database.
    try {
        await Users.create({
            name : name,
            email : email,
            password : hashPassword
        });
        res.json({
            msg: "Registration complete."
        })

    }catch (error){
        console.log(error)
    }
}

/**
 * Signs in the user.
 * @author Jukka - Pekka Lappalainen
 * @param res
 * @param req
 * @return {status} - http response status
 * **/
export const Login = async(req,res) => {
    try {
        //checks if the user exists.
        const user = await Users.findAll({
            where:{
                email: req.body.email
            }
        });
        //Informs the user about the incorrect password.
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match){
            return res.status(400).json({
                msg: "Incorrect password"
            })
        }
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        //creates the accessToken.
        const accessToken = jwt.sign({
            userId,
            name,
            email
        },
                process.env.ACCESS_SECRET_TOKEN,{
            expiresIn: '15s'
            });
        //Creates the refreshToken
        const refreshToken = jwt.sign({
            userId,
            name,
            email
        }, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });

        await Users.update({
            refresh_token : refreshToken
        },{
            where:{
                id: userId
            }
        });
        //Sets the cookie for the user. maxAge 24hours.
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24*60*60*1000
        });
        res.json({
            accessToken
        });
    }catch (error){
        console.log(error)
        res.status(404).json({
            msg : "Email not found"
        });
    }
}

/**
 * Signs out the user.
 * @author Jukka - Pekka Lappalainen
 * @param req
 * @param res
 * @return {status} - http response status
 * **/
export const Logout = async (req,res) => {
    const refreshToken = req.cookies.refresh_token;
    if(!refreshToken){
        return res.sendStatus(204);
    }
    const user = await Users.findAll({
        where:{
            refresh_token : refreshToken
        }
    });
    if(!user[0]){
        return res.sendStatus(204);
        const userId = user[0].id;
        await Users.update({
            refreshToken : null
        }, {
            where:{
                id: userId
            }
        });
        res.clearCookie('refreshToken');
        return res.sendStatus(200);
    }
}
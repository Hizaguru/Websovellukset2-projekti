import Credentials from "../models/CredentialsModel.js";
import jwt from "jsonwebtoken";

/**
 * Creates the refresh token for the user when logged-in.
 * **/
export const refreshToken = async(req, res) => {
    try {

        const refreshToken = req.cookies.refreshToken;
        //Sends 401 if no refreshtoken
        if(!refreshToken) return res.sendStatus(401);
        const user = await Credentials.findAll({
            where:{
                refresh_token: refreshToken
            }
        });
        //If no user with refresh token -> send 403
        if(!user[0]) return res.sendStatus(403);
        //else verifies the refresh token for the specific user.
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const userId = user[0].id;
            const name = user[0].name;
            const email = user[0].email;
            const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '15s'
            });
            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
    }
}
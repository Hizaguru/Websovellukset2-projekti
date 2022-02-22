import express from "express";
import {getUsers, Register, Logout, Login} from "../controllers/Users.js";
import {verifyToken} from "../middleware/VerifyToken.js";
import {refreshToken} from "../controllers/RefreshToken.js";

const router = express.Router();
router.get('/credentials', verifyToken, getUsers);
router.post('/credentials', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout)

export default router;
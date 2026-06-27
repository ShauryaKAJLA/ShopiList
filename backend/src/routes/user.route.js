import express from 'express'
import { userLogin, userLogout, userSignup } from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();


router.route("/signup").post(userSignup)
router.route("/login").post(userLogin)
router.route("/logout").post(verifyJWT, userLogout)
export default router
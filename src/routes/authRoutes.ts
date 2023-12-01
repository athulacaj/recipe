import e, { Router } from "express";
import AuthService from "../services/authService";
import AuthRepository from "../repository/authRepository";
import AuthController from "../controllers/authController";

const router = Router();
const authService:AuthService=new AuthService(new AuthRepository());
const authController:AuthController=new AuthController(authService);

router.post('/api/emailLogin', (req, res) => {
    console.log("email login",req.body);
    authController.login(req).then(response=>{
        res.status(response.statusCode).json(response.body);
    })
});
router.post('/api/signup', (req, res) => {
    authController.signup(req).then(response=>{
        res.status(response.statusCode).json(response.body);
    })
});



export default router;
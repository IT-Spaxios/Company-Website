import { Router } from "express";

import { register, login, forgotpassword, resetpassword, getPrivateData } from "../controllers/auth.js";

import  { getAccessToRoute } from "../Middlewares/Authorization/auth.js";


const router = Router() ;


router.post("/register",register)

router.post("/login",login)

router.post("/forgotpassword",forgotpassword)

router.put("/resetpassword",resetpassword)

router.get("/private",getAccessToRoute,getPrivateData)


export default router
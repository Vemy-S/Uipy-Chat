import { Router } from "express";
import { searchUser } from "../controllers/userController";
import { Autenthicate } from "../middleware/authenticate";

const router = Router()

router.get('/search', Autenthicate, searchUser)

export default router
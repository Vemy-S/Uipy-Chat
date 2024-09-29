import { Router } from "express";
import { getMessages, sendPrivate } from "../controllers/messageController";
import { Autenthicate } from "../middleware/authenticate";


const router = Router()


router.post('/private', Autenthicate, sendPrivate)
router.get('/private', Autenthicate, getMessages)

export default router
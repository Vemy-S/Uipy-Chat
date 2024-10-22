import { Router } from "express";
import { getMessages, sendPrivate } from "../controllers/messageController";
import { Autenthicate } from "../middleware/authenticate";

const router = Router()

router.post('/private/:id', Autenthicate, sendPrivate)
router.get('/private/:id', Autenthicate, getMessages)

export default router
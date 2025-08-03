import express from 'express';
import{createNote,getallnotes,updateNote,deleteNote,getNoteById} from '../Controllers/noteController.js';
const router = express.Router()

router.get("/",getallnotes)
router.get("/:id",getNoteById)
router.post("/",createNote)
router.put("/:id",updateNote)
router.delete("/:id",deleteNote)

export default router;
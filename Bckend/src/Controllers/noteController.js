import Note from "../models/Note.js";
///get all notes controller
export async function getallnotes (_,res){
 try {
   const note= await Note.find().sort({createdAt: -1});
    res.status(200).json(note);
 } catch (error) {
    console.error("Error in getallNotes Controller:", error);
    res.status(500).json({message: "Internal Server Error"});
 }
}

//get note by id controller
export async function getNoteById(req, res) {
  try {
    const GetById = await Note.findById(req.params.id,);
    if (!GetById) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(GetById);
  } catch (error) {
    console.error("Error in getNoteById Controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

//create note controller
export  async function createNote (req,res){
  try {

    const { title, content } = req.body;
    const note = new Note({ title, content });
    const savenote= await note.save();
    res.status(201).json(savenote);
  } catch (error) {
     console.error("Error in createNote Controller:", error);
     res.status(500).json({ message: "Internal Server Error" });
  }
}
//update note controller
export async function updateNote (req,res){
  try {
    const { title, content } = req.body;
    const updatednote = await Note.findByIdAndUpdate(req.params.id,{ title, content }, { new: true });
    if (!updatednote) 
    return  res.status(404).json({ message: "Note not found" });
    res.status(200).json(updatednote);
  } catch (error) {
    console.error("Error in updateNote Controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
    
  }
}

//delete note controller
export async function deleteNote(req,res){
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) 
      return res.status(404).json({ message: "Note not found" });
  
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error in deleteNote Controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
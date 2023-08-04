const mongoose = require("mongoose")
const Note = require('../Models/noteModel')

const getNotes = async (req, res) => {
  try {
    const user_id = req.user._id
    const Notes = await Note.find({user_id})
    res.status(201).json(Notes)
  } catch (error) {
    console.log(error)
    res.status(501).json({error:"error getting the notes"})
  }
}


const addNote = async (req, res) => {
  const { title, content, date, checked } = req.body
  try {  
    const user_id = req.user._id
    const note = await Note.create({ title, content, date ,checked,user_id})
    res.status(201).json(note )
  } catch (error) {
    console.log(error)
    res.status(501).json({error:error})
  }
}
const deleteNote = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(401).json({ error: "Wrong id form" })
  
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id })
    res.status(200).json(note)
  }
  catch (error) {
    console.log(error)
    res.status(500).json(error)
}
  
}

const updateNote = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(401).json({ error: "Wrong id form" })
    
    try {
      const note = await Note.findByIdAndUpdate({ _id: req.params.id }, { ...req.body })
      res.status(201).json(note)
    } catch (error) {
      console.log(error)
    res.status(404).json(error)
    }
  }
module.exports = {
  getNotes,
  addNote,
  deleteNote,
  updateNote
}

const express = require("express")
const RequireAuth = require("../Middleware/RequireAuth")
const {
  getNotes,
  addNote,
  deleteNote,
  updateNote
} = require("../Controllers/NotesController")


const router = express.Router()

router.use(RequireAuth)

router.get("/", getNotes)
router.post("/", addNote)
router.delete('/:id', deleteNote)
router.patch('/:id',updateNote)

module.exports = router
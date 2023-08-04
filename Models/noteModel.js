const mongoose = require("mongoose")

const Schema = mongoose.Schema

const noteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  date: {
    type: Object,
    required:true
  },
  checked: {
    type: Boolean,
    require: true
  },
  user_id: {
    type: String,
    required : true
  }
})

module.exports = mongoose.model("Note",noteSchema)
const express=require( "express" );
const router=express.Router();
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator'); //To ensure not to save empty data in db
var fetchuser = require('../middleware/fetchUser');


// Route 1: Get all the Notes using : GET " /api/auth/fetchalluser"  Login Required
router.get("/fetchallnotes",fetchuser,async (req,res)=>{
    try {
        const notes= await Note.find({user:req.user.id});
        res.json(notes);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error Occurred");
    }
});


// Route 2: Add a New Note using : GET " /api/auth/"  Login Required
router.post("/addnote",fetchuser,[
    body('title').isLength({ min: 3 }).withMessage(" Enter a Valid Title"),
    body('description').isLength({ min: 5 }).withMessage("Description must be atleast 5 characters"),
],async (req,res)=>{
    const {title,description,tag}=req.body;
    //   If there are som errors return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

    try {
        const note= new Note({
            title,description,tag,user:req.user.id
        })
        const savedNote= await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error Occurred");
    }
});

// Route 3: Upadte an Existing Note using : POST " /api/auth/updatenote/:id".    Login Required
router.put("/updatenote/:id",fetchuser,async (req,res)=>{
    const { title,description,tag }=req.body;
    try {
        // Create a new note object
    const newNote={  };
    if ( title ){
        newNote.title=title;
    };
    if ( description ){
        newNote.description=description;
    };
    if ( tag ){
        newNote.tag=tag;
    };
    // Find the note to be updated
    let note= await Note.findById(req.params.id);
    if (!note){
        return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }
    note= await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json(note);        
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error Occurred");
    }
}); 



// Route 3: Delete an Existing Note using : POST " /api/auth/deletenote/:id".    Login Required
router.delete("/deletenote/:id",fetchuser,async (req,res)=>{
    try {
    
        // Find the note to be deleted and delete it
        let note= await Note.findById(req.params.id);
        if (!note){
            return res.status(404).send("Not Found");
        }
        // Allow deleteion only if user owns this note
        if (note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
    
        note= await Note.findByIdAndDelete(req.params.id)
        res.json({"Succes": "Note Has Been Deleted",
        "note":note});
    
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error Occurred");
        
    }
    });




module.exports= router
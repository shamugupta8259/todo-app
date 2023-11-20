const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes');
// const { toHaveDescription } = require('@testing-library/jest-dom/dist/matchers');


// Route 1:   Fetch all notes using : Get   "/api/notes/fetchallnotes". Login required

router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured")

    }
})



// Route 2:  Add  new Note usind : Post   "/api/notes/addnote". Login required

router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 })], async (req, res) => {
        try {
            const { title, description, tag } = req.body;

            //  if there are errors return bad request and errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const note = new Notes({
                title, description, tag, user: req.user.id
            })

            const savedNote = await note.save();

            res.json(savedNote);
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal server error occured")
        }
    })





// Route 3: Update an existing note using  : Post   "/api/notes/updatenote". Login required
// updation ka liya put request ka istmal aur 

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //  create a new note object 
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // find the note to be upddated and update it
        // const note=Notes.findByIdAndUpdate();
        // For example, if you have the route /student/:id, then the “id” property is available as req.params.id. This object defaults to {}. 
        
        let note= await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not found");
        }
        if (note.user.toString()!==req.user.id) {
            return res.status(401).send("Not allowed");
        }
        note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        res.json({note});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured")
    }
})




// Route 4: Delete an existing note using  : Post   "/api/notes/deletenote/:id". Login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  
    try {
        let note= await Notes.findById(req.params.id);
        // find the note to be deleted and delete it 
        if (!note) {
            return res.status(404).send("Not found");
        }
        // allows this if user owns this 
        if (note.user.toString()!==req.user.id) {
            return res.status(401).send("Not allowed");
        }
        note=await Notes.findByIdAndDelete(req.params.id)
        res.json({note});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured")
    }
})




module.exports = router   
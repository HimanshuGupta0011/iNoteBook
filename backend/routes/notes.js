const express = require('express');
const fetchUser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult} = require('express-validator');
const { findByIdAndDelete } = require('../models/User');

const router = express.Router();

//Route 1: Fetch all notes , login required
router.get('/fetchallnotes', fetchUser , async (req, res)=>{
    try{
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Some Internal Error occurred");
    }
});

//Route 2: Add notes , login required
router.post('/addnote', fetchUser , [
    body('title', 'Minimum length of title must be 3').isLength({ min: 3 }),
    body('description', 'Minimum length of description must be 5').isLength({ min: 5 })
], async (req, res)=>{
    const { title, description, tag } = req.body;
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
        res.status(400).json({ error: errs.array() });
    }
    try {
        const note = await new Notes({
            user: req.user.id,
            title,
            description,
            tag
        })
        const saveNote = await note.save();
        res.json(saveNote);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Some Internal Error occurred");
    }
});

//Route 3: Update notes , login required
router.put('/updatenote/:id', fetchUser , async (req, res)=>{
    try{
        const {title, description, tag} = req.body;
        let newNote = {};
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}

        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found!");
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Access Denied!");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
        res.json(note);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Some Internal Error occurred");
    }
})

//Route 4: Delete notes , login required
router.delete('/deletenote/:id', fetchUser , async (req, res)=>{
    try{
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found!");
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Access Denied!");
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({msg : "Succesfully Note Deleted", note});

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Some Internal Error occurred");
    }
})

module.exports = router;
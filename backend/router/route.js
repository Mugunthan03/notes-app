const express = require('express');
const User = require('../models/User');
const Note = require('../models/Note');

const router = express.Router();


//register new user and save to db
router.post('/register', async (req, res) => {
    try {
        const { email, uid } = req.body;

        const userFound = await User.findOne({ uid });
        if (userFound) {
            return res.status(422).json({ error: 'User already exists' });
        } else {
            const newUser = new User({
                uid,
                email,
            });
            await newUser.save();
            res.status(201).json({ message: 'User registered successfully' });
        }
    } catch (error) {
        console.error(`Error occurred: ${error.message}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//add new notes and save to db
router.post('/NewNote', async (req, res) => {
    try {
        const { uid, title, content } = req.body;

        let user = await User.findOne({ uid });

        // Register the user if not already registered
        if (!user) {
            const { email } = req.body; // Assuming email is passed in the request
            user = new User({ uid, email });
            await user.save();
        }

        // Create and save the note
        const newNote = new Note({
            title,
            content,
            uid,
        });
        const addedNote = await newNote.save();
        res.status(201).json({ note: addedNote });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//get notes from db
router.get('/note', async (req, res) => {
    try {
        const { uid } = req.query;

        if (!uid) {
            return res.status(400).json({ error: 'User ID not provided' });
        }

        const notes = await Note.find({ uid });
        res.json({ notes });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//edit the notes 
router.put('/note/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { title, content },
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.json({ note: updatedNote });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//delete the notes
router.delete('/note/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedNote = await Note.findByIdAndDelete(id);

        if (!deletedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;

import { Mongoose } from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => { 
    try {

        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);

    } catch (err) {
        res.status(404).json({ message: err.message});
    }
}

export const createPost = async (req, res) => {
    const { title, message, selectedFile, creator, tags} = req.body;
    const newPost = new PostMessage({ title, message, selectedFile, creator, tags });
    console.log(`this ${selectedFile} ${title}`);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const {id: _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('no post with that id');
    
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true} );

    res.json(updatedPost);
}
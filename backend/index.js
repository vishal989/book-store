import express from 'express';
import {PORT, mongoDBURL} from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send("welcome to Mongoose")
})

app.post('/books', async (req, res) => {
    try{
        if(!req.body.title || !req.body.title || !req.body.publishYear){
            return res.status(400).send({ message: "Send all the required fields"}); 
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }
        const book = await Book.create(newBook);

        return res.status(201).send(book)
    }catch(error){
        console.log(error);
        res.status(500).send({ message: error.message})
    }
})

app.get('/books', async (req, res) => {
    try{
        const books = await Book.find({})

        return res.status(200).json({
            count: books.length,
            data: books
        });
    }catch(error){
        console.log(error);
        return res.status(500).send({ message: error.message})
    }
})

app.get('/books/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const book = await Book.findById(id)

        return res.status(200).json(book);
    }catch(error){
        console.log(error);
        return res.status(500).send({ message: error.message})
    }
})

app.put('/books/:id', async (req, res) => {
    try{
        const {id} = req.params;
        if(!req.body.title || !req.body.title || !req.body.publishYear){
            return res.status(400).send({ message: "Send all the required fields"}); 
        }

        const user = await Book.findByIdAndUpdate(id, req.body);
        if(!user){
            return res.status(404).send({ message: "Book not found"});
        }

        return res.status(200).send({ message:"User updated successfully"});
    }
    catch(error){
        console.log(error);
        return res.status(500).send({ message: error.message})
    }
})

app.delete('/books/:id', async (req, res) => {
    try{
        const {id} = req.params;

        const user = await Book.findByIdAndDelete(id);

        if(!user){
            return res.status(404).json({message: "Book not found"});
        }
        return res.status(200).send({message: "User deleted successfully"});
    }
    catch(error){
        console.log(error);
        return res.status(500).send({ message: error.message});
    }
})

mongoose.connect(mongoDBURL)
.then(() => {
    console.log('App connected to Database');
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`);
    });
})
.catch((error) => {
    console.log(error)
})
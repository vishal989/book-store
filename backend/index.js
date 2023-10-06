import express from 'express';
import mongoose from 'mongoose';

import {PORT, mongoDBURL} from './config.js';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/bookRoute.js';

const app = express();
app.use(express.json());
app.use('/books', booksRoute);
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type']
}))

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send("welcome to Mongoose")
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
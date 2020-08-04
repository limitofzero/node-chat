import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send("Hi, man!")
});

app.listen(port, () => console.log(`Server started on ${port}`));



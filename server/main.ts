import express from 'express';

const app = express();

const port = 3001;

app.get('/', (req, res) => {
    res.send("Hi, man!")
});

app.listen(port, () => console.log(`Server started on ${port}`));



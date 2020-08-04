import express from 'express';
import "reflect-metadata";
import {createConnection} from "typeorm";
import {typeOrmConfig} from "./db/typeorm-config";

createConnection(typeOrmConfig).then(async connection => {
    const app = express();

    const port = process.env.PORT;

    app.get('/', (req, res) => {
        res.send("Hi, man!")
    });

    app.listen(port, () => console.log(`Server started on ${port}`));
}).catch(err => console.log(err));

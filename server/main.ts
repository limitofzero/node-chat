import express from 'express';
import "reflect-metadata";
import { createConnection } from "typeorm";
import { typeOrmConfig } from "./src/db/typeorm-config";
import { login } from "./src/controllers/auth";
import bodyParser from 'body-parser';

createConnection(typeOrmConfig).then(async connection => {
    const app = express();
    app.use(bodyParser.json());

    const port = process.env.PORT;
    app.post('/login', login);

    app.listen(port, () => console.log(`Server started on ${port}`));
}).catch(err => console.log(err));

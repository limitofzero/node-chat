import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { typeOrmConfig } from "./src/db/typeorm-config";
import { login } from "./src/controllers/auth";
import bodyParser from "body-parser";
import cors from "cors";
import { body } from "express-validator";

createConnection(typeOrmConfig).then(async connection => {
    const app = express();
    app.use(bodyParser.json());

    if (process.env.ENV === "DEV") {
        app.use(cors());
    }

    const port = process.env.PORT;
    app.post("/login",
      [
          body("email").notEmpty(),
          body("password").notEmpty()
      ],
      login);

    app.listen(port, () => console.log(`Server started on ${port}`));
}).catch(err => console.log(err));

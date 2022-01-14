import "reflect-metadata";
import express from "express";

import connection from "./database/connect";
import { routes } from './routes';

const app = express();

connection();

app.use(express.json());
app.use(routes);

app.listen(3131, () => console.log("Server is running on port 3131 🔥"));
import express from "express";
import { SessionId } from "../types";
import { game2 } from "./game2";
const app = express();
const port = 3000

const game = game2();

interface HttpError {
    status: number;
    message: string;
}
const createError = (status: number, message: string): HttpError => {

    return {
        message: message,
        status: status
    };
}

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/api/addPlayer/:name', (req, res, next) => {

    const user = req.params.name;

    if (user === undefined || user == null) {
        next(createError(400, 'Name is not set'));
    }

    const id = game.addPlayer(user);
    res.send({ id: id });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
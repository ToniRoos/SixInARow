import express from "express";
import { TileData } from "../types";
import { createError } from "./createError";
import { game2 } from "./game2";
const app = express();
app.use(express.json());
const port = 3000

const game = game2();

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.post('/api/addPlayer/:name', (req, res, next) => {
    const user = req.params.name;

    if (user === undefined || user == null) {
        next(createError(400, 'Name is not set'));
    }

    const id = game.addPlayer(user);
    res.send({ id: id });
});

app.get('/api/getGameStatus', (req, res, next) => {
    const gameStatus = game.getGameStatus();
    res.send(gameStatus);
});

app.get('/api/getGameStatus/player/:id', (req, res, next) => {
    const id = req.params.id;
    const gameStatus = game.getGameStatus(id);
    res.send(gameStatus);
});

app.post('/api/startGame/player/:id', (req, res, next) => {
    const id = req.params.id;
    game.startGame(id);
    res.send();
});

export interface CheckMoveResult {
    moveAllowed: boolean;
}
app.post('/api/checkMove/player/:id', (req, res, next) => {
    const id = req.params.id;
    const tileToMove: TileData = req.body;
    const moveAllowed = game.checkMove(id, tileToMove);

    res.send({
        moveAllowed: moveAllowed
    });
});

app.post('/api/nextTurn/player/:id', (req, res, next) => {
    const id = req.params.id;
    game.nextTurn(id);
    res.send();
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
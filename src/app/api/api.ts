import { GameStatus } from "../../backend/game";
import { CheckMoveResult } from "../../backend/server";
import { SessionId, TileData } from "../../types";

const addPlayer = (name: string): Promise<SessionId> => fetch(`/api/addPlayer/${name}`, { method: 'POST' }).then(res =>
    res.json()
)

const getGameStatus = (id?: string): Promise<GameStatus> => fetch(`/api/getGameStatus/${id ? `player/${id}` : ""}`).then(res =>
    res.json()
)

const startGame = (id?: string): Promise<void> => fetch(`/api/startGame/player/${id}`, { method: 'POST' }).then()

const nextTurn = (id?: string): Promise<void> => fetch(`/api/nextTurn/player/${id}`, { method: 'POST' }).then()

const checkMove = (id: string, tileToMove: TileData): Promise<CheckMoveResult> => fetch(`/api/checkMove/player/${id}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(tileToMove)
}).then(res =>
    res.json()
)

export {
    addPlayer,
    getGameStatus,
    startGame,
    checkMove,
    nextTurn
};
import * as WebSocket from "ws";
import { findMatchingTilesByCheckingNeighbours } from "../logic/boardLogic";
import { stock } from "../logic/stock";
import { Command, SessionId, TileData, TileSymbols } from "../types";
import { createUUID } from "./helper";

const wss = new WebSocket.Server({ port: 8080 });
const userStore: UserSessionData[] = [];
export interface UserSessionData extends SessionId {
    name: string;
    ws: WebSocket;
    tilesOnHand: TileSymbols[];
    // turnActive: boolean;
}

wss.on('connection', function connection(ws: WebSocket) {

    let id: string;
    let tilesOnTurn: TileData[] = [];

    try {
        ws.on('message', (message: string) => {

            const dataParsed: Command = JSON.parse(message);

            if (id && id !== dataParsed.id) {
                console.log("Returned with invalid ID. " + id + " !== " + dataParsed.id)
                return;
            }

            switch (dataParsed.command) {
                case 'SetName':
                    id = createUUID();
                    userStore.push({
                        id: id,
                        name: dataParsed.data,
                        ws: ws,
                        tilesOnHand: []
                    })
                    sendCommand(ws, { command: 'SetId', id: id });
                    console.log(`added id for user: ${dataParsed.data}, id: ${id}`);
                    break;
                case 'GetPlayers':

                    const data = userStore.map(items => items.name);
                    setDataToAllClients({ command: 'PlayersList', data: data });
                    console.log(`playerslist: ${JSON.stringify(data)}`);

                    break;
                case 'StartGame':

                    const initalBoard = stock.createGame();
                    const startTilesForAllPlayers = stock.getNextTiles(6 * userStore.length);

                    userStore.forEach((item, index) => {

                        if (index === 0) {
                            // item.turnActive = true;
                            stock.setActivePlayer(item.name);
                        }

                        const tilesOnHand = startTilesForAllPlayers.splice(0, 6);
                        setIdsToTilesOnHand(tilesOnHand);
                        item.tilesOnHand = tilesOnHand;

                        sendCommand(item.ws, {
                            command: 'StartGame', data: {
                                turnActive: item.name === stock.getGameData().activePlayer,
                                tilesOnHand: tilesOnHand,
                                board: initalBoard
                            }
                        });
                    });
                    console.log(`start game`);

                    break;
                case 'GetTiles':

                    // const tiles = stock.getNextTiles(6);
                    // sendCommand(ws, { command: 'GetTiles', id: id, data: tiles });
                    console.log(`get tiles`);

                    break;
                case 'CheckMove':

                    console.log(`check move`);

                    if (getSession(id).name !== stock.getGameData().activePlayer) {
                        return;
                    }

                    const tileToMove: TileData = dataParsed.data;
                    const tileOnBoard = stock.getTileForCoordinates(tileToMove);

                    const tileMatches = findMatchingTilesByCheckingNeighbours(tileOnBoard, tileToMove.color, tileToMove.symbol, stock.getTilesOfGame());
                    if (!tileMatches) {
                        return;
                    }

                    const tilesOnTurnSize = tilesOnTurn.length;
                    if (tilesOnTurnSize === 1
                        && tileOnBoard.x !== tilesOnTurn[0].x
                        && tileOnBoard.y !== tilesOnTurn[0].y) {
                        return;
                    }

                    const numberInRow = tilesOnTurn.filter(item => item.x === tileOnBoard.x).length;
                    const numberInCol = tilesOnTurn.filter(item => item.y === tileOnBoard.y).length;
                    if (tilesOnTurnSize > 1
                        && numberInRow !== tilesOnTurnSize
                        && numberInCol !== tilesOnTurnSize) {

                        return;
                    }

                    tilesOnTurn.push(tileOnBoard);

                    let gameData = stock.executeMove(tileOnBoard, tileToMove);

                    userStore.forEach(item => {

                        let tilesOnHand = item.tilesOnHand;
                        if (id === item.id) {

                            tilesOnHand = tilesOnHand.filter(tile => tile.id !== tileToMove.id);
                        }

                        item.tilesOnHand = tilesOnHand;
                        sendCommand(item.ws, {
                            command: 'RefreshBoard', data: {
                                turnActive: item.name === stock.getGameData().activePlayer,
                                tilesOnHand: tilesOnHand,
                                board: gameData
                            }
                        });
                    });

                    break;
                case 'NextTurn':

                    const tiles = stock.getNextTiles(tilesOnTurn.length);
                    tilesOnTurn = [];
                    const session = getSession(id);

                    session.tilesOnHand = [...session.tilesOnHand, ...tiles];
                    setIdsToTilesOnHand(session.tilesOnHand);

                    const activePlayer = setNextPlayerActive(session.id);
                    stock.setActivePlayer(activePlayer);

                    userStore.forEach((item, index) => {
                        sendCommand(item.ws, {
                            command: 'RefreshBoard', data: {
                                turnActive: item.name === activePlayer,
                                tilesOnHand: item.tilesOnHand,
                                board: stock.getGameData()
                            }
                        });
                    });

                    console.log(`next turn`);

                    break;
                default:
                    break;
            }
        });

        ws.on('close', () => {
            removeSession(id);
        });

    } catch (e) {
        console.error(e)
    }

});

const sendCommand = (ws: WebSocket, command: Command) => {

    const parsedPayload = JSON.stringify(command);

    ws.send(parsedPayload);
}

function setIdsToTilesOnHand(tilesOnHand: TileSymbols[]) {
    tilesOnHand.forEach((tile, i) => {
        tile.id = i;
    });
}

function removeSession(id: string) {
    console.log('close session: ', id);
    const index = userStore.findIndex(item => item.id === id);
    if (index >= 0) {
        userStore.splice(index, 1);
        console.log('removed id: %s', id);
    }
}

function getSession(id?: string) {
    console.log('get session: ', id);
    const session = userStore.filter(item => item.id === id)[0];
    return session;
}

function setNextPlayerActive(id?: string) {

    console.log('set next player active: ', id);
    let activePlayer = '';

    // userStore.forEach(sessionItem => {
    //     sessionItem.turnActive = false;
    // });

    const sessionIndex = userStore.findIndex(item => item.id === id);
    if (sessionIndex < userStore.length - 1) {
        // userStore[sessionIndex + 1].turnActive = true;
        activePlayer = userStore[sessionIndex + 1].name;
    } else {
        // userStore[0].turnActive = true;
        activePlayer = userStore[0].name;
    }

    return activePlayer;
}

const setDataToAllClients = (command: Command) => {
    userStore.forEach(item => {
        if (item.ws.readyState === item.ws.OPEN) {
            sendCommand(item.ws, command);
        } else {
            if (item.id) {
                removeSession(item.id);
            }
        }
    });
}


import * as WebSocket from "ws";
import { stock } from "../logic/stock";
import { Command, Commands, SessionId } from "../types";
import { createUUID } from "./helper";

const wss = new WebSocket.Server({ port: 8080 });
const userStore: UserSessionData[] = [];

export interface UserSessionData extends SessionId {
    name: string;
    ws: WebSocket;
}

wss.on('connection', function connection(ws: WebSocket) {

    let id: string;

    try {
        ws.on('message', (message: string) => {

            const dataParsed: Command = JSON.parse(message);
            switch (dataParsed.command) {
                case 'SetName':
                    id = createUUID();
                    userStore.push({
                        id: id,
                        name: dataParsed.data,
                        ws: ws
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

                    stock.createInitalStock();
                    setDataToAllClients({ command: 'StartGame' });
                    console.log(`start game`);

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

function removeSession(id: string) {
    console.log('close session: ', id);
    const index = userStore.findIndex(item => item.id === id);
    if (index >= 0) {
        userStore.splice(index, 1);
        console.log('removed id: %s', id);
    }
}

function setDataToAllClients(command: Command) {
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


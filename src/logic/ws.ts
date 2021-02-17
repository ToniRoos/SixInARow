import { Command, Commands } from "../types";

export const ws = (function () {

    let socket: WebSocket;
    (() => {

    })();

    return { // public interface
        init: function () {
            socket = new WebSocket("ws://localhost:8080");
            socket.onopen = (e) => {
                // socket.send('opened ws session');
            }
            socket.onmessage = (e) => {
                console.log(e.data);
                // setText(e.data.toString());
            }
        },

        sendCommand: (command: Command) => {

            const parsedPayload = JSON.stringify(command);
            socket.send(parsedPayload);
        },

        getSocket: function () {
            return socket;
        },

        onCommand: (command: Commands, func: (command: Command) => void) => {

            const listener = function (e: MessageEvent) {

                const dataParsed: Command = JSON.parse(e.data);
                if (dataParsed.command === command) {
                    func(dataParsed);
                }
            }

            socket.addEventListener('message', listener);
            return listener;
        }
    };
})();
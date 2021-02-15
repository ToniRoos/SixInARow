import { stringify } from 'querystring';
import React from 'react';
import { ws } from './logic/ws';
import { color1, color2, Command } from './types';

const Waiting = () => {

    const [players, setPlayers] = React.useState<string[]>([]);

    React.useEffect(() => {

        const listener = ws.onCommand('PlayersList', (data) => {

            setPlayers(data.data);
            console.log("Waiting: on message called");
        });
        ws.sendCommand({ command: 'GetPlayers' });

        return () => {
            ws.getSocket().removeEventListener('message', listener);
        }
    }, []);

    const buttonDisabled = players.length <= 1;
    const playersRendered = players.map((item, key) => <div key={key} className="input-group mb-3">
        {/* <label htmlFor={`inputPlayer${key}`} className={`form-label  text-${color1}`}>Player {key + 1}</label> */}
        <span className={`input-group-text bg-transparent border-0 text-${color1}`} id={`inputPlayer${key}`} >Player {key + 1}</span>
        <input type="text" aria-describedby={`inputPlayer${key}`} disabled className={`form-control form-control-lg bg-${color1} text-${color2}`} value={item} />
    </div>);

    return <div className={`vh-100 d-flex flex-column align-items-center justify-content-center bg-${color1}`}>
        <div className={`bg-${color2} p-5 shadow-lg rounded border border-${color1}`}>

            {playersRendered}

            <button disabled={buttonDisabled} className={`btn btn-lg w-100 btn-${color1} text-${color2}`}
                onClick={() => {
                    ws.sendCommand({ command: 'StartGame', id: "" });
                }}>
                Start Game
            </button>
        </div>
    </div>
}

export default Waiting;
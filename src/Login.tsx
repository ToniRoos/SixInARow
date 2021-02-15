import * as React from 'react';
import { ws } from './logic/ws';
import { color1, color2 } from './types';

const Login = () => {

    const [name, setName] = React.useState("");

    const buttonDisabled = name === "";

    return <div className={`vh-100 d-flex flex-column align-items-center justify-content-center bg-${color1}`}>
        <div className={`bg-${color2} p-5 shadow-lg rounded border border-${color1}`}>
            <div className="mb-3">
                <label htmlFor="inputName" className={`form-label text-${color1}`}>Enter a name</label>
                <input type="text" className={`form-control form-control-lg bg-${color1} text-${color2}`} id="inputName"
                    onChange={(e) => setName(e.target.value)} />
            </div>

            <button disabled={buttonDisabled} className={`btn btn-lg w-100 btn-${color1} text-${color2}`}
                onClick={() => {
                    ws.sendCommand({ command: 'SetName', data: name, id: "" });
                }}>
                Join Game
            </button>
        </div>
    </div>
}

export default Login;
import * as React from 'react';
import Board from './Board';
import { ws } from './logic/ws';
import Login from './Login';
import { color1, Command } from './types';
import Waiting from './Waiting';

const Main = () => {

    const [page, setPage] = React.useState(<Login />);

    React.useEffect(() => {

        ws.getSocket().onmessage = (e) => {
            console.log('##########');
            const dataParsed: Command = JSON.parse(e.data);

            if (dataParsed.command === 'SetId') {
                setPage(() => <Waiting />);
                const id = dataParsed.id ? dataParsed.id : "";
                ws.setId(id);
                // setId(() => dataParsed.data);
            } else if (dataParsed.command === 'StartGame') {

                setPage(() => <Board {...dataParsed.data} />);
            }
        }
    }, []);

    return <div className={`vh-100 d-flex flex-column align-items-center justify-content-center bg-${color1}`}>
        {page}
    </div>
}

// const drawRandomSymbols = () => {
//     const tilesList = [];
//     for (let i = 0; i < 100; i++) {

//         const tile = <Tile tileSize={100} x={0} y={0} symbol={SymbolEnum.hash} color={ColorEnum.red} />;
//         tilesList.push(tile);
//     }
//     return tilesList;
// }

export default Main;
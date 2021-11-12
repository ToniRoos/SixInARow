import * as React from 'react';
import Board, { BoardState } from './Board/Board';
import { ws } from '../logic/ws';
import Login from './Login/Login';
import { color1, Command } from '../types';
import Waiting from './Waiting/Waiting';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const queryClient = new QueryClient();

const enum Page {
    LOGIN,
    WAITING,
    BOARD
}

const App = () => {

    // const [page, setPage] = React.useState<Page>();
    // const [boardState, setBoardState] = React.useState<BoardState>();

    // React.useEffect(() => {

    //     ws.getSocket().onmessage = (e) => {
    //         console.log('##########');
    //         const dataParsed: Command = JSON.parse(e.data);

    //         if (dataParsed.command === 'SetId') {
    //             setPage(Page.WAITING);
    //             const id = dataParsed.id ? dataParsed.id : "";
    //             ws.setId(id);
    //             // setId(() => dataParsed.data);
    //         } else if (dataParsed.command === 'StartGame') {

    //             setBoardState(dataParsed.data);
    //             setPage(Page.BOARD);
    //         }
    //     }
    // }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <div className={`vh-100 d-flex flex-column align-items-center justify-content-center bg-${color1}`}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/waiting/:sessionId" element={<Waiting />} />
                        <Route path="/bord" element={<Board />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </QueryClientProvider>
    );
};

// const drawRandomSymbols = () => {
//     const tilesList = [];
//     for (let i = 0; i < 100; i++) {

//         const tile = <Tile tileSize={100} x={0} y={0} symbol={SymbolEnum.hash} color={ColorEnum.red} />;
//         tilesList.push(tile);
//     }
//     return tilesList;
// }

export { App };
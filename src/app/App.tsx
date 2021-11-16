import React from 'react';
import { Board } from './Board/Board';
import Login from './Login/Login';
import { color1 } from '../types';
import Waiting from './Waiting/Waiting';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from './routing/routes';
import { AppProvider } from './AppContext';

const queryClient = new QueryClient();

const App = () => {

    return (
        <AppProvider>
            <QueryClientProvider client={queryClient}>
                <div className={`vh-100 d-flex flex-column align-items-center justify-content-center bg-${color1}`}>
                    <BrowserRouter>
                        <Routes>
                            <Route path={routes.login} element={<Login />} />
                            <Route path={`/${routes.waiting}`} element={<Waiting />} />
                            <Route path={`/${routes.board}`} element={<Board />} />
                        </Routes>
                    </BrowserRouter>
                </div>
            </QueryClientProvider>
        </AppProvider>
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
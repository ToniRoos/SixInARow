import React, { Fragment, useEffect } from 'react';
import { useQuery } from 'react-query';
import { GameRunningState } from '../../backend/game2';
import { color1 } from '../../types';
import { getGameStatus, startGame } from '../api/api';
import { Button } from '../components/Button';
import { Modal as Modal } from '../components/Modal';
import { useAppRouter } from '../routing/useAppRouter';
import { useAppContext } from '../useAppContext';
import { PlayersList } from './PlayersList';

const Waiting = () => {

    const { sessionId: id } = useAppContext();
    const { navToBoard } = useAppRouter();
    const { refetch } = useQuery('startGame', () => startGame(id), {
        enabled: false
    });
    const { status, data } = useQuery('players', () => getGameStatus(), {
        refetchInterval: 500
    });

    useEffect(() => {
        if (data && data.state === GameRunningState.started) {
            navToBoard();
        }
    }, [data]);

    if (!data) {
        return <Fragment />;
    }

    const buttonDisabled = data.players.length <= 1;

    return <div className={`vh-100 d-flex flex-column align-items-center justify-content-center bg-${color1}`}>
        <Modal>
            <PlayersList players={data.players} />
            <Button title="Start Game" disabled={buttonDisabled} onClick={refetch} />
        </Modal>
    </div>
}

export default Waiting;
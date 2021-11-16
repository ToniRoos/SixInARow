import { Fragment, FunctionComponent } from "react";
import React from 'react';

import './PlayersListStyle.scss';
import { InputGroup } from "./InputGroup";

interface PlayersListProps {
    players: string[];
}

const PlayersList: FunctionComponent<PlayersListProps> = ({ players }) => {

    const playersRendered = players.map((item, key) => <li key={`Player${key + 1}`}>
        <InputGroup label={`Player ${key + 1}`} value={item} />
    </li>);

    return (
        <Fragment>
            <ul className="playerslist">
                {playersRendered}
            </ul>
        </Fragment>
    );
};

export { PlayersList };
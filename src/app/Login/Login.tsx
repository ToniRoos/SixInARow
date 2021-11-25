
import * as React from 'react';
import { useQuery } from 'react-query';
import { addPlayer } from '../api/api';
import { useAppRouter } from '../routing/useAppRouter';
import { useAppContext } from '../useAppContext';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { UserInput } from './UserInput';

const Login: React.FunctionComponent = () => {

    const { setSessionId } = useAppContext();
    const { navToWaiting } = useAppRouter();
    const [name, setName] = React.useState("");
    const { status, data, refetch } = useQuery('addPlayer', () => addPlayer(name), {
        enabled: false
    });

    React.useEffect(() => {

        if (status === "success" && data) {
            setSessionId(data.id);
            navToWaiting();
        }

    }, [data]);

    const buttonDisabled = name === "";

    return (
        <Modal>
            <UserInput onInput={setName} />
            <Button title="Join Game" disabled={buttonDisabled} onClick={refetch} />
        </Modal>
    );
};

export default Login;
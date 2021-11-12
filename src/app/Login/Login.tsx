
import * as React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import { color1, color2 } from '../../types';
import { addPlayer } from '../api/api';
import { LoginButton } from './LoginButton';
import { LoginModal } from './LoginModal';
import { UserInput } from './UserInput';

const Login: React.FunctionComponent = () => {

    const nav = useNavigate();
    const [name, setName] = React.useState("");
    const { status, data, refetch } = useQuery('repoData', () => addPlayer(name), {
        enabled: false
    });

    console.log(`### ${data}`);

    React.useEffect(() => {

        if (status === "success" && data) {
            nav(`waiting/:${data.id}`);
        }

    }, [data]);

    // if (status === "success") {

    //     if (data) {
    //         nav(`waiting/:${data.id}`);
    //         return <React.Fragment />
    //         // onLoginSuccess(data.id);
    //     }
    // }

    const buttonDisabled = name === "";

    return (
        <div className={`vh-100 d-flex flex-column align-items-center justify-content-center bg-${color1}`}>
            <LoginModal>
                <UserInput onInput={setName} />
                <LoginButton disabled={buttonDisabled} onClick={refetch} />
            </LoginModal>
        </div>
    );
};

export default Login;
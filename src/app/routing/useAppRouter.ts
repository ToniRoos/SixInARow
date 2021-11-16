import { useNavigate } from 'react-router';
import { routes } from './routes';

interface UseRouterType {
    navToWaiting: () => void;
    navToLogin: () => void;
    navToBoard: () => void;
}

const useAppRouter = (): UseRouterType => {

    const nav = useNavigate();

    const navToWaiting = (): void => {
        nav(`../${routes.waiting}`);
    }

    const navToLogin = (): void => {
        nav(routes.login);
    }

    const navToBoard = (): void => {
        nav(`../${routes.board}`);
    }

    return {
        navToWaiting,
        navToLogin,
        navToBoard
    }
}

export { useAppRouter };
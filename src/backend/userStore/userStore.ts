import { createUUID } from "../helper";
import { UserSessionData } from "./UserSessionData";

export interface UserStore {
    createUserSession: (name: string) => string;
    removeSession: (id: string) => void;
    getUserSessions: () => UserSessionData[];
    getSession: (id?: string) => UserSessionData;
    getUserNames: () => string[];
    countUsers: () => number;
}

const userStore = (): UserStore => {

    const userStore: UserSessionData[] = [];

    const getUserSessions = (): UserSessionData[] => {
        return userStore;
    };

    const getSession = (id?: string): UserSessionData => {
        console.log('get session: ', id);
        const session = userStore.filter(item => item.id === id)[0];
        return session;
    };

    const createUserSession = (name: string): string => {

        const id = createUUID();
        const userSessionData = {
            id: id,
            name: name,
            tilesOnHand: [],
            tilesOnTurn: []
        }

        userStore.push(userSessionData);

        console.log(`UserStore => ${userStore.map(userData => `${userData.id} : ${userData.name}`)}`)

        return id;
    };

    const getUserNames = (): string[] => {
        return userStore.map(items => items.name);
    };

    const countUsers = (): number => {
        return userStore.length;
    };

    const removeSession = (id: string): void => {
        console.log('close session: ', id);
        const index = userStore.findIndex(item => item.id === id);
        if (index >= 0) {
            userStore.splice(index, 1);
            console.log('removed id: %s', id);
        }
    }

    return {
        getUserSessions,
        createUserSession,
        countUsers,
        getSession,
        getUserNames,
        removeSession
    };
};

export { userStore };
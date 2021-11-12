
import { createUserStore } from "./userStore/createUserStore";
import { UserStore } from "./userStore/userStore";

export interface Game {
    addPlayer: (name: string) => string;
}

const game2 = (): Game => {

    const userStore: UserStore = createUserStore();

    const addPlayer = (name: string) => {

        const id = userStore.createUserSession(name);
        return id;
    }

    return {
        addPlayer
    };
};

export { game2 };
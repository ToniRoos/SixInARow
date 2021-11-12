import { SessionId } from "../../types";

const addPlayer = (name: string): Promise<SessionId> => fetch(`/api/addPlayer/${name}`).then(res =>
    res.json()
)

export {
    addPlayer
};
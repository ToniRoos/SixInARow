interface HttpError {
    status: number;
    message: string;
}
const createError = (status: number, message: string): HttpError => {

    return {
        message: message,
        status: status
    };
}

const unknownPlayerError = () => createError(400, "Player is unknown.");

export {
    createError,
    unknownPlayerError
}
class FetchError extends Error {
    constructor(message, status) {
        super(message);

        this.name = 'FetchError';
        this.status = status;
    }
}

module.exports = { FetchError }
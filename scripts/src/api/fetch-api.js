const { FetchError } = require('../utils');

const fetchApi = async (url, init) => {
    if (init) {
        init.headers = {
            ...init.headers,
            Accept: 'application/json'
        }
    }

    try {
        const resp = await fetch(
            `${ process.env.PORTFOLIO_API_URL }${ url }`,
            init
        );

        if (!resp.ok) {
            const data = await resp.json();

            throw {
                message: data?.message,
                status: data?.status || resp.status
            }
        };

        return await resp.json();
    } 
    catch (error) {
        console.log(error);

        throw new FetchError(
            (error)?.message || 'Ocurrio un error inesperado. Por favor intentalo más tarde.',
            (error)?.status || 500
        );
    }
}

module.exports = fetchApi;
import dotenv from 'dotenv';
dotenv.config();

import { get } from 'env-var';

export const env = {
    PORTFOLIO_API_URL: get('PORTFOLIO_API_URL').required().asString(),
    PORTFOLIO_BANNER_URL: get('PORTFOLIO_BANNER_URL').required().asString(),
    PORTFOLIO_URL: get('PORTFOLIO_URL').required().asString(),
}
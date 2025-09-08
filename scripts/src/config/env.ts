import dotenv from 'dotenv';
dotenv.config();

import { get } from 'env-var';

export const env = {
    LOGTAIL_SOURCE_TOKEN: get('LOGTAIL_SOURCE_TOKEN').required().asString(),
    LOGTAIL_SOURCE_URL: get('LOGTAIL_SOURCE_URL').required().asUrlString(),

    PORTFOLIO_API_URL: get('PORTFOLIO_API_URL').required().asUrlString(),
    PORTFOLIO_BANNER_URL: get('PORTFOLIO_BANNER_URL').required().asUrlString(),
    PORTFOLIO_URL: get('PORTFOLIO_URL').required().asUrlString(),
}
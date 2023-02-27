import jwt = require('jsonwebtoken');

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DATABASE_URI: string | jwt.Secret;
            ACCESS_TOKEN_SECRET: string | jwt.Secret;
            REFRESH_TOKEN_SECRET: string | jwt.Secret;
            ENV?: 'test' | 'dev' | 'prod';
        }
    }
}

export { };
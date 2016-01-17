'use strict';

var config = {
    CLIENT_SECRET: './app/backend/client_secret.json',
    TOKEN_DIR: './app/backend/.credentials/',
    SCOPES: [
        'https://www.googleapis.com/auth/gmail.readonly'
    ]
};

config.TOKEN_PATH = config.TOKEN_DIR + 'auth.json';

module.exports = config;
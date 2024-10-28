const jwt = require('jsonwebtoken');

const {
    ACCESS_TOKEN_TYPE,
    REFRESH_TOKEN_TYPE,
    ACCESS_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_EXPIRES_IN
} = require('../configs/constants');
const {UNAUTHORIZED} = require("../configs/response-сodes");
const ErrorHandler = require("../errors/error-handler");

module.exports = {
    generateTokenPair: (user) => {
        const access_token = jwt.sign({user}, ACCESS_TOKEN_TYPE, {expiresIn: ACCESS_TOKEN_EXPIRES_IN});
        const refresh_token = jwt.sign({user}, REFRESH_TOKEN_TYPE, {expiresIn: REFRESH_TOKEN_EXPIRES_IN});

        return {
            access_token,
            refresh_token
        }
    },

    verifyToken: (token, tokenType = ACCESS_TOKEN_TYPE) => {
        try {
            const word = tokenType === ACCESS_TOKEN_TYPE ? ACCESS_TOKEN_TYPE : REFRESH_TOKEN_TYPE;

            return jwt.verify(token, word);
        } catch (e) {
            throw new ErrorHandler(UNAUTHORIZED, 'Unauthorized!');
        }

    }

};
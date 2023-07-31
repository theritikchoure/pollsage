const env = require("../config/env");
const requireAccessToken = require("../src/middleware/require-access-token");
const jwt = require('jsonwebtoken');

describe('requireAccessToken_function', () => {

    // Tests that the function calls the next middleware when the request origin matches one of the allowed CORS origins
    it('calls next middleware when origin matches', () => {
        const req = { get: jest.fn(() => env.CORS_ORIGIN[0]) };
        const res = {};
        const next = jest.fn();

        requireAccessToken(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    // Tests that the function returns a 401 Unauthorized error when the request origin does not match any of the allowed CORS origins
    it('returns 401 Unauthorized when origin does not match', () => {
        const req = { get: () => 'valid-origin', headers : { 'x-access-token': 'valid-token' } };
        const res = { status: jest.fn(() => ({ send: jest.fn() })) };
        const next = jest.fn();

        requireAccessToken(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
    });

    // Tests that the function calls the next middleware when the access token is valid
    it('calls next middleware when access token is valid', () => {
        const req = { get: () => 'valid-origin', headers: { 'x-access-token': 'valid-token' } };
        const res = {};
        const next = jest.fn();
        jwt.verify = jest.fn((token, key, callback) => callback(null, {}));

        requireAccessToken(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    // Tests that the function returns a 401 Unauthorized error when there is no access token in the request headers
    it('returns 401 Unauthorized when access token is missing', () => {
        const req = { get: () => 'valid-origin', headers: {}};
        const res = { status: jest.fn(() => ({ send: jest.fn() })) };
        const next = jest.fn();

        requireAccessToken(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
    });

    // Tests that the function returns a 401 Unauthorized error when the access token is invalid
    it('returns 401 Unauthorized when access token is invalid', () => {
        const req = { get: () => 'valid-origin', headers: { 'x-access-token': 'invalid-token' } };
        const res = { status: jest.fn(() => ({ send: jest.fn() })) };
        const next = jest.fn();
        jwt.verify = jest.fn((token, key, callback) => callback(new Error('invalid token')));

        requireAccessToken(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
    });
});

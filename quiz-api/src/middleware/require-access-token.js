const jwt = require('jsonwebtoken');
const env = require('../../config/env');

const requireAccessToken = (req, res, next) => {

    console.log(req.get('origin'));

    for(let i = 0; i < env.CORS_ORIGIN.length; i++) {
        console.log(env.CORS_ORIGIN[i]);
        if(req.get('origin') === env.CORS_ORIGIN[i]) {
            return next();
        }
    }

    const accessToken = req.headers["x-access-token"];
    if (!accessToken) {
        return res.status(401).send('Unauthorized, token not found');
    }

    if(accessToken) {
        // return next();
        jwt.verify(accessToken, 'access-token-key', (err, decoded) => {
            if (err) {
                return res.status(401).send('Unauthorized');
            }

            // If the token is valid, you can optionally store the decoded data in the request object for further use
            next();
          });
    }
}

module.exports = requireAccessToken;
  
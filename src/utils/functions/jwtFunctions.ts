import jwt from 'jsonwebtoken';
import config from '../../config';

function makeJwtToken(payload: any,expiresIn: string='1h') {
  return jwt.sign(payload, config.jwtSecret, { expiresIn });
}

export { makeJwtToken}
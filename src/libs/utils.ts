import { uid } from 'uid';
import { v4 as uuidv4 } from 'uuid';
import sanitizedConfig from '../config';

function generateToken(): string {
  return uuidv4();
}
function generateCode(): string {
  return uid(16);
}
function generateAccessTokenExpiration(): Date {
  return new Date(Date.now() + sanitizedConfig.accessTokenExp * 1000);
}
function generateRefreshTokenExpiration(): Date {
  return new Date(Date.now() + sanitizedConfig.refreshTokenExp * 1000);
}

export {
  generateToken,
  generateCode,
  generateAccessTokenExpiration,
  generateRefreshTokenExpiration,
};

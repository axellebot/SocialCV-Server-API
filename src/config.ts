/* eslint-disable no-undef */
import * as dotenv from 'dotenv';

// eslint-disable-next-line no-undef
dotenv.config({ path: `../.env.${process.env.NODE_ENV}` });

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all

interface ENV {
  NODE_ENV: string | undefined;
  PORT: number | undefined;
  SECRET: string | undefined;
  SALT_WORK_FACTOR: number | undefined;
  DB_HOST: string | undefined;
  DB_PORT: number | undefined;
  DB_USERNAME: string | undefined;
  DB_PASSWORD: string | undefined;
  DB_NAME: string | undefined;
  ACCESS_TOKEN_EXP: number | undefined;
  REFRESH_TOKEN_EXP: number | undefined;
}

interface Config {
  env: string;
  port: number;
  secret: string;
  saltWorkFactor: number;
  databaseHost: string;
  databasePort: number;
  databaseUsername: string;
  databasePassword: string;
  databaseName: string;
  accessTokenExp: number;
  refreshTokenExp: number;
}

// Loading process.env as ENV interface
const getConfig = (): ENV => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    SECRET: process.env.SECRET,
    SALT_WORK_FACTOR: process.env.SALT_WORK_FACTOR
      ? Number(process.env.SALT_WORK_FACTOR)
      : undefined,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: Number(process.env.DB_PORT),
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    ACCESS_TOKEN_EXP: process.env.ACCESS_TOKEN_EXP
      ? Number(process.env.ACCESS_TOKEN_EXP)
      : undefined,
    REFRESH_TOKEN_EXP: process.env.REFRESH_TOKEN_EXP
      ? Number(process.env.REFRESH_TOKEN_EXP)
      : undefined,
  };
};

// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.
const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }

  return {
    env: config.NODE_ENV,
    port: config.PORT,
    secret: config.SECRET,
    saltWorkFactor: config.SALT_WORK_FACTOR,
    databaseHost: config.DB_HOST,
    databasePort: config.DB_PORT,
    databaseUsername: config.DB_USERNAME,
    databasePassword: config.DB_PASSWORD,
    databaseName: config.DB_NAME,
    accessTokenExp: config.ACCESS_TOKEN_EXP,
    refreshTokenExp: config.REFRESH_TOKEN_EXP,
  } as Config;
};

const envConfig = getConfig();
const sanitizedConfig: Config = getSanitzedConfig(envConfig);

export default sanitizedConfig;

import { Connection, createConnection } from 'typeorm';
import config from './config';

const connection: Connection = await createConnection({
  type: 'postgres',
  host: config.databaseHost,
  port: config.databasePort,
  username: config.databaseUsername,
  password: config.databasePassword,
  database: config.databaseName,
});

export default connection;

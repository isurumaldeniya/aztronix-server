import express from 'express';
import authentication from './authentication';
import users from './users';
import device from './device';

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  device(router);
  return router;
};

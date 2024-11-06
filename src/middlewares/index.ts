import express from 'express';
import { get, merge } from 'lodash';

import { getUserBySessionToken } from '../db/users';

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    console.log('i am111111111')
    const sessionTaken = req.cookies['auth-token'] || req.headers['authorization'];
    console.log(sessionTaken)

    if (!sessionTaken) {
      return res.sendStatus(403);
    }

    const isSessionExist = await getUserBySessionToken(sessionTaken);

    if (!isSessionExist) {
      return res.sendStatus(403);
    }

    merge(req, { identity: isSessionExist });

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(403);
  }
};

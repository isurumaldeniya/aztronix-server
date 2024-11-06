import express from 'express';
import { createUser, getUserByEmail } from '../db/users';
import { authentication, random } from '../helpers';

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { username, password, email, orgName, userId, orgId } = req.body;

    if (!email || !password || !username) {
      return res.sendStatus(400);
    }
    const isUserExist = await getUserByEmail(email);

    if (isUserExist) {
      return res.status(400).json('User already exist').end();
    }

    const salt = random();

    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
      userId,
      orgName,
      orgId,
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json('Please provide a valid email or password');
    }

    // make sure to select salt and password when getting the user
    const user = await getUserByEmail(email).select(
      '+authentication.salt +authentication.password'
    );

    if (!user) {
      return res.status(400).json('User not Found').end();
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password !== expectedHash) {
      return res.status(403).json('Email or Password is incorrect').end();
    }

    const salt = random();
    user.authentication.sessionTaken = authentication(
      salt,
      user._id.toString()
    );
    await user.save();
    res.cookie('AUTH-TOKEN', user.authentication.sessionTaken, {
      domain: 'localhost',
      path: '/',
    });

    return res.status(200).json(user).end();
  
  } catch (error) {
    console.log(error);
    return res.status(400).json('Invalid username or password').end();
  }
};

import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

import User from '../models/user';

export const index = (req: Request, res: Response) => {
  const languages: Array<object> = [
    { language: 'Spanish' },
    { language: "French" },
    { langauge: "German" },
    { language: "Arabic" }
  ];
  res.json(languages);
};

export const users = (req: Request, res: Response) => {
    const users: Array<User> = [
        new User(1, 'jcoonce', 'james@none.com', 'test'),
        new User(2, 'jimcoonce', 'jim@none.com', 'test'),
        new User(3, 'jcoonce', 'norman@none.com', 'test'),
    ]
    res.json(users);
};

export const user = (req: Request, res: Response) => {
  const { id } = req.params
  const user: User = [
      new User(1, 'jcoonce', 'james@none.com', 'test'),
      new User(2, 'jimcoonce', 'jim@none.com', 'test'),
      new User(3, 'jcoonce', 'norman@none.com', 'test'),
  ][id]
  if (user) {
    res.json(user);
  } else {
    res.status(401).send(`User with id ${id} not found`);  
  }
};

export const create = (req: Request, res: Response) => {
    const user: User = new User(req.body.id, req.body.username, req.body.email, req.body.password);
    res.json(user);
};

export const login = (req: Request, res: Response) => {
  const users: Array<User> = [
    new User(1, 'jcoonce', 'james@none.com', 'test'),
    new User(2, 'jimcoonce', 'jim@none.com', 'test'),
    new User(3, 'jcoonce', 'norman@none.com', 'test'),
  ]
  const { username, password } = req.body;
  if (username && password) {
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      const payload = {
        sub: user.id,
        username: user.username
      };
      const token = jwt.sign(payload, 'mysupersecretkey', {expiresIn: '3 hours'})
      res.status(200).send({ access_token: token });
    } else {
      res.status(401).send(`User: ${username}. Not found`);  
    }
  } else {
    res.status(400).send(`Username & password are required`);
  }
}
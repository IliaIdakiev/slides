import 'zone.js';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { JsonWebTokenError, TokenExpiredError, NotBeforeError } from 'jsonwebtoken';

// token for petar eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNDkyOTMxMzk5fQ.9oR56HgCeMFaLlGFMQ-SICDC8ZWaN31UvVDAJQnzLno
// token for ivan eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNDkyOTMxMzk5fQ.9oR56HgCeMFaLlGFMQ-SICDC8ZWaN31UvVDAJQnzLno

const SECRET = 'SECRET';
const users = [{
  id: 0,
  firstName: 'Ivan',
  lastName: 'Ivanov'
}, {
  id: 1,
  firstName: 'Petar',
  lastName: 'Petrov'
}];

var app = express();

app.use((req: Request, res: Response, next: Function): void => {
  var token: string = (<any>req.headers)['x-access-token'];

  if (!token) {
    Zone.current.fork({
      name: 'unauthenticated'
    }).run(() => next());
    return;
  }

  jwt.verify(token, SECRET, null, (err: JsonWebTokenError | TokenExpiredError | NotBeforeError, decoded: any) => {
    if (err) {
      Zone.current.fork({
        name: 'error'
      }).run(() => next(err));
      return;
    }

    const user = users[decoded.id];
    Zone.current.fork({
      name: 'user-' + user.id,
      properties: user
    }).run(() => next());
  });
});

const auth = (req: Request, res: Response, next: Function) => {
  if (Zone.current.get('id') === undefined) {
    res.status(401).send('Unauthorized 401').end();
    return;
  }
  next();
};

app.get('/', (req, res) => {
  res.send('Hello world').end();
});

app.get('/protected', auth, (req, res) => {
  res.send(`Hello ${Zone.current.get('firstName')} ${Zone.current.get('lastName')}! Only logged users can see this!`).end();
});

app.listen(3000, () => console.log('Server listening on ', 3000));

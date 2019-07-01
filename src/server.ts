import express, { Application } from 'express';
import compression from 'compression';
import cors from 'cors';

import * as homeController from './controllers/home';

class Server {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  public config(): void {
    this.app.set('port', process.env.PORT || 8888);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(compression());
    this.app.use(cors());
  }

  public start(): void {
    const PORT = this.app.get('port');
    this.app.listen(PORT, () => {
      console.log(`Example app listening on port http://localhost:${PORT}`);
    })
  }

  public routes(): void {
    this.app.get('/', homeController.index);
    this.app.get('/users', homeController.users);
    this.app.get('/users/:id', homeController.user);
    this.app.post('/users/create', homeController.create);
    this.app.post('/login', homeController.login);
  }
}

const server = new Server()
server.start();

import Express from 'express';
const router = Express.Router();
import { newRequest } from '../controllers/friend.controller.js';

export default (app) => {
  // Create a new Tutorial
  router.post('/invite', newRequest);

  app.use('/api/friends', router);
};

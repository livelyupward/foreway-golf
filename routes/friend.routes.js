import Express from 'express';
const router = Express.Router();
import { newRequest, checkPendingRequests } from '../controllers/friend.controller.js';

export default (app) => {
  // Create a new Tutorial
  router.get('/requests/:id', checkPendingRequests);
  router.post('/invite', newRequest);

  app.use('/api/friends', router);
};

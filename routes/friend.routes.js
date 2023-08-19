import Express from 'express';
const router = Express.Router();
import { newRequest, checkPendingRequests, denyFriendRequest } from '../controllers/friend.controller.js';

export default (app) => {
  // Create a new Tutorial
  router.get('/requests/:id', checkPendingRequests);
  router.post('/invite', newRequest);
  router.delete('/requests/deny/:id', denyFriendRequest);

  app.use('/api/friends', router);
};

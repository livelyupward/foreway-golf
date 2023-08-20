import Express from 'express';
const router = Express.Router();
import {
  newRequest,
  checkPendingRequests,
  denyFriendRequest,
  getFriendsForUser,
} from '../controllers/friend.controller.js';

export default (app) => {
  router.get('/:id', getFriendsForUser);
  router.get('/requests/:id', checkPendingRequests);
  router.post('/invite', newRequest);
  router.delete('/requests/deny/:id', denyFriendRequest);

  app.use('/api/friends', router);
};

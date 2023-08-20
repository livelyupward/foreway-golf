import Express from 'express';
const router = Express.Router();
import {
  newRequest,
  checkPendingRequests,
  denyFriendRequest,
  getFriendsForUser,
  approveFriendRequest,
} from '../controllers/friend.controller.js';

export default (app) => {
  router.get('/:id', getFriendsForUser);
  router.get('/requests/:id', checkPendingRequests);
  router.post('/invite', newRequest);
  router.put('/requests/approve/:id', approveFriendRequest);
  router.delete('/requests/deny/:id', denyFriendRequest);

  app.use('/api/friends', router);
};

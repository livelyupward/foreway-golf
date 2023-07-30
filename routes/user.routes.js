import Express from 'express';
const router = Express.Router();
import {
  create,
  findOne,
  findAll,
  update,
  deleteOne,
  deleteAll,
  updateRoundTotalPreference,
} from '../controllers/user.controller.js';

export default (app) => {
  // Create a new User
  router.post('/', create);

  // Retrieve all Users
  router.get('/', findAll);

  // Retrieve a single User with id
  router.get('/:email', findOne);

  // Update a User with id
  router.put('/:id', update);

  // Update a User roundTotal setting
  router.put('/:id/round-total', updateRoundTotalPreference);

  // Delete a User with id
  router.delete('/:id', deleteOne);

  // Delete all Users
  router.delete('/', deleteAll);

  app.use('/api/users', router);
};

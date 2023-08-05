import Express from 'express';
const router = Express.Router();
import {
  create,
  findOne,
  findAll,
  update,
  getRecentRounds,
  deleteOne,
  deleteAll,
  findAllForUser,
  getYearStats,
} from '../controllers/round.controller.js';

export default (app) => {
  // Create a new Round
  router.post('/', create);

  // Retrieve all Rounds
  router.get('/', findAll);

  // Retrieve all user Rounds
  router.get('/:id/all', findAllForUser);

  // Retrieve a single Round with id
  router.get('/:id', findOne);

  // Retrieve stats for year
  router.get('/stats/:id', getYearStats);

  // Update a Round with id
  router.put('/:id', update);

  // Retrieve 5 recent items
  router.get('/:id/recent', getRecentRounds);

  // Delete a Round with id
  router.delete('/:id', deleteOne);

  // Delete all Rounds
  router.delete('/', deleteAll);

  app.use('/api/round', router);
};

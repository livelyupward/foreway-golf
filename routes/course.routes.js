import Express from 'express';
const router = Express.Router();
import { create, findOne, findAll, update, deleteOne, deleteAll } from '../controllers/course.controller.js';

export default (app) => {
  // Create a new Tutorial
  router.post('/', create);

  // Retrieve all Tutorials
  router.get('/', findAll);

  // Retrieve a single Tutorial with id
  router.get('/:id', findOne);

  // Update a Tutorial with id
  router.put('/:id', update);

  // Delete a Tutorial with id
  router.delete('/:id', deleteOne);

  // Delete all Tutorials
  router.delete('/', deleteAll);

  app.use('/courses', router);
};

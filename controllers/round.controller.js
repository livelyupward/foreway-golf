import db from '../models/index.js';
const Round = db.rounds;

// Create and Save a new Round
export const create = (req, res) => {
  if (!req.body.courseId)
    return res.status(400).send({ error: 'No course id found. Please provide a course id to create a new round.' });

  if (!req.body.userId)
    return res.status(400).send({ error: 'No user id found. Please provide a user id to create a new round.' });
  // Create a Round
  const round = {
    courseId: req.body.courseId,
    userId: req.body.userId,
  };

  // Save Round in the database
  Round.create(round)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Round.',
      });
    });
};

// Retrieve all Courses from the database.
export const findAll = (req, res) => {
  Round.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving tutorials.',
      });
    });
};

// Find a single Round with an id
export const findOne = (req, res) => {
  const id = req.params.id;

  Round.findByPk(id, { include: ['scores'] })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Tutorial with id=' + id,
      });
    });
};

// Update a Round by the id in the request
export const update = (req, res) => {
  const id = req.params.id;

  Round.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: 'Tutorial was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Tutorial with id=' + id,
      });
    });
};

// Delete a Round with the specified id in the request
export const deleteOne = (req, res) => {
  const id = req.params.id;

  Round.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: 'Tutorial was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Tutorial with id=' + id,
      });
    });
};

// Delete all Courses from the database.
export const deleteAll = (req, res) => {
  Round.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all tutorials.',
      });
    });
};

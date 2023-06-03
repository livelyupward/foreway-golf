import db from '../models/index.js';
const Course = db.courses;
const { Op } = db.Sequelize;

// Create and Save a new Course
export const create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  // Create a Course
  const course = {
    name: req.body.name,
    holes: req.body.holes,
    holeCount: req.body.holeCount,
  };

  // Save Course in the database
  Course.create(course)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Course.',
      });
    });
};

// Retrieve all Courses from the database.
export const findAll = (req, res) => {
  const title = req.query.title;
  const holes = req.query.holes;
  const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Course.findAll({ where: condition, include: holes ? ['holes'] : '' })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving tutorials.',
      });
    });
};

// Find a single Course with an id
export const findOne = (req, res) => {
  const id = req.params.id;

  Course.findByPk(id, { include: ['holes'] })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Course with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Course with id=' + id,
      });
    });
};

// Update a Course by the id in the request
export const update = (req, res) => {
  const id = req.params.id;

  Course.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: 'Course was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update Course with id=${id}. Maybe Course was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Course with id=' + id,
      });
    });
};

// Delete a Course with the specified id in the request
export const deleteOne = (req, res) => {
  const id = req.params.id;

  Course.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: 'Course was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Course with id=${id}. Maybe Course was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Course with id=' + id,
      });
    });
};

// Delete all Courses from the database.
export const deleteAll = (req, res) => {
  Course.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Courses were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all tutorials.',
      });
    });
};

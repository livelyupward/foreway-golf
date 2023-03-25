import db from '../models/index.js';
const User = db.users;
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
  const user = {
    name: req.body.name,
    email: req.body.email,
  };

  // Save Course in the database
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the User.',
      });
    });
};

// Retrieve all Courses from the database.
export const findAll = (req, res) => {
  const name = req.query.name;
  const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  User.findAll({ where: condition })
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
  const email = req.params.email;
  console.log('Email is ', email);
  User.findAll({
    where: {
      email: email,
    },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${email}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving User with email=' + email,
      });
    });
};

// Update a Course by the id in the request
export const update = (req, res) => {
  const id = req.params.id;
  const roundId = req.query.roundId;

  User.update(
    { currentRound: roundId },
    {
      where: { id: id },
    }
  )
    .then((num) => {
      if (num === 1) {
        res.send({
          message: 'User was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating User with id=' + id,
      });
    });
};

// Delete a Course with the specified id in the request
export const deleteOne = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: 'User was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete User with id=' + id,
      });
    });
};

// Delete all Courses from the database.
export const deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all tutorials.',
      });
    });
};

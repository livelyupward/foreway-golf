import db from '../models/index.js';
const User = db.users;
const { Op } = db.Sequelize;

// Create and Save a new Course
export const create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.email) {
    res.status(400).send({
      message: 'Google email or name was not found.',
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
    include: { all: true },
  })
    .then((data) => {
      if (data.length) {
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
        error: err,
      });
    });
};

// Update a Course by the id in the request
export const update = (req, res) => {
  const id = req.params.id;
  // const closedSent = req.body.closed;
  const roundId = req.query.roundId;

  if (req.body.currentRound === null) {
    User.update(
      { currentRound: null },
      {
        where: { id: id },
      }
    )
      .then((result) => {
        console.log('result: ', result);
        if (result[0] === 1) {
          res.send({
            message: 'Round was closed successfully for the user.',
          });
        } else {
          res.send({
            message: `Cannot close round for user with id=${id}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error updating User with id=' + id,
        });
      });
  } else {
    User.update(
      { currentRound: roundId },
      {
        where: { id: id },
      }
    )
      .then((result) => {
        console.log('result: ', result);
        if (result[0] === 1) {
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
  }
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

export const updateRoundTotalPreference = (req, res) => {
  const userId = req.params.id;

  User.update(
    { showRoundTotals: req.body.showRoundTotals },
    {
      where: {
        id: userId,
      },
    }
  )
    .then((response) => {
      console.log('New setting: ', response);
      res.status(200).send({ response });
    })
    .catch((error) => {
      res.status(400).send({ error });
    });
};

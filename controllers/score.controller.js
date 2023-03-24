import db from '../models/index.js';
const Score = db.scores;
const { Op } = db.Sequelize;

// Create and Save a new Score
export const create = (req, res) => {
  // Validate request
  if (!req.body.strokes) {
    res.status(400).send({
      message: 'strokes cannot be empty!',
    });
    return;
  }

  // Create a Score
  const score = {
    strokes: req.body.strokes,
    gir: req.body.gir,
    fairway: req.body.fairway,
    roundId: req.body.roundId,
    holeId: req.body.holeId,
    userId: req.body.userId,
  };

  // Save Score in the database
  Score.create(score)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Score.',
      });
    });
};

// Retrieve all Scores from the database.
export const findAll = (req, res) => {
  const title = req.query.title;
  const holes = req.query.holes;
  const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Score.findAll({ where: condition, include: holes ? ['holes'] : '' })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving tutorials.',
      });
    });
};

// Find a single Score with an id
export const findOne = (req, res) => {
  const id = req.params.id;

  Score.findByPk(id, { include: ['holes'] })
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

// Update a Score by the id in the request
export const update = (req, res) => {
  const id = req.params.id;

  Score.update(req.body, {
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

// Delete a Score with the specified id in the request
export const deleteOne = (req, res) => {
  const id = req.params.id;

  Score.destroy({
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

// Delete all Scores from the database.
export const deleteAll = (req, res) => {
  Score.destroy({
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

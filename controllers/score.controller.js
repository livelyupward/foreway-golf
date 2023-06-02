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
    putts: req.body.putts,
    gir: req.body.gir,
    fairway: req.body.fairway,
    hazard: req.body.hazard,
    penalty: req.body.penalty,
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
          message: `Cannot find Score with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Score with id=' + id,
      });
    });
};

// Update a Score by the id in the request
export const update = (req, res) => {
  const id = req.params.id;

  Score.update(req.body, {
    where: { id: id },
  })
    .then(async (stuff) => {
      if (stuff[0] === 1) {
        const updatedRow = await Score.findByPk(id);

        res.send({
          ...updatedRow.dataValues,
        });
      } else {
        res.status(400).send({
          error: `Cannot update Score with id=${id}. Please try again.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Score with id=' + id,
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
          message: 'Score was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Score with id=${id}. Maybe Score was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Score with id=' + id,
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
      res.send({ message: `${nums} Scores were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all tutorials.',
      });
    });
};

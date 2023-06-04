import db from '../models/index.js';
const Round = db.rounds;

// Create and Save a new Round
export const create = (req, res) => {
  let errors = [];
  if (!req.body.courseId)
    errors.push({ message: 'No course id found. Please provide a course id to create a new round.' });

  if (!req.body.userId) errors.push({ message: 'No user id found. Please provide a user id to create a new round.' });

  if (!req.body.tees)
    errors.push({ message: 'No tee for round was found. Please provide a tee color to create a new round.' });

  if (errors.length > 0) return res.status(400).send({ errors });
  // Create a Round
  const round = {
    courseId: req.body.courseId,
    userId: req.body.userId,
    tees: req.body.tees,
    groupId: req.body.groupId || null,
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
        let sortedScoresArray = [];
        let convertedDataModel = data.toJSON();

        if (convertedDataModel.scores.length > 0) {
          convertedDataModel.scores.forEach((scoreObject) => {
            sortedScoresArray[scoreObject.holeId - 1] = scoreObject;
          });

          convertedDataModel.scores = sortedScoresArray;
          return res.send(convertedDataModel);
        } else {
          return res.send(data);
        }
      } else {
        res.status(404).send({
          message: `Cannot find Round with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: err,
        message: 'Error retrieving Round with id=' + id,
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
      if (num[0] === 1) {
        res.send({
          message: 'Round was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update Round with id=${id}. Maybe Round was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Round with id=' + id,
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
          message: 'Round was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Round with id=${id}. Maybe Round was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Round with id=' + id,
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
      res.send({ message: `${nums} Rounds were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all tutorials.',
      });
    });
};

export const getRecentRounds = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log('REQ id: ', userId);
    const receivedRoundsForUser = await Round.findAll({
      where: { userId, closed: true },
      include: ['courses'],
      limit: 5,
      order: [['updatedAt', 'DESC']],
    });

    res.status(200).send(receivedRoundsForUser);
  } catch (error) {
    res.status(400).send({ error });
  }
};

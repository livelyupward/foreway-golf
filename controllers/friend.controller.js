import db from '../models/index.js';
const Friend = db.friends;
const User = db.users;
const { Sequelize } = db.Sequelize;

// Create and Save a new Course
export const newRequest = async (req, res) => {
  console.dir(req.body);
  // Validate request
  if (!req.body.userId || !req.body.friendEmail) {
    return res.status(400).send({
      error: 'Current user id or target email is undefined.',
    });
  }

  const userFoundByEmail = await User.findOne({ where: { email: req.body.friendEmail } });

  if (!userFoundByEmail) {
    return res.status(404).send({
      status: 404,
      error: `No user found for email ${req.body.friendEmail}`,
    });
  }

  const friendId = userFoundByEmail.id;

  const newFriendship = await Friend.create({
    userId: req.body.userId,
    friendId: friendId,
    status: 'pending',
  });

  res.status(201).send(newFriendship);
};

export const checkPendingRequests = async (req, res) => {
  try {
    const userId = req.params.id;
    const requestsForMe = await Friend.findAll({
      where: {
        userId: userId,
      },
      include: { all: true },
    });

    const requestsFromFriends = await Friend.findAll({
      where: {
        friendId: userId,
      },
      include: { all: true },
    });

    res.status(200).send({ requestsForMe, requestsFromFriends });
  } catch (error) {
    res.status(500).send(error);
  }
};

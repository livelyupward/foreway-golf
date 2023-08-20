import db from '../models/index.js';
const Friend = db.friends;
const User = db.users;
const { Sequelize } = db.Sequelize;
const Op = Sequelize.Op;

export const getFriendsForUser = async (req, res) => {
  const userId = req.params.id;
  console.log('id: ', userId);
  if (!userId) return res.status(400).send({ error: 'No user id provided.' });

  try {
    const userFriends = await Friend.findAll({
      where: {
        [Op.or]: [{ userId }, { friendId: userId }],
        status: 'accepted',
      },
      include: ['sendingUser', 'receivingUser'],
    });

    res.status(200).send(userFriends);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

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
        status: 'pending',
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

export const denyFriendRequest = async (req, res) => {
  const requestId = req.params.id;

  try {
    await Friend.destroy({ where: { id: requestId } });

    res.status(200).send({ message: 'Request deleted successfully.' });
  } catch (error) {
    res.status(500).send(error);
  }
};

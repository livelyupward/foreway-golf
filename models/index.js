import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',

  pool: {
    max: 10000,
    min: 10,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

import holeModel from './hole.model.js';
import courseModel from './course.model.js';
import roundModel from './round.model.js';
import scoreModel from './score.model.js';
import userModel from './user.model.js';

db.holes = holeModel(sequelize, Sequelize);
db.courses = courseModel(sequelize, Sequelize);
db.rounds = roundModel(sequelize, Sequelize);
db.scores = scoreModel(sequelize, Sequelize);
db.users = userModel(sequelize, Sequelize);

// course and hole relations
db.courses.hasMany(db.holes, { as: 'holes' });
db.holes.belongsTo(db.courses, {
  foreignKey: 'courseId',
  as: 'course',
});

// course and round relations
db.courses.hasMany(db.rounds, { as: 'rounds' });
db.rounds.belongsTo(db.courses, {
  foreignKey: 'courseId',
  as: 'course',
});

// round and score relations
db.rounds.hasMany(db.scores, { as: 'scores' });
db.scores.belongsTo(db.rounds, {
  foreignKey: 'roundId',
  as: 'round',
});

// score and hole relations
db.holes.hasMany(db.scores, { as: 'scores' });
db.scores.belongsTo(db.holes, {
  foreignKey: 'holeId',
  as: 'hole',
});

// user and score relations
db.users.hasMany(db.scores, { as: 'scores' });
db.scores.belongsTo(db.users, {
  foreignKey: 'userId',
  as: 'user',
});

// user and round relations
db.users.hasMany(db.rounds, { as: 'round' });
db.rounds.belongsTo(db.users, {
  foreignKey: 'userId',
  as: 'user',
});

export default db;

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

import courseModel from './course.model.js';
import holeModel from './hole.model.js';
import roundModel from './round.model.js';
import scoreModel from './score.model.js';
import userModel from './user.model.js';

db.courses = courseModel(sequelize, Sequelize);
db.holes = holeModel(sequelize, Sequelize);
db.rounds = roundModel(sequelize, Sequelize);
db.scores = scoreModel(sequelize, Sequelize);
db.users = userModel(sequelize, Sequelize);

// course and hole relations
db.courses.hasMany(db.holes, { as: 'holes' });
db.holes.belongsTo(db.courses, {
  foreignKey: 'courseId',
  as: 'course',
});

// round and score relations
db.rounds.hasMany(db.scores, { as: 'scores' });
db.scores.belongsTo(db.rounds, {
  foreignKey: 'roundId',
  as: 'round',
});

// user and score relations
db.users.hasMany(db.scores, { as: 'scores' });
db.scores.belongsTo(db.users, {
  foreignKey: 'userId',
  as: 'user',
});

export default db;

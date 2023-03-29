export default (sequelize, Sequelize) => {
  return sequelize.define(
    'course',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
      },
      zip: {
        type: Sequelize.STRING,
      },
      holeCount: {
        type: Sequelize.INTEGER,
      },
      phoneNumber: {
        type: Sequelize.STRING,
      },
      webpage: {
        type: Sequelize.STRING,
      },
      courseImage: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: true,
    }
  );
};

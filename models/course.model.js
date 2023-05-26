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
      about: {
        type: Sequelize.STRING,
        required: false,
      },
      holeCount: {
        type: Sequelize.INTEGER,
      },
      tees: {
        type: Sequelize.JSON,
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
      about: Sequelize.STRING,
    },
    {
      timestamps: true,
    }
  );
};

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
      city: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
      },
      holeCount: {
        type: Sequelize.INTEGER,
      },
    },
    {
      timestamps: true,
    }
  );
};

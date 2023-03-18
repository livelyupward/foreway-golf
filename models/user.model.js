export default (sequelize, Sequelize) => {
  return sequelize.define(
    'user',
    {
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      currentRound: {
        type: Sequelize.INTEGER,
      },
    },
    {
      timestamps: true,
    }
  );
};

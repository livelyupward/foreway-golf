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
      showRoundTotals: Sequelize.BOOLEAN,
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
};

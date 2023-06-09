export default (sequelize, Sequelize) => {
  return sequelize.define(
    'gameType',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
};

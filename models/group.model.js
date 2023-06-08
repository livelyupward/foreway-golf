export default (sequelize, Sequelize) => {
  return sequelize.define(
    'group',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      holeCount: Sequelize.INTEGER,
      format: Sequelize.INTEGER,
      groupName: Sequelize.STRING,
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
};

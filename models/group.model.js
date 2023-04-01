export default (sequelize, Sequelize) => {
  return sequelize.define(
    'group',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      timestamps: true,
    }
  );
};

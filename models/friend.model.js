export default (sequelize, Sequelize) => {
  return sequelize.define(
    'friend',
    {
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      friendId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      status: Sequelize.STRING,
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
};

export default (sequelize, Sequelize) => {
  return sequelize.define(
    'friend',
    {
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      friend_id: {
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

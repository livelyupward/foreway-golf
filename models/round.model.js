export default (sequelize, Sequelize) => {
  return sequelize.define(
    'round',
    {
      tees: {
        type: Sequelize.STRING,
        required: true,
      },
      courseId: {
        type: Sequelize.INTEGER,
        required: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        required: true,
      },
      groupId: Sequelize.INTEGER,
      closed: Sequelize.BOOLEAN,
    },
    { timestamps: true }
  );
};

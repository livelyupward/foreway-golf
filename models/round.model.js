export default (sequelize, Sequelize) => {
  return sequelize.define(
    'round',
    {
      courseId: {
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      closed: {
        type: Sequelize.BOOLEAN,
      },
    },
    { timestamps: true }
  );
};

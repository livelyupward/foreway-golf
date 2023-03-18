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
    },
    { timestamps: true }
  );
};

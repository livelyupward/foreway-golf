export default (sequelize, Sequelize) => {
  return sequelize.define(
    'round',
    {
      tees: {
        type: Sequelize.STRING,
      },
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

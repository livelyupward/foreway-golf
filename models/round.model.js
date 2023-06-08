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
      finalScore: {
        type: Sequelize.INTEGER,
        default: null,
        required: false,
      },
    },
    { timestamps: true, paranoid: true }
  );
};

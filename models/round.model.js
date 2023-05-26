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
<<<<<<< HEAD
      closed: {
        type: Sequelize.BOOLEAN,
      },
      groupId: {
        type: Sequelize.INTEGER,
        required: false,
      },
=======
      groupId: Sequelize.INTEGER,
      closed: Sequelize.BOOLEAN,
>>>>>>> release/redesign-UI
    },
    { timestamps: true }
  );
};

export default (sequelize, Sequelize) => {
  return sequelize.define(
    'hole',
    {
      number: {
        type: Sequelize.INTEGER,
      },
      yardage: {
        type: Sequelize.INTEGER,
      },
      par: {
        type: Sequelize.INTEGER,
      },
      tees: {
        type: Sequelize.STRING,
      },
      handicap: {
        type: Sequelize.INTEGER,
      },
      courseId: {
        type: Sequelize.INTEGER,
      },
    },
    {
      timestamps: true,
    }
  );
};

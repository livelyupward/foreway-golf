export default (sequelize, Sequelize) => {
  return sequelize.define(
    'score',
    {
      strokes: {
        type: Sequelize.INTEGER,
      },
      putts: {
        type: Sequelize.INTEGER,
      },
      gir: {
        type: Sequelize.BOOLEAN,
      },
      fairway: {
        type: Sequelize.BOOLEAN,
      },
      hazard: {
        type: Sequelize.BOOLEAN,
      },
    },
    { timestamps: true }
  );
};

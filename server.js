import Express from 'express';
import cors from 'cors';
const app = Express();
import seedGCI from './models/gci.seed.js';

const port = 4000;

import db from './models/index.js';

app.use(cors());

db.sequelize.sync({ force: true }).then(() => {
  seedGCI(db);
  console.log('Drop and re-sync db.');
});

app.get('/', (req, res) => {
  res.send('Hi world');
});

import courseRoutes from './routes/course.routes.js';

courseRoutes(app);

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

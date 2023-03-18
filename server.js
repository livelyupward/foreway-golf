import Express from 'express';
import cors from 'cors';
const app = Express();
import seedGCI from './models/gci.seed.js';
import seedDave from './models/user.seed.js';
import { OAuth2Client } from 'google-auth-library';

const port = 4000;

import db from './models/index.js';

app.use(cors());

db.sequelize
  .sync({ force: true })
  .then(() => {
    seedGCI(db);
    console.log('Seeded GCI');
  })
  .then(() => {
    seedDave(db);
    console.log('Drop and re-sync db.');
  });

app.get('/', (req, res) => {
  res.send('Hi world');
});

app.post('/authback', (req, res) => {
  const token = req.query.cred;
  let userToSend;

  const client = new OAuth2Client(process.env.GOOGLE_CLIENTID);
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENTID,
    });
    const payload = ticket.getPayload();
    const userid = (userToSend = payload);
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
  }
  verify()
    .then(() => {
      res.send(userToSend);
    })
    .catch(console.error);
});

import courseRoutes from './routes/course.routes.js';
import userRoutes from './routes/user.routes.js';

courseRoutes(app);
userRoutes(app);

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

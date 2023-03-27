import dotenv from 'dotenv';
dotenv.config();
import Express from 'express';
import cors from 'cors';
import eSession from 'express-session';
import seedGCI from './models/gci.seed.js';
import seedDave from './models/user.seed.js';
import seedStreamwoodOaks from './models/streamwood-oaks.seed.js';
import { OAuth2Client } from 'google-auth-library';
import bodyParser from 'body-parser';

const app = Express();
const port = 4000;

import db from './models/index.js';

app.use(cors());
app.use(bodyParser.json());
app.use(
  eSession({
    secret: process.env.SESSION_SECRET,
  })
);

db.sequelize
  .sync({ force: true })
  .then(() => {
    seedGCI(db);
    console.log('Seeded GCI');
  })
  .then(() => {
    seedStreamwoodOaks(db);
    console.log('Seeded Streamwood Oaks');
  })
  .then(() => {
    seedDave(db);
    console.log('Drop and re-sync db.');
  });

app.get('/', (req, res) => {
  res.send('Hi world');
});

app.post('/auth', (req, res) => {
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
      return res.send(userToSend);
    })
    .catch((error) => {
      console.error('err: ', Object.keys(error));
      return res.status(403).send({ error });
    });
});

import courseRoutes from './routes/course.routes.js';
import userRoutes from './routes/user.routes.js';
import roundRoutes from './routes/round.routes.js';
import scoreRoutes from './routes/score.routes.js';

courseRoutes(app);
userRoutes(app);
roundRoutes(app);
scoreRoutes(app);

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

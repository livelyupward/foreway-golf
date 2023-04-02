import dotenv from 'dotenv';
dotenv.config();
import Express from 'express';
import cors from 'cors';
import path from 'path';
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
app.set('trust proxy', 1);
app.use(
  eSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
);

db.sequelize
  .sync({ force: true })
  .then(async () => {
    await seedGCI(db);
    await seedStreamwoodOaks(db);
    await seedDave(db);
    console.log('Seeds run successfully');
  })
  .then(() => {
    console.log('Drop and re-sync db.');
  })
  .catch((error) => {
    console.error(error);
  });

app.get('/', (req, res) => {
  res.sendFile(__dirname, '/dist/index.html');
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
  }
  verify()
    .then(() => {
      return res.send(userToSend);
    })
    .catch((error) => {
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

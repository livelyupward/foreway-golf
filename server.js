import dotenv from 'dotenv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

import Express from 'express';
import cors from 'cors';
import expressSession from 'express-session';
import { OAuth2Client } from 'google-auth-library';
import bodyParser from 'body-parser';
import history from 'connect-history-api-fallback';

import seedGCI from './seeds/gci.seed.js';
import seedDave from './seeds/user.seed.js';
import seedStreamwoodOaks from './seeds/streamwood-oaks.seed.js';
import seedSettlersHill from './seeds/settlers-hill.seed.js';
import seedHilldale from './seeds/hilldale.seed.js';
import seedArlingtonLakes from './seeds/arlington-lakes-gc.seed.js';
import seedTannaFarms from './seeds/tanna-farms.seed.js';
import courseRoutes from './routes/course.routes.js';
import userRoutes from './routes/user.routes.js';
import roundRoutes from './routes/round.routes.js';
import scoreRoutes from './routes/score.routes.js';

const app = Express();
const port = 4000;

import db from './models/index.js';

app.use(cors());
app.use(bodyParser.json());
app.set('trust proxy', 1);
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
);

app.use(Express.static('/public'));
app.use(
  history({
    rewrites: [
      {
        from: /^\/api\/.*$/,
        to: function (context) {
          return context.parsedUrl.path;
        },
      },
    ],
  })
);

db.sequelize
  // .sync({ force: true })
  .sync()
  .then(async () => {
    // await seedGCI(db);
    // await seedStreamwoodOaks(db);
    // await seedSettlersHill(db);
    // await seedDave(db);
    // await seedHilldale(db);
    // await seedArlingtonLakes(db);
    // await seedTannaFarms(db);
    // console.log('Seeds run successfully');
  })
  .then(() => {
    console.log('Drop and re-sync db.');
  })
  .catch((error) => {
    console.error(error);
  });

app.get('/', (req, res) => {
  res.send('Welcome to this golf app.');
});

app.post('/api/auth', (req, res) => {
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

courseRoutes(app);
userRoutes(app);
roundRoutes(app);
scoreRoutes(app);

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

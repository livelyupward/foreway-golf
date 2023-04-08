export default async (db) => {
  await db.users.create({
    name: 'Dave Grammas',
    email: 'dave@livelyupward.dev',
  });
};

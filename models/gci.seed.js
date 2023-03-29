export default async (db) => {
  await db.courses.create({
    name: 'Golf Club of Illinois',
    address: '1575 Edgewood Dr',
    city: 'Algonquin',
    state: 'IL',
    zip: '60102',
    holeCount: 18,
    phoneNumber: '8476584400',
    webpage: 'https://golfclubofil.com/',
    courseImage: 'https://golfclubofil.com/wp-content/uploads/2021/12/20210926_085539-768x768.jpg',
  });
  await db.holes.create({
    number: 1,
    yardage: 400,
    par: 4,
    tees: 'red',
    handicap: 10,
    courseId: 1,
  });
  await db.holes.create({
    number: 2,
    yardage: 487,
    par: 5,
    tees: 'red',
    handicap: 12,
    courseId: 1,
  });
  await db.holes.create({
    number: 3,
    yardage: 375,
    par: 4,
    tees: 'red',
    handicap: 4,
    courseId: 1,
  });
  await db.holes.create({
    number: 4,
    yardage: 128,
    par: 3,
    tees: 'red',
    handicap: 18,
    courseId: 1,
  });
  await db.holes.create({
    number: 5,
    yardage: 425,
    par: 4,
    tees: 'red',
    handicap: 2,
    courseId: 1,
  });
  await db.holes.create({
    number: 6,
    yardage: 148,
    par: 3,
    tees: 'red',
    handicap: 8,
    courseId: 1,
  });
  await db.holes.create({
    number: 7,
    yardage: 356,
    par: 4,
    tees: 'red',
    handicap: 14,
    courseId: 1,
  });
  await db.holes.create({
    number: 8,
    yardage: 352,
    par: 4,
    tees: 'red',
    handicap: 16,
    courseId: 1,
  });
  await db.holes.create({
    number: 9,
    yardage: 407,
    par: 4,
    tees: 'red',
    handicap: 6,
    courseId: 1,
  });
  await db.holes.create({
    number: 10,
    yardage: 315,
    par: 4,
    tees: 'red',
    handicap: 15,
    courseId: 1,
  });
  await db.holes.create({
    number: 11,
    yardage: 612,
    par: 5,
    tees: 'red',
    handicap: 1,
    courseId: 1,
  });
  await db.holes.create({
    number: 12,
    yardage: 358,
    par: 4,
    tees: 'red',
    handicap: 5,
    courseId: 1,
  });
  await db.holes.create({
    number: 13,
    yardage: 148,
    par: 3,
    tees: 'red',
    handicap: 7,
    courseId: 1,
  });
  await db.holes.create({
    number: 14,
    yardage: 402,
    par: 4,
    tees: 'red',
    handicap: 3,
    courseId: 1,
  });
  await db.holes.create({
    number: 15,
    yardage: 480,
    par: 5,
    tees: 'red',
    handicap: 13,
    courseId: 1,
  });
  await db.holes.create({
    number: 16,
    yardage: 318,
    par: 4,
    tees: 'red',
    handicap: 17,
    courseId: 1,
  });
  await db.holes.create({
    number: 17,
    yardage: 171,
    par: 3,
    tees: 'red',
    handicap: 9,
    courseId: 1,
  });
  await db.holes.create({
    number: 18,
    yardage: 326,
    par: 4,
    tees: 'red',
    handicap: 11,
    courseId: 1,
  });
};

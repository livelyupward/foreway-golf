export default async (db) => {
  await db.courses.create({
    name: "Settler's Hill Golf Course",
    address: '919 E. Fabyan Parkway',
    city: 'Batavia',
    state: 'IL',
    zip: '60510',
    holeCount: 18,
    tees: ['white'],
    phoneNumber: '6302321636',
    webpage: 'http://www.settlershill.com/index.htm',
    courseImage: 'http://www.settlershill.com/images/slideshow/bgd1.jpg',
  });
  await db.holes.create({
    number: 1,
    yardage: 359,
    par: 4,
    tees: 'white',
    handicap: 1,
    courseId: 3,
  });
  await db.holes.create({
    number: 2,
    yardage: 413,
    par: 4,
    tees: 'white',
    handicap: 1,
    courseId: 3,
  });
  await db.holes.create({
    number: 3,
    yardage: 118,
    par: 3,
    tees: 'white',
    handicap: 1,
    courseId: 3,
  });
  await db.holes.create({
    number: 4,
    yardage: 332,
    par: 4,
    tees: 'white',
    handicap: 1,
    courseId: 3,
  });
  await db.holes.create({
    number: 5,
    yardage: 420,
    par: 5,
    tees: 'white',
    handicap: 1,
    courseId: 3,
  });
  await db.holes.create({
    number: 6,
    yardage: 141,
    par: 3,
    tees: 'white',
    handicap: 1,
    courseId: 3,
  });
  await db.holes.create({
    number: 7,
    yardage: 383,
    par: 4,
    tees: 'white',
    handicap: 1,
    courseId: 3,
  });
  await db.holes.create({
    number: 8,
    yardage: 521,
    par: 5,
    tees: 'white',
    handicap: 1,
    courseId: 3,
  });
  await db.holes.create({
    number: 9,
    yardage: 379,
    par: 4,
    tees: 'white',
    handicap: 1,
    courseId: 3,
  });
  await db.holes.create({
    number: 10,
    yardage: 501,
    par: 5,
    tees: 'white',
    handicap: 1,
    courseId: 3,
  });
  await db.holes.create({
    number: 11,
    yardage: 411,
    par: 4,
    tees: 'white',
    handicap: 1,
    courseId: 3,
  });
  await db.holes.create({
    number: 12,
    yardage: 145,
    par: 3,
    tees: 'white',
    handicap: 1,
    courseId: 3,
  });
  await db.holes.create({
    number: 13,
    yardage: 301,
    par: 4,
    tees: 'white',
    handicap: 1,
    courseId: 3,
  });
  await db.holes.create({
    number: 14,
    yardage: 307,
    par: 4,
    tees: 'white',
    handicap: 1,
    courseId: 3,
  });
  await db.holes.create({
    number: 15,
    yardage: 146,
    par: 3,
    tees: 'white',
    handicap: 1,
    courseId: 3,
  });
  await db.holes.create({
    number: 16,
    yardage: 487,
    par: 5,
    tees: 'white',
    handicap: 1,
    courseId: 3,
  });
  await db.holes.create({
    number: 17,
    yardage: 334,
    par: 4,
    tees: 'white',
    handicap: 1,
    courseId: 3,
  });
  await db.holes.create({
    number: 18,
    yardage: 339,
    par: 4,
    tees: 'white',
    handicap: 1,
    courseId: 3,
  });
};

export default async (db) => {
  await db.courses.create({
    name: 'Streamwood Oaks',
    address: '565 Madison Dr',
    city: 'Streamwood',
    state: 'IL',
    zip: '60107',
    holeCount: 9,
    tees: ['blue', 'white', 'red'],
    phoneNumber: '6304831881',
    webpage: 'https://streamwoodoaksgolf.com/',
    courseImage: 'https://streamwoodoaksgolf.com/wp-content/uploads/2023/03/Sunshine-9th-tee-scaled.jpg',
    about:
      'In September of 1990, Streamwood Oaks Golf Course opened for business. Streamwood Oaks is a nine-hole golf course and features a 3,404-yard championship layout. Water comes into play on all nine holes and will challenge even the most experienced player. The golf course is owned by the Village of Streamwood and operated and managed by Links Management.',
  });
  await db.holes.create({
    number: 1,
    yardage: 351,
    par: 4,
    tees: 'white',
    handicap: 4,
    courseId: 2,
  });
  await db.holes.create({
    number: 2,
    yardage: 376,
    par: 4,
    tees: 'white',
    handicap: 5,
    courseId: 2,
  });
  await db.holes.create({
    number: 3,
    yardage: 308,
    par: 4,
    tees: 'white',
    handicap: 9,
    courseId: 2,
  });
  await db.holes.create({
    number: 4,
    yardage: 508,
    par: 5,
    tees: 'white',
    handicap: 2,
    courseId: 2,
  });
  await db.holes.create({
    number: 5,
    yardage: 163,
    par: 3,
    tees: 'white',
    handicap: 1,
    courseId: 2,
  });
  await db.holes.create({
    number: 6,
    yardage: 534,
    par: 5,
    tees: 'white',
    handicap: 6,
    courseId: 2,
  });
  await db.holes.create({
    number: 7,
    yardage: 345,
    par: 4,
    tees: 'white',
    handicap: 8,
    courseId: 2,
  });
  await db.holes.create({
    number: 8,
    yardage: 117,
    par: 3,
    tees: 'white',
    handicap: 7,
    courseId: 2,
  });
  await db.holes.create({
    number: 9,
    yardage: 363,
    par: 4,
    tees: 'white',
    handicap: 3,
    courseId: 2,
  });
};

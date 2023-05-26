export default async (db) => {
  await db.courses.create({
    name: 'Hilldale Golf Club',
    address: '1625 Ardwick Drive',
    city: 'Hoffman Estates',
    state: 'IL',
    zip: '60169',
    holeCount: 18,
    tees: ['white'],
    phoneNumber: '8473101100',
    webpage: 'https://www.hilldalegolf.com/',
    courseImage: 'https://www.pebblewoodgolf.com/golfbuffalohill/wp-content/uploads/sites/8067/2014/12/pg13.jpg?w=837',
    about:
      'Hilldale Golf Club was built in 1970 on land that was once a sportsman’s club and owned by the famous retailer Marshall Field. Hilldale is a par 71 course that offers challenges to golfers of any kind. Despite your skill, you might use all the clubs in your bag. Water comes into play on 13 holes and be wary of the O.B. stakes. Precise shot-making and proper club selection is required. Some holes at Hilldale Golf Course favor a fairway wood or long iron from the tee.',
  });
  await db.holes.create({
    number: 1,
    yardage: 331,
    par: 4,
    tees: 'white',
    handicap: 16,
    courseId: 4,
  });
  await db.holes.create({
    number: 2,
    yardage: 535,
    par: 5,
    tees: 'white',
    handicap: 2,
    courseId: 4,
  });
  await db.holes.create({
    number: 3,
    yardage: 355,
    par: 4,
    tees: 'white',
    handicap: 8,
    courseId: 4,
  });
  await db.holes.create({
    number: 4,
    yardage: 122,
    par: 3,
    tees: 'white',
    handicap: 18,
    courseId: 4,
  });
  await db.holes.create({
    number: 5,
    yardage: 309,
    par: 4,
    tees: 'white',
    handicap: 12,
    courseId: 4,
  });
  await db.holes.create({
    number: 6,
    yardage: 336,
    par: 4,
    tees: 'white',
    handicap: 10,
    courseId: 4,
  });
  await db.holes.create({
    number: 7,
    yardage: 384,
    par: 4,
    tees: 'white',
    handicap: 4,
    courseId: 4,
  });
  await db.holes.create({
    number: 8,
    yardage: 139,
    par: 3,
    tees: 'white',
    handicap: 14,
    courseId: 4,
  });
  await db.holes.create({
    number: 9,
    yardage: 359,
    par: 4,
    tees: 'white',
    handicap: 6,
    courseId: 4,
  });
  await db.holes.create({
    number: 10,
    yardage: 368,
    par: 4,
    tees: 'white',
    handicap: 5,
    courseId: 4,
  });
  await db.holes.create({
    number: 11,
    yardage: 558,
    par: 5,
    tees: 'white',
    handicap: 1,
    courseId: 4,
  });
  await db.holes.create({
    number: 12,
    yardage: 315,
    par: 4,
    tees: 'white',
    handicap: 11,
    courseId: 4,
  });
  await db.holes.create({
    number: 13,
    yardage: 167,
    par: 3,
    tees: 'white',
    handicap: 9,
    courseId: 4,
  });
  await db.holes.create({
    number: 14,
    yardage: 460,
    par: 5,
    tees: 'white',
    handicap: 13,
    courseId: 4,
  });
  await db.holes.create({
    number: 15,
    yardage: 297,
    par: 4,
    tees: 'white',
    handicap: 17,
    courseId: 4,
  });
  await db.holes.create({
    number: 16,
    yardage: 165,
    par: 3,
    tees: 'white',
    handicap: 15,
    courseId: 4,
  });
  await db.holes.create({
    number: 17,
    yardage: 410,
    par: 3,
    tees: 'white',
    handicap: 3,
    courseId: 4,
  });
  await db.holes.create({
    number: 18,
    yardage: 321,
    par: 4,
    tees: 'white',
    handicap: 7,
    courseId: 4,
  });
};

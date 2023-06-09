export default async (db) => {
  if (
    await db.courses.findAll({
      where: {
        name: 'Orchard Valley Golf Course',
      },
    })
  ) {
    await db.courses.create({
      name: 'Orchard Valley Golf Course',
      address: '2411 West Illinois Ave',
      city: 'Aurora',
      state: 'IL',
      zip: '60506',
      about:
        "One of Chicagoland's top five courses, Orchard Valley Golf Course is an 18-hole, 6,800-yard, par-72 championship layout open to the public. Featuring four sets of tees, this beautiful course offers the appropriate challenge to all skill levels. Orchard Valley has been distinguished by Golf Digest Magazine as a 4 1/2 star facility.",
      holeCount: 18,
      par: 72,
      tees: ['white'],
      phoneNumber: '6309070500',
      webpage: 'https://www.orchardvalleygolf.com/',
      courseImage:
        'https://igp.brightspotcdn.com/dims4/default/8ab13c7/2147483647/strip/true/crop/2400x1350+0+0/resize/1440x810!/quality/90/?url=http%3A%2F%2Findigogolf-brightspot.s3.amazonaws.com%2Fclubs%2F64%2F32%2Fd5b8432f41198e6a0dec807926ac%2Forchard-valley-golf-course-fall.jpg',
    });
    await db.holes.create({
      number: 1,
      yardage: 269,
      par: 4,
      tees: 'white',
      handicap: 14,
      courseId: 9,
    });
    await db.holes.create({
      number: 2,
      yardage: 153,
      par: 3,
      tees: 'white',
      handicap: 12,
      courseId: 9,
    });
    await db.holes.create({
      number: 3,
      yardage: 324,
      par: 4,
      tees: 'white',
      handicap: 10,
      courseId: 9,
    });
    await db.holes.create({
      number: 4,
      yardage: 448,
      par: 5,
      tees: 'white',
      handicap: 4,
      courseId: 9,
    });
    await db.holes.create({
      number: 5,
      yardage: 283,
      par: 4,
      tees: 'white',
      handicap: 16,
      courseId: 9,
    });
    await db.holes.create({
      number: 6,
      yardage: 122,
      par: 3,
      tees: 'white',
      handicap: 18,
      courseId: 9,
    });
    await db.holes.create({
      number: 7,
      yardage: 366,
      par: 4,
      tees: 'white',
      handicap: 8,
      courseId: 9,
    });
    await db.holes.create({
      number: 8,
      yardage: 465,
      par: 5,
      tees: 'white',
      handicap: 6,
      courseId: 9,
    });
    await db.holes.create({
      number: 9,
      yardage: 431,
      par: 4,
      tees: 'white',
      handicap: 2,
      courseId: 9,
    });
    await db.holes.create({
      number: 10,
      yardage: 324,
      par: 4,
      tees: 'white',
      handicap: 15,
      courseId: 9,
    });
    await db.holes.create({
      number: 11,
      yardage: 447,
      par: 5,
      tees: 'white',
      handicap: 5,
      courseId: 9,
    });
    await db.holes.create({
      number: 12,
      yardage: 140,
      par: 3,
      tees: 'white',
      handicap: 17,
      courseId: 9,
    });
    await db.holes.create({
      number: 13,
      yardage: 431,
      par: 4,
      tees: 'white',
      handicap: 1,
      courseId: 9,
    });
    await db.holes.create({
      number: 14,
      yardage: 379,
      par: 4,
      tees: 'white',
      handicap: 9,
      courseId: 9,
    });
    await db.holes.create({
      number: 15,
      yardage: 309,
      par: 4,
      tees: 'white',
      handicap: 11,
      courseId: 9,
    });
    await db.holes.create({
      number: 16,
      yardage: 476,
      par: 5,
      tees: 'white',
      handicap: 3,
      courseId: 9,
    });
    await db.holes.create({
      number: 17,
      yardage: 147,
      par: 3,
      tees: 'white',
      handicap: 13,
      courseId: 9,
    });
    await db.holes.create({
      number: 18,
      yardage: 347,
      par: 4,
      tees: 'white',
      handicap: 7,
      courseId: 9,
    });
  }
};

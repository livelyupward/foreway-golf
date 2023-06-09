export default async (db) => {
  if (
    await db.courses.findAll({
      where: {
        name: 'Arlington Lakes Golf Club',
      },
    })
  ) {
    await db.courses.create({
      name: 'Arlington Lakes Golf Club',
      address: '1211 New Wilke Rd',
      city: 'Arlington Heights',
      state: 'IL',
      zip: '60005',
      about:
        "Arlington Lakes Golf Club's, 90-acres course offers something for every golfer.  The course features strategically placed; fescue edged bunkers that bring a natural look to the course.  Living up to its name, water comes into play on 13 of the 18 holes.  You will find its design will truly test your skills as a golfer.",
      holeCount: 18,
      par: 68,
      tees: ['white'],
      phoneNumber: '8475773030',
      webpage: 'https://www.ahpd.org/golf/arlington-lakes-golf-club/',
      courseImage: 'https://www.ahpd.org/assets/1/6/SlideShowDimensionMain/ALGC-Green.jpg?197730',
    });
    await db.holes.create({
      number: 1,
      yardage: 328,
      par: 4,
      tees: 'white',
      handicap: 8,
      courseId: 5,
    });
    await db.holes.create({
      number: 2,
      yardage: 473,
      par: 5,
      tees: 'white',
      handicap: 2,
      courseId: 5,
    });
    await db.holes.create({
      number: 3,
      yardage: 110,
      par: 3,
      tees: 'white',
      handicap: 16,
      courseId: 5,
    });
    await db.holes.create({
      number: 4,
      yardage: 360,
      par: 4,
      tees: 'white',
      handicap: 6,
      courseId: 5,
    });
    await db.holes.create({
      number: 5,
      yardage: 140,
      par: 3,
      tees: 'white',
      handicap: 14,
      courseId: 5,
    });
    await db.holes.create({
      number: 6,
      yardage: 389,
      par: 4,
      tees: 'white',
      handicap: 4,
      courseId: 5,
    });
    await db.holes.create({
      number: 7,
      yardage: 311,
      par: 4,
      tees: 'white',
      handicap: 12,
      courseId: 5,
    });
    await db.holes.create({
      number: 8,
      yardage: 120,
      par: 3,
      tees: 'white',
      handicap: 18,
      courseId: 5,
    });
    await db.holes.create({
      number: 9,
      yardage: 309,
      par: 4,
      tees: 'white',
      handicap: 10,
      courseId: 5,
    });
    await db.holes.create({
      number: 10,
      yardage: 373,
      par: 4,
      tees: 'white',
      handicap: 3,
      courseId: 5,
    });
    await db.holes.create({
      number: 11,
      yardage: 168,
      par: 3,
      tees: 'white',
      handicap: 13,
      courseId: 5,
    });
    await db.holes.create({
      number: 12,
      yardage: 353,
      par: 4,
      tees: 'white',
      handicap: 5,
      courseId: 5,
    });
    await db.holes.create({
      number: 13,
      yardage: 264,
      par: 4,
      tees: 'white',
      handicap: 9,
      courseId: 5,
    });
    await db.holes.create({
      number: 14,
      yardage: 129,
      par: 3,
      tees: 'white',
      handicap: 17,
      courseId: 5,
    });
    await db.holes.create({
      number: 15,
      yardage: 252,
      par: 4,
      tees: 'white',
      handicap: 11,
      courseId: 5,
    });
    await db.holes.create({
      number: 16,
      yardage: 331,
      par: 4,
      tees: 'white',
      handicap: 7,
      courseId: 5,
    });
    await db.holes.create({
      number: 17,
      yardage: 157,
      par: 3,
      tees: 'white',
      handicap: 15,
      courseId: 5,
    });
    await db.holes.create({
      number: 18,
      yardage: 451,
      par: 5,
      tees: 'white',
      handicap: 1,
      courseId: 5,
    });
  }
};

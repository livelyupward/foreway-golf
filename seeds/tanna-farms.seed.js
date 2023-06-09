export default async (db) => {
  if (
    await db.courses.findAll({
      where: {
        name: 'Tanna Farms Golf Club',
      },
    })
  ) {
    await db.courses.create({
      name: 'Tanna Farms Golf Club',
      address: '39W808 Hughes Road',
      city: 'Geneva',
      state: 'IL',
      zip: '60134',
      about:
        'Tanna Farms offers a fantastic experience for golfers of every level. An array of tee placements renders the course friendly to golfers of all abilities. So tackle two jaw-dropping par 5s, from the back tees if you dare; test your wiles on a par 3 that requires dart-throwing precision to stick your shot on a postage-stamp-sized green. Relish every wonderful hole in between. And save your wits for a sequence of final holes that will demand every shot in your repertoire.',
      holeCount: 18,
      par: 71,
      tees: ['white'],
      phoneNumber: '6302324300',
      webpage: 'https://www.tannafarms.com/',
      courseImage: 'https://www.tannafarms.com/images/slideshow/slide1.jpg',
    });
    await db.holes.create({
      number: 1,
      yardage: 95,
      par: 3,
      tees: 'white',
      handicap: 14,
      courseId: 6,
    });
    await db.holes.create({
      number: 2,
      yardage: 436,
      par: 5,
      tees: 'white',
      handicap: 10,
      courseId: 6,
    });
    await db.holes.create({
      number: 3,
      yardage: 135,
      par: 3,
      tees: 'white',
      handicap: 6,
      courseId: 6,
    });
    await db.holes.create({
      number: 4,
      yardage: 298,
      par: 4,
      tees: 'white',
      handicap: 18,
      courseId: 6,
    });
    await db.holes.create({
      number: 5,
      yardage: 418,
      par: 4,
      tees: 'white',
      handicap: 8,
      courseId: 6,
    });
    await db.holes.create({
      number: 6,
      yardage: 134,
      par: 3,
      tees: 'white',
      handicap: 12,
      courseId: 6,
    });
    await db.holes.create({
      number: 7,
      yardage: 362,
      par: 4,
      tees: 'white',
      handicap: 2,
      courseId: 6,
    });
    await db.holes.create({
      number: 8,
      yardage: 377,
      par: 4,
      tees: 'white',
      handicap: 4,
      courseId: 6,
    });
    await db.holes.create({
      number: 9,
      yardage: 101,
      par: 3,
      tees: 'white',
      handicap: 16,
      courseId: 6,
    });
    await db.holes.create({
      number: 10,
      yardage: 351,
      par: 4,
      tees: 'white',
      handicap: 9,
      courseId: 6,
    });
    await db.holes.create({
      number: 11,
      yardage: 109,
      par: 3,
      tees: 'white',
      handicap: 17,
      courseId: 6,
    });
    await db.holes.create({
      number: 12,
      yardage: 277,
      par: 4,
      tees: 'white',
      handicap: 3,
      courseId: 6,
    });
    await db.holes.create({
      number: 13,
      yardage: 541,
      par: 5,
      tees: 'white',
      handicap: 1,
      courseId: 6,
    });
    await db.holes.create({
      number: 14,
      yardage: 343,
      par: 4,
      tees: 'white',
      handicap: 7,
      courseId: 6,
    });
    await db.holes.create({
      number: 15,
      yardage: 463,
      par: 5,
      tees: 'white',
      handicap: 13,
      courseId: 6,
    });
    await db.holes.create({
      number: 16,
      yardage: 162,
      par: 3,
      tees: 'white',
      handicap: 11,
      courseId: 6,
    });
    await db.holes.create({
      number: 17,
      yardage: 532,
      par: 5,
      tees: 'white',
      handicap: 5,
      courseId: 6,
    });
    await db.holes.create({
      number: 18,
      yardage: 303,
      par: 4,
      tees: 'white',
      handicap: 15,
      courseId: 6,
    });
  }
};

export default async (db) => {
  if (
    await db.courses.findAll({
      where: {
        name: 'Bartlett Hills Golf Club',
      },
    })
  ) {
    await db.courses.create({
      name: 'Bartlett Hills Golf Club',
      address: '800 W Oneida Ave',
      city: 'Bartlett',
      state: 'IL',
      zip: '60103',
      about:
        'In 1982 the Village of Bartlett committed to a complete renovation of the facility that included the addition and reshaping of bunkers, a new practice range complete with grass tees and a short game area, and the addition of state of the art irrigation system. A conversion to bent grass fairways and the redesign’s of greens #1, 3, 4 and 5 were completed in the fall of 2002 making Bartlett Hills one of the finest golf courses in the area.',
      holeCount: 18,
      par: 71,
      tees: ['white'],
      phoneNumber: '6308372741',
      webpage: 'https://www.bartletthills.com/',
      courseImage: 'https://www.bartletthills.com/wp-content/uploads/sites/4495/2015/01/pic_004.jpg',
    });
    await db.holes.create({
      number: 1,
      yardage: 369,
      par: 4,
      tees: 'white',
      handicap: 16,
      courseId: 7,
    });
    await db.holes.create({
      number: 2,
      yardage: 349,
      par: 4,
      tees: 'white',
      handicap: 2,
      courseId: 7,
    });
    await db.holes.create({
      number: 3,
      yardage: 203,
      par: 3,
      tees: 'white',
      handicap: 8,
      courseId: 7,
    });
    await db.holes.create({
      number: 4,
      yardage: 477,
      par: 5,
      tees: 'white',
      handicap: 18,
      courseId: 7,
    });
    await db.holes.create({
      number: 5,
      yardage: 131,
      par: 3,
      tees: 'white',
      handicap: 12,
      courseId: 7,
    });
    await db.holes.create({
      number: 6,
      yardage: 392,
      par: 4,
      tees: 'white',
      handicap: 10,
      courseId: 7,
    });
    await db.holes.create({
      number: 7,
      yardage: 363,
      par: 4,
      tees: 'white',
      handicap: 4,
      courseId: 7,
    });
    await db.holes.create({
      number: 8,
      yardage: 356,
      par: 4,
      tees: 'white',
      handicap: 14,
      courseId: 7,
    });
    await db.holes.create({
      number: 9,
      yardage: 392,
      par: 4,
      tees: 'white',
      handicap: 6,
      courseId: 7,
    });
    await db.holes.create({
      number: 10,
      yardage: 482,
      par: 5,
      tees: 'white',
      handicap: 5,
      courseId: 7,
    });
    await db.holes.create({
      number: 11,
      yardage: 142,
      par: 3,
      tees: 'white',
      handicap: 1,
      courseId: 7,
    });
    await db.holes.create({
      number: 12,
      yardage: 400,
      par: 4,
      tees: 'white',
      handicap: 11,
      courseId: 7,
    });
    await db.holes.create({
      number: 13,
      yardage: 346,
      par: 4,
      tees: 'white',
      handicap: 9,
      courseId: 7,
    });
    await db.holes.create({
      number: 14,
      yardage: 381,
      par: 4,
      tees: 'white',
      handicap: 13,
      courseId: 7,
    });
    await db.holes.create({
      number: 15,
      yardage: 389,
      par: 4,
      tees: 'white',
      handicap: 17,
      courseId: 7,
    });
    await db.holes.create({
      number: 16,
      yardage: 487,
      par: 5,
      tees: 'white',
      handicap: 15,
      courseId: 7,
    });
    await db.holes.create({
      number: 17,
      yardage: 353,
      par: 4,
      tees: 'white',
      handicap: 3,
      courseId: 7,
    });
    await db.holes.create({
      number: 18,
      yardage: 141,
      par: 3,
      tees: 'white',
      handicap: 7,
      courseId: 7,
    });
  }
};

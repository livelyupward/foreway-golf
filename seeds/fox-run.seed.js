export default async (db) => {
  if (
    await db.courses.findAll({
      where: {
        name: 'Fox Run Golf Links',
      },
    })
  ) {
    await db.courses.create({
      name: 'Fox Run Golf Links',
      address: '333 Plum Grove Rd',
      city: 'Elk Grove Village',
      state: 'IL',
      zip: '60007',
      about:
        'Fox Run Golf Links combines outstanding customer service with a championship 18 hole course to create one of the most enjoyable golf experiences in the northwest suburbs. Redesigned by architect Greg Martin in 2012 the course was updated to be more challenging for the better players, while at the same time more forgiving and enjoyable for recreational golfers and families. Fox Run is definitely a course to add to your must play list for years to come.',
      holeCount: 18,
      par: 70,
      tees: ['white'],
      phoneNumber: '8472283544',
      webpage: 'https://www.foxrungolflinks.com/',
      courseImage:
        'https://www.foxrungolflinks.com/wp-content/uploads/sites/8756/2023/04/137_20130903_FOXRUNSHARP1.jpg',
    });
    await db.holes.create({
      number: 1,
      yardage: 360,
      par: 4,
      tees: 'white',
      handicap: 11,
      courseId: 8,
    });
    await db.holes.create({
      number: 2,
      yardage: 388,
      par: 4,
      tees: 'white',
      handicap: 5,
      courseId: 8,
    });
    await db.holes.create({
      number: 3,
      yardage: 197,
      par: 3,
      tees: 'white',
      handicap: 7,
      courseId: 8,
    });
    await db.holes.create({
      number: 4,
      yardage: 492,
      par: 5,
      tees: 'white',
      handicap: 1,
      courseId: 8,
    });
    await db.holes.create({
      number: 5,
      yardage: 374,
      par: 4,
      tees: 'white',
      handicap: 3,
      courseId: 8,
    });
    await db.holes.create({
      number: 6,
      yardage: 151,
      par: 3,
      tees: 'white',
      handicap: 17,
      courseId: 8,
    });
    await db.holes.create({
      number: 7,
      yardage: 361,
      par: 4,
      tees: 'white',
      handicap: 9,
      courseId: 8,
    });
    await db.holes.create({
      number: 8,
      yardage: 316,
      par: 4,
      tees: 'white',
      handicap: 15,
      courseId: 8,
    });
    await db.holes.create({
      number: 9,
      yardage: 344,
      par: 4,
      tees: 'white',
      handicap: 13,
      courseId: 8,
    });
    await db.holes.create({
      number: 10,
      yardage: 365,
      par: 4,
      tees: 'white',
      handicap: 2,
      courseId: 8,
    });
    await db.holes.create({
      number: 11,
      yardage: 459,
      par: 5,
      tees: 'white',
      handicap: 6,
      courseId: 8,
    });
    await db.holes.create({
      number: 12,
      yardage: 381,
      par: 4,
      tees: 'white',
      handicap: 12,
      courseId: 8,
    });
    await db.holes.create({
      number: 13,
      yardage: 368,
      par: 4,
      tees: 'white',
      handicap: 10,
      courseId: 8,
    });
    await db.holes.create({
      number: 14,
      yardage: 386,
      par: 4,
      tees: 'white',
      handicap: 4,
      courseId: 8,
    });
    await db.holes.create({
      number: 15,
      yardage: 175,
      par: 3,
      tees: 'white',
      handicap: 14,
      courseId: 8,
    });
    await db.holes.create({
      number: 16,
      yardage: 287,
      par: 4,
      tees: 'white',
      handicap: 18,
      courseId: 8,
    });
    await db.holes.create({
      number: 17,
      yardage: 158,
      par: 3,
      tees: 'white',
      handicap: 16,
      courseId: 8,
    });
    await db.holes.create({
      number: 18,
      yardage: 373,
      par: 4,
      tees: 'white',
      handicap: 8,
      courseId: 8,
    });
  }
};

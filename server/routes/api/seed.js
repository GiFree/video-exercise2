const express = require('express');
const faker = require('faker');
const { Video, User } = require('../../sequelize');

const router = express.Router();

router.post('/', (req, res, next) => {
  const promises = [];
  for (let x = 0; x < 25; x += 1) {
    const video = {
      title: faker.company.companyName(),
      views: faker.random.number(),
      likes: faker.random.number(),
      thumbnailUrl: 'https://i.ytimg.com/vi/v2AC41dglnM/default.jpg',
      createdAt: faker.date.recent(),
      url: 'https://www.youtube.com/watch?v=JmcA9LIIXWw'
    };

    promises.push(Video.create(video));

  }

  Promise.all(promises)
    .then(() => {
      res.status(200).json({ success: true, message: 'created 25 fake videos' });
    })
    .catch((err) => {
      res.status(500).send({
        success: false, error:
          { message: 'something went wrong' },
      });
    });
});

module.exports = router;
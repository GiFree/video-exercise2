const express = require('express');
const getService = require('../../helpers/serviceHelper');
const { Video, User } = require('../../sequelize');
const { Op } = require('sequelize');
const router = express.Router();

router.get('/', async (req, res, next) => {
  let limit = 100;
  let offset = 0;
  let order = 'DESC';
  let id = null;
  let favorites = [];
  if (req.query.limit) {
    limit = req.query.limit;
  }
  if (req.query.offset) {
    offset = req.query.offset;
  }
  if (req.query.order === 'oldest') {
    order = 'ASC'
  }
  if (req.query.id) {
    User.findById(req.query.id, { attributes: ['favorites'] })
      .then((fav) => {
        Video.findAll({
          offset,
          limit,
          order: [['createdAt', order]],
          where: { [Op.or]: fav.favorites }
        }).then((videos) => {
          res.status(200).json(videos);
        }).catch((err) => {
          res.status(500).json({ error: { message: 'Database error' } });
        });
      })
  } else {
    Video.findAll({ offset, limit, order: [['createdAt', order]] })
      .then((videos) => {
        res.status(200).json(videos);
      })
      .catch((err) => {
        res.status(500).json({ error: { message: 'Database error' } });
      });
  }


});

router.get('/count', (req, res, next) => {
  Video.findAndCountAll()
    .then((count) => {
      res.status(200).json({ amount: count.count });
    })
    .catch((err) => {
      res.status(500).json({ error: { message: 'Database error' } });
    });
})

router.post('/add', (req, res, next) => {
  // get movie details and detect which movie handler should be used, else send error: service not supported
  if (!req.body.url) {
    return res.status(400).json({ error: { url: 'not provided' } });
  }

  const url = req.body.url;
  const service = getService(url);

  const isId = url.indexOf('http') !== -1 || url.indexOf('www') !== -1;
  const id = isId ? url : service.getId(url, service);
  service.fetch(id)
    .then(async (video) => {
      await Video.create(video);
      res.status(200).json({ success: true, video });
    })
    .catch((err) => {
      res.status(500).json({ error: { message: 'Not found' } });
    })
});

router.delete('/', (req, res, next) => {
  Video.destroy({ where: {}, truncate: true })
    .then(() => {
      res.status(200).json({ sucess: true, message: 'sucessfully removed all videos.' });
    })
    .catch((err) => {
      res.status(500).json({ error: { message: 'something went wrong.' } })
    });
});

router.delete('/:id', (req, res, next) => {
  Video.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.status(200).json({ sucess: true, message: 'sucessfully removed video.' });
    })
    .catch((err) => {
      res.status(500).json({ error: { message: 'something went wrong.' } })
    });
});

module.exports = router;
const Sequelize = require('sequelize');
const UserModel = require('./models/User');
const VideoModel = require('./models/Video');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: 'postgres',
  }
);

const User = UserModel(sequelize, Sequelize);
const Video = VideoModel(sequelize, Sequelize);

sequelize.sync()
  .then(() => {
    console.log('Database & tables created :)');
  });

module.exports = {
  sequelize,
  User,
  Video,
};

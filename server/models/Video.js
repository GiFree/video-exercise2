module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define('video', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    likes: DataTypes.INTEGER,
    thumbnailUrl: DataTypes.STRING,
    url: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE
    }
  });

  return Video;
}

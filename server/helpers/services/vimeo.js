const request = require('request-promise');

const urlValidator = (url) => {
  const regex = /^(http(s)?:\/\/)(www.)?vimeo(\.com)?\/.+/;
  return regex.test(url)
}

const idValidator = (id) => {
  const regex = /^([1-9])\w+/;
  return regex.test(id);
}

getId = (url) => {
  if (url.indexOf('.com/') !== -1) {
    const index = url.indexOf('.com/');
    return url.split('').splice(index + 5).join('');
  }
  return url;
}

const fetch = async (id) => {
  const options = {
    uri: `https://api.vimeo.com/videos/${id}`,
    qs: {
      access_token: process.env.VIMEO_API_KEY,
    },
    json: true
  }

  const data = await request(options);
  return {
    title: data.name,
    views: data.stats.plays || 0,
    likes: data.metadata.connections.likes.total,
    thumbnailUrl: data.pictures.sizes[0].link,
    createdAt: new Date(),
    url: `https://vimeo.com/${id}`,
  }
}

module.exports = {
  validators: {
    id: idValidator,
    url: urlValidator,
  },
  getId,
  fetch,
};
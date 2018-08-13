const request = require('request-promise');

const urlValidator = (url) => {
  const regex = /^(http(s)?:\/\/)(www.)?youtu(be|.be)?(\.com)?\/.+/;
  return regex.test(url)
}

const idValidator = (id) => {
  const regex = /^([a-zA-Z0-9_\-])\w+/;
  return regex.test(id);
}

getId = (url) => {
  if (url.indexOf('?v=') !== -1) {
    const index = url.indexOf('?v=');
    return url.split('').splice(index + 3).join('');
  } else if (url.indexOf('.be/') !== -1) {
    const index = url.indexOf('.be/');
    return url.split('').splice(index + 4).join('');
  }
  return url;
}

const fetch = async (id) => {
  const options = {
    uri: 'https://www.googleapis.com/youtube/v3/videos',
    qs: {
      key: process.env.YT_API_KEY,
      part: 'snippet,statistics',
      id,
    },
    json: true
  }

  const data = await request(options);

  return {
    title: data.items[0].snippet.title,
    views: data.items[0].statistics.viewCount,
    likes: data.items[0].statistics.likeCount,
    thumbnailUrl: data.items[0].snippet.thumbnails.default.url,
    createdAt: new Date(),
    url: `https://www.youtube.com/watch?v=${data.items[0].id}`,
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
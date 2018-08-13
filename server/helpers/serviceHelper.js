const youtube = require('./services/youtube');
const vimeo = require('./services/vimeo');

const services = {
  vimeo,
  youtube,
}

const getService = (url) => {

  const validators = {
    vimeo: vimeo.validators,
    youtube: youtube.validators,
  };

  const servicesKeys = Object.keys(validators);

  let match = [];

  if (url.indexOf('http') === -1) {
    match = servicesKeys.filter((service) => {
      return validators[service].id(url);
    });
  } else {
    match = servicesKeys.filter((service) => {
      return validators[service].url(url);
    });
  }

  if (match.length > 0) {
    return services[match[0]];
  }
  return false;
}

module.exports = getService;
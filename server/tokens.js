const client = require("twilio");
const AccessToken = client.jwt.AccessToken;
const { VideoGrant } = AccessToken;

const generateToken = (config, identity) => {
  const result = new AccessToken(
    config.twilio.accountSid,
    config.twilio.apiKey,
    config.twilio.apiSecret,
    { identity }
  );
  return result;
};

const videoToken = (identity, room, config) => {
  let videoGrant;
  if (typeof room !== "undefined") {
    videoGrant = new VideoGrant({ room });
  } else {
    videoGrant = new VideoGrant();
  }
  const token = generateToken(config, identity);
  token.addGrant(videoGrant);
  token.identity = identity;
  return token;
};

module.exports = { videoToken };

'use strict';

module.exports = {
  mongodb: {
    url: process.env.MONGODB_URL,
    connector: 'mongodb'
  },
  amazonS3: {
    provider: "amazon",
    connector: "loopback-component-storage",
    key: process.env.AWS_KEY,
    keyId: process.env.AWS_KEY_ID
  }
};

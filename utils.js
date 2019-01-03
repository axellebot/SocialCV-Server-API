const uid = require('uid');
const uuid = require('uuid/v4');

createToken = () => uuid();

module.exports = {
  uid: uid,
  uuid: uuid,
  createToken: createToken,
};
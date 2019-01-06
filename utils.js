const uid = require('uid');
const uuid = require('uuid/v4');

createToken = () => uuid();
createCode = () => uid(16);

module.exports = {
  uid: uid,
  uuid: uuid,
  createToken: createToken,
  createCode: createCode
};
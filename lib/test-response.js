module.exports = class TestResponse {
  statusCode = 0;
  status(code) {
    this.statusCode = code;
    return this;
  };

  data = {};
  json(data) {
    this.data = JSON.parse(JSON.stringify(data));
    return this;
  };
};
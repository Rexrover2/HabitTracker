const config = require('../../environment');
const Pool = require('pg').Pool;

const parsedJson = (object) => JSON.parse(JSON.stringify(object));

const compareJSON = (actual, expected) => {
  expect(actual).toMatchObject(parsedJson(expected));
};

const callEndpoints = async (endpoint, req) => {
  const result = {};
  const res = {
    send: (object) => {
      result.data = parsedJson(object);
      if (!result.status) {
        result.status = 200;
      }
    },
    status: (status) => {
      result.status = status;
    },
    sendStatus: (status) => {
      result.status = status;
    },
  };
  await endpoint(req, res);
  return result;
};

/* 
  Makes sure that connection to postgreSQL database is open before tests are run and that 
  the connection is closed after tests are complete.
*/
const testSuiteWrapper = (name, tests) => {
  describe(name, () => {
    let pool;

    beforeAll(() => {
      pool = new Pool({
        host: config.host,
        user: config.user,
        password: config.password,
        port: config.port,
      });
    });

    afterAll(async () => {
      await pool.end();
    });

    tests();
  });
};

module.exports = {
  compareJSON,
  callEndpoints,
  testSuiteWrapper,
};

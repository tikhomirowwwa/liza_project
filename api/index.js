// // api/index.js
// const jsonServer = require("json-server");
// const path = require("path");

// const server = jsonServer.create();
// const router = jsonServer.router(path.join(__dirname, "..", "db.json"));
// const middlewares = jsonServer.defaults();

// server.use(middlewares);
// server.use(router);

// module.exports = (req, res) => {
//   server(req, res);
// };

const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "..", "db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Custom search middleware
server.use((req, res, next) => {
  if (req.method === "GET" && req.query.q) {
    const searchTerm = req.query.q.toLowerCase();
    const resource = req.path.split("/").pop(); // e.g. 'data' from '/api/data'
    const data = router.db.get(resource).value();

    const results = data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchTerm)
      )
    );
    return res.json(results);
  }
  next();
});

server.use(router);

module.exports = (req, res) => {
  server(req, res);
};

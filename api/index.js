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
const dbPath = path.join(__dirname, "db.json");
console.log("db.json path:", dbPath); // Debug log
const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Custom search middleware
server.use((req, res, next) => {
  if (req.method === "GET" && req.query.q) {
    const searchTerm = req.query.q.toLowerCase();
    const resource = req.path
      .replace(/^\/|\/$/g, "")
      .split("/")
      .pop();

    const data = router.db.get(resource).value();
    if (!data) {
      return res
        .status(404)
        .json({ error: `Resource '${resource}' not found` });
    }

    const results = data.filter((item) =>
      Object.values(item).some((val) => {
        if (typeof val === "object" && val !== null) {
          return JSON.stringify(val).toLowerCase().includes(searchTerm);
        }
        return String(val).toLowerCase().includes(searchTerm);
      })
    );

    return res.json(results);
  }
  next();
});

server.use(router);

module.exports = (req, res) => {
  server(req, res);
};

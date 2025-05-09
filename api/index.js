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
console.log("Resolved db.json path:", dbPath); // Log db.json path
const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Custom search middleware
server.use((req, res, next) => {
  console.log("Request URL:", req.url); // Log the full URL
  console.log("Request Query:", req.query); // Log query parameters
  console.log("Request Path:", req.path); // Log the path

  if (req.method === "GET" && req.query.q) {
    console.log("Search middleware triggered for query:", req.query.q); // Confirm middleware runs
    const searchTerm = req.query.q.toLowerCase();
    const resource = req.path
      .replace(/^\/|\/$/g, "")
      .split("/")
      .pop();
    console.log("Resource extracted:", resource); // Log resource name

    const data = router.db.get(resource).value();
    if (!data) {
      console.log("Resource not found:", resource); // Log missing resource
      return res
        .status(404)
        .json({ error: `Resource '${resource}' not found` });
    }

    console.log("Data retrieved:", data); // Log data before filtering
    const results = data.filter((item) =>
      Object.values(item).some((val) => {
        if (typeof val === "object" && val !== null) {
          return JSON.stringify(val).toLowerCase().includes(searchTerm);
        }
        return String(val).toLowerCase().includes(searchTerm);
      })
    );

    console.log("Search results:", results); // Log filtered results
    return res.json(results);
  } else {
    console.log("Search middleware skipped, passing to next middleware"); // Log when middleware is skipped
  }
  next();
});

server.use(router);

module.exports = (req, res) => {
  server(req, res);
};

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

const fs = require("fs").promises;
const path = require("path");

module.exports = async (req, res) => {
  console.log("Request URL:", req.url);
  console.log("Request Query:", req.query);
  console.log("Request Path:", req.path);

  if (req.method !== "GET" || !req.query.q) {
    console.log("Invalid request: Requires GET with q query");
    return res
      .status(400)
      .json({ error: "Use GET with a 'q' query parameter" });
  }

  const searchTerm = req.query.q.toLowerCase();
  const resource = req.path
    .replace(/^\/|\/$/g, "")
    .split("/")
    .pop();
  console.log("Resource:", resource);
  console.log("Search Term:", searchTerm);

  try {
    const dbPath = path.join(__dirname, "db.json");
    console.log("Reading db.json from:", dbPath);
    const db = JSON.parse(await fs.readFile(dbPath));

    if (!db[resource]) {
      console.log("Resource not found:", resource);
      return res
        .status(404)
        .json({ error: `Resource '${resource}' not found` });
    }

    const results = db[resource].filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchTerm)
      )
    );

    console.log("Search Results:", results);
    return res.json(results);
  } catch (error) {
    console.error("Error:", error.message);
    return res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

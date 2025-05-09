import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(__dirname, "db.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(jsonData);
  res.status(200).json(data);
}

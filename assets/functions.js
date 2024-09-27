import fs from "fs";
import path from "path";
import { __dirname } from "./variables.js";

export function readHTMLFile(filePath, res) {
  const HTMLPath = path.join(__dirname, "../pages", filePath);
  console.log(`Attempting to read file: ${HTMLPath}`);

  fs.promises
    .readFile(HTMLPath, "utf-8")
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(`Error: File not found at ${HTMLPath}`);
      res.status(404).send("File not found");
    });
}

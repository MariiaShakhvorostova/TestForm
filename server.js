const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "POST" && req.url === "/saveUserData") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const userData = JSON.parse(body);
      const userDataJSON = JSON.stringify(userData, null, 2);

      fs.appendFile("./users_data.json", userDataJSON + "\n", (err) => {
        if (err) {
          console.error("Error saving user data:", err);
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Error saving user data");
        } else {
          console.log("User data saved successfully");
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end("User data saved successfully");
        }
      });
    });
  } else if (req.method === "GET" && req.url === "/saveUserData") {
    fs.readFile("./users_data.json", (err, data) => {
      if (err) {
        console.error("Error reading user data:", err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error reading user data");
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(data);
      }
    });
  } else if (req.method === "GET" && req.url === "/users_data") {
    fs.readFile("./users_data.json", (err, data) => {
      if (err) {
        console.error("Error reading user data:", err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error reading user data");
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page not found");
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

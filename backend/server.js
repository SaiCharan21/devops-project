const express = require("express")
const cors = require("cors")
// creates an application object
const app = express()
app.use(cors())
const PORT = 5000;

// registers a route that responds to HTTP GET requests.
 // Request object
   // Contains info about the incoming request (headers, query params, body, etc.)
 // Response object
   // Used to send data back to the client.
app.get("/api/health", (req, res) => {
    res.json({ status: "Backend is running"})
})

app.get("/api/data", (req, res) => {
  res.json({ message: "Hello from backend!", time: new Date() });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
// const express = require("express")
// const cors = require("cors")
// // creates an application object
// const app = express()
// app.use(cors())
// const PORT = 5000;

// // registers a route that responds to HTTP GET requests.
//  // Request object
//    // Contains info about the incoming request (headers, query params, body, etc.)
//  // Response object
//    // Used to send data back to the client.
// app.get("/api/health", (req, res) => {
//     res.json({ status: "Backend is running"})
// })

// app.get("/api/data", (req, res) => {
//   res.json({ message: "Hello from backend!", time: new Date() });
// });

// app.listen(PORT, () => {
//   console.log(`✅ Backend running at http://localhost:${PORT}`);
// });

const express = require('express');
const client = require('prom-client');

const app = express();
const port = process.env.PORT || 5000;

// Create a Registry which registers the metrics
const register = new client.Registry();

// Add default metrics (CPU, memory, event loop lag, etc.)
client.collectDefaultMetrics({ register });

// Example: custom counter metric
const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
});
register.registerMetric(httpRequestsTotal);

// Middleware to increment counter
app.use((req, res, next) => {
  httpRequestsTotal.inc();
  next();
});

// Health route
app.get('/api/data', (req, res) => {
  res.json({ message: "Hello from backend with metrics!" });
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
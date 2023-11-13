const express = require("express");
const app = express();
const port = 3000;

// Mock data array
const in_progress_deliveries = require("./mock_in_progress_deliveries.json");
const completed_deliveries = require("./mock_completed_deliveries.json");

app.get("/couriers/deliveries", (req, res) => {
  const { status } = req.query;

  if (status === "in_progress") {
    res.json(in_progress_deliveries);
  } else if (status === "completed") {
    res.json(completed_deliveries);
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

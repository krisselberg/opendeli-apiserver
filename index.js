const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Mock data array
const in_progress_deliveries = require("./mock_in_progress_deliveries.json");
const completed_deliveries = require("./mock_completed_deliveries.json");

app.get("/", (req, res) => {
  res.send("Welcome to the OpenDeli API!");
});

app.get("/deliveries", (req, res) => {
  const { status } = req.query;

  // Return all if no specific status is requested
  if (!status) {
    return res.json({
      in_progress_deliveries,
      completed_deliveries,
    });
  }

  if (status === "in_progress") {
    res.json(in_progress_deliveries);
  } else if (status === "completed") {
    res.json(completed_deliveries);
  } else if (status === "cancelled") {
    res.json([]);
  } else {
    res.status(400).json({ error: "Invalid status" });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

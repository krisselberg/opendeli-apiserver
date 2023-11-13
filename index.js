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
  const { page = 1, perPage = 10, status } = req.query;

  let deliveries;
  if (status === "in_progress") {
    deliveries = in_progress_deliveries;
  } else if (status === "completed") {
    deliveries = completed_deliveries;
  } else if (status === "cancelled") {
    deliveries = [];
  } else if (status) {
    return res.status(400).json({ error: "Invalid status" });
  } else {
    deliveries = [...in_progress_deliveries, ...completed_deliveries];
  }

  // Pagination logic
  const pageInt = parseInt(page, 10);
  const perPageInt = parseInt(perPage, 10);
  const total = deliveries.length;
  const paginatedDeliveries = deliveries.slice(
    (pageInt - 1) * perPageInt,
    pageInt * perPageInt
  );

  res.json({
    deliveries: paginatedDeliveries,
    pagination: {
      total,
      lastPage: Math.ceil(total / perPageInt),
      currentPage: pageInt,
      perPage: perPageInt,
      prevPage: pageInt > 1 ? pageInt - 1 : null,
      nextPage: total > pageInt * perPageInt ? pageInt + 1 : null,
    },
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

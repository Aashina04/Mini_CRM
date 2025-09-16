const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

// In-memory data
let customers = [];
let campaigns = [];

/* -------------------- CUSTOMER API -------------------- */
app.post("/api/customers", (req, res) => {
  const { name, email, spend } = req.body;
  const newCustomer = { id: uuidv4(), name, email, spend };
  customers.push(newCustomer);
  res.json(newCustomer);
});

app.get("/api/customers", (req, res) => {
  res.json(customers);
});

/* -------------------- CAMPAIGN API -------------------- */
app.post("/api/campaigns", (req, res) => {
  const { title, message } = req.body;
  const results = customers.map((c) => ({
    customerId: c.id,
    status: Math.random() < 0.9 ? "SENT" : "FAILED",
  }));
  const newCampaign = { id: uuidv4(), title, message, results };
  campaigns.push(newCampaign);
  res.json(newCampaign);
});

app.get("/api/campaigns", (req, res) => {
  res.json(campaigns);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));

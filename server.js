const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const souravModel = require("./modal/leadSourav");

const app = express();
const port = process.env.PORT || 4000;
const verificationToken = "1";
require("dotenv").config();
const mongo_uri = process.env.MONGODB_URI;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(mongo_uri, {});

const FACEBOOK_GRAPH_API_BASE_URL = "https://graph.facebook.com/v19.0";

// Define a schema for lead data
const leadSchema = new mongoose.Schema({
  adgroupId: String,
  adId: String,
  createdTime: Date,
  leadgenId: String,
  pageId: String,
  formId: String,
  userData: Object,
});

// Create a Lead model based on the schema
const Lead = mongoose.model("Lead", leadSchema);

// Your Facebook webhook endpoint
const webhookEndpoint = "/webhook";

app.get(webhookEndpoint, (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  // Verify the token and respond to the challenge
  if (mode === "subscribe" && token === verificationToken) {
    console.log(`Webhook verified at ${new Date().toISOString()}`);
    res.status(200).send(challenge);
  } else {
    console.error("Failed verification");
    res.sendStatus(403);
  }
});

app.post(webhookEndpoint, async (req, res) => {
  try {
    const entry = req.body.entry[0];
    const change = entry.changes[0];
    const leadData = change.value;
    console.log("Received lead data:", leadData);

    const adgroupId = leadData.adgroup_id;
    const adId = leadData.ad_id;
    const createdTime = leadData.created_time;
    const leadgenId = leadData.leadgen_id;
    const pageId = leadData.page_id;
    const formId = leadData.form_id;
    const userData = leadData.field_data;

    // Save lead data to MongoDB
    const data = {
      adgroupId,
      adId,
      createdTime,
      leadgenId,
      pageId,
      formId,
      userData,
    };
    await souravModel.create(data);

    // Fetch lead data using native fetch
    const accessToken =
      "EAAO0M7EMG6ABOwaZAZBvBUJDJFuvPlNvZC3P1QiwZAf5ZAhJlT8oXsfirwOO8vH8DtAHpvAb73QusnZBFRIVxz7pIZCOEfCQbaQqbMyfXox1AZCOkmDDHSon0j1IID6WMPG1PJ2UTs0qtzZBTZAKxIVpAZAcaVJHgiJNSPF9Np4SZB5mgkiI0YEkqtSGoLHZBO02TFEd23dcdWPddRWNqiPYywzU7lgrY6rkZD";
    const graphApiUrl = `${FACEBOOK_GRAPH_API_BASE_URL}/${formId}_${leadgenId}?access_token=${accessToken}`;
    console.log("Graph API URL:", graphApiUrl);

    const fetchResponse = await fetch(graphApiUrl);
    const graphApiResponse = await fetchResponse.json();

    // Handle lead data from Graph API (graphApiResponse)
    console.log("Lead data from Graph API:", graphApiResponse);

    res.status(200).send("Received and processed lead data");
  } catch (error) {
    console.error(`Error processing webhook: ${error}`);
    res.status(500).end();
  }
});

// Endpoint to fetch lead data
app.get("/getLeadData", async (req, res) => {
  try {
    // Fetch lead data from MongoDB
    const leadData = await souravModel.find().sort({ createdAt: -1 });
    res.json(leadData);
  } catch (error) {
    console.error(`Error fetching lead data: ${error}`);
    res.status(500).end();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

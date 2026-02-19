require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");

// --------------------
// EXPRESS APP
// --------------------
const app = express();
const PORT = process.env.PORT || 3000;

// --------------------
// MONGODB CONNECTION
// --------------------
const MONGODB_URI =
  process.env.MONGODB_AUTH_URI || "mongodb://mongo:27017/artgallery";

// Mongoose connection
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Mongoose connected"))
  .catch((err) => console.error("Mongoose connection error:", err));

// MongoClient connection (for signup/signin)
const client = new MongoClient(MONGODB_URI);

let db;

async function connectDB() {
  try {
    await client.connect();
    console.log("MongoClient connected");
    db = client.db("artgallery");
  } catch (err) {
    console.error("MongoClient connection error:", err);
  }
}

connectDB();

// --------------------
// MIDDLEWARE
// --------------------
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --------------------
// ROUTES
// --------------------
const artworks = require("./routes/artwork");
const contact = require("./routes/contact");
const commission = require("./routes/commission");
const auth = require("./routes/auth");

app.use("/api/artworks", artworks);
app.use("/api/contact", contact);
app.use("/api/commission", commission);
app.use("/api/auth", auth);

// --------------------
// CHATBOT ROUTE
// --------------------
app.post("/api/chat", (req, res) => {
  const query = req.body.query.toLowerCase();
  let response = "Sorry, I didn't get that.";

  const faqs = [
    {
      keywords: ["buy", "purchase"],
      reply: "To buy an artwork, inquire from gallery page.",
    },
  ];

  for (let faq of faqs) {
    faq.keywords.forEach((k) => {
      if (query.includes(k)) response = faq.reply;
    });
  }

  res.json({ reply: response });
});

// --------------------
// SIGNUP
// --------------------
app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const users = db.collection("users");

    const existing = await users.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: "Username already exists." });
    }

    await users.insertOne({ username, email, password });

    res.json({ message: "User registered successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});

// --------------------
// SIGNIN
// --------------------
app.post("/api/signin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const users = db.collection("users");

    const user = await users.findOne({ username, password });

    if (user) {
      res.json({ message: "Sign In Successful!" });
    } else {
      res.status(401).json({ message: "Invalid credentials." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});

// --------------------
// START SERVER
// --------------------
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

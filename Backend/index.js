require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");

mongoose.connect(config.connectionString)
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));

const User = require("./models/user.model");
const Note = require("./models/note.model");
const express = require("express");
const cors = require("cors");
const app = express();

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("*", (req, res) => {
  res.json({ data: "helo" });
});


// ======================> Backend API's <=================

//Create Account

app.post("/create-account", async (req, res) => {


  if (!req.body) {
    return res
      .status(400)
      .json({ error: true, message: "Request body missing" });
  }

  const {fullName, email, password} = req.body;

  if (!fullName) {
    return res
      .status(400)
      .json({ error: true, message: "FullName is Required" });
  }

  if (!email) {
    return res.status(400).json({ error: true, message: "Email Required" });
  }

  if (!password) {
    return res.status(400).json({ error: true, message: "password required" });
  }

  const isUser = await User.findOne({ email: email });

  if (isUser) {
    return res.json({ error: true, message: "User Alredy Exist" });
  }

  const user = new User({
    fullName,
    email,
    password,
  });

  await user.save();

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "36000m",
  });
  return res.json({
    error: false,
    user,
    accessToken,
    message: "SuccessFully Registration",
  });
});

// Login Account

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "email is required" });
  }

  if (!password) {
    return res.status(400).json({ message: "password is required" });
  }

  const userInfo = await User.findOne({ email: email });

  if (!userInfo) {
    return res.status(400).json({ message: "User not Found" });
  }

  if (userInfo.email == email && userInfo.password == password) {
    const user = { user: userInfo };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });

    return res.json({
      error: false,
      message: "successfully login",
      email,
      accessToken,
    });
  } else {
    return res
      .status(400)
      .json({ error: true, message: "InValid Credentials" });
  }
});

//Get User

app.get("/get-user", authenticateToken, async (req, res) => {
  const { user } = req.user;

  const isUser = await User.findOne({ _id: user._id });

  if (!isUser) {
    return res.sendStatus(401);
  }

  return res.json({
    user: {fullName:isUser.fullName, email:isUser.email, "id": isUser._id, createdOn: isUser.createdOn},
    message: "",
  });
});

// Create Notes

app.post("/add-note", authenticateToken, async (req, res) => {
  const { title, content, tags } = req.body;
  // const { user } = req.body;
  const user = req.user.user;

  if (!title) {
    return res.status(400).json({ error: true, message: "Title is Req" });
  }

  if (!content) {
    return res.status(400).json({ error: true, message: "content Req" });
  }

  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });

    await note.save();

    return res.json({ error: false, note, message: "NOte Add Success" });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal server Error",
    });
  }
});

// Edit Notes

app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content, tags, isPinned } = req.body;
  const { user } = req.user;

  if (!title && !content && !tags) {
    return res.status(400).json({ error: true, message: "No Chnage provided" });
  }

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });

    if (!note) {
      return res.status(400).json({ error: true, message: "Note not Found" });
    }
    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPinned) note.isPinned = isPinned;

    await note.save();
    return res.json({
      error: false,
      note,
      message: "Note Update Succ",
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// Get All Notes

app.get("/get-all-notes/", authenticateToken, async (req, res) => {
  const { user } = req.user;

  try {
    const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });

    return res.json({
      error: false,
      notes,
      message: "All Note Received Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// Delete Notes

app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { user } = req.user;

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not Found" });
    }

    await Note.deleteOne({ _id: noteId, userId: user._id });

    return res.json({
      error: false,
      message: "Note Delete Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// Update isPinned Value

app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { isPinned } = req.body;
  const { user } = req.user;

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });

    if (!note) {
      return res.status(400).json({ error: true, message: "Note not Found" });
    }

    note.isPinned = isPinned;

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note Update Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});


// Search isPinned value

app.get("/search-notes", authenticateToken, async (req, res) => {
  const user = req.user;
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: true, message: "Search query is required" });
  }

  try {
    const matchingNotes = await Note.find({
      // userId: user._id,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
        { tags: { $elemMatch: { $regex: query, $options: "i" } } }
      ],
    });

    return res.json({
      error: false,
      notes: matchingNotes,
      message: "Notes matching the search query retrieved successfully"
    });
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

app.listen(8000);
module.exports = app;

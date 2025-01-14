const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (make sure MongoDB is running)
mongoose.connect('mongodb://localhost:27017/feedbackApp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log(error));

// MongoDB Schema for Likes and Followers
const userSchema = new mongoose.Schema({
  likes: { type: Number, default: 0 },
  followers: { type: Number, default: 0 }
});

const User = mongoose.model('User', userSchema);

// Routes
app.get('/stats', async (req, res) => {
  try {
    const user = await User.findOne();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats', error });
  }
});

app.post('/like', async (req, res) => {
  try {
    const user = await User.findOne();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.likes += 1;
    await user.save();
    res.json({ likes: user.likes });
  } catch (error) {
    res.status(500).json({ message: 'Error updating like count', error });
  }
});

app.post('/follow', async (req, res) => {
  try {
    const user = await User.findOne();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.followers += 1;
    await user.save();
    res.json({ followers: user.followers });
  } catch (error) {
    res.status(500).json({ message: 'Error updating follower count', error });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});

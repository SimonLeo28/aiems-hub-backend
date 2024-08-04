const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectToBlogDB = require('./database');

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); 

// Define blog schema and model
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

const blogModel = mongoose.model('blogs', blogSchema);

// Define contact schema and model

const contactsSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Message: {
        type: String,
        required: true,
    }
})

const contactModel = mongoose.model('contacts',contactsSchema);

// Connect to MongoDB
connectToBlogDB();

// Routes
app.get('/blogs', async (req, res) => {
  try {
    const data = await blogModel.find();
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving blogs' });
  }
});

app.post('/blogs', async (req, res) => {
  try {
    const response = await blogModel.create(req.body);
    console.log("Working");
    res.send(response);
  } catch (error) {
    res.status(500).send({ message: 'Error creating blog' });
  }
});

app.post('/contacts', async(req,res) => {
    try {
      console.log("Reached...")
        const response = await contactModel.create(req.body);
        console.log("Working");
        res.send(response);
    } catch (error) {
        res.status(500).send({message: 'Oops Error!!!'})
    }
})


app.get('/blogs/:id', async (req, res) => {
  try {

    const data = await blogModel.findById(req.params.id);
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving blog' });
  }
});

// Error handling middleware
// app.use(err, req, res, next => {
//   console.error(err.stack);
//   res.status(500).send({ message: 'Something went wrong!' });
// });

// Start the server
app.listen(port, () => {
  console.log(`Server has started at port ${port}.`);
});


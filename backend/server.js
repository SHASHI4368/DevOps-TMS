const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connectDB');
const Task = require('./models/taskModel');
const taskRoutes = require('./routes/taskRoute');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(taskRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
 try{
  await connectDB();
  app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
  });
 }catch(err){
  console.log(err);
 }
}

startServer();


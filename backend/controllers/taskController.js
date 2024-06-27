const {Task, User} = require('../models/taskModel');

  const createTask = async (req, res) => {
  try{
    const task = await Task.create(req.body);
    res.status(200).json(task);
  }catch(err){
    res.status(500).json({msg: err.message});
  }
  }

const getAllTasks = async (req, res) => {
  const user = req.params.user; // Get the userId from request parameters
  try {
    const tasks = await Task.find({ user: user });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


const getTaskById = async (req, res) => {
 try{
  const {id} = req.params;
  const task = await Task.findById(id);
  if(!task){
   return res.status(404).json(`No task with id: ${id}`);
  }else{
   res.status(200).json(task);
  }
 }catch(err){
  res.status(500).json({msg: err.message});
 }
}

const deleteTask = async (req, res) => {
 try{
  const {id} = req.params;
  const task = await Task.findByIdAndDelete(id);
  if(!task){
   return res.status(404).json(`No task with id: ${id}`);
  }
  res.status(200).json('Task deleted');
 }catch(err){
  res.send(500).json({msg: err.message});
 }
}

const updateTask = async (req, res) => {
 try{
  const {id} = req.params;
  const task = await Task.findByIdAndUpdate(
   {_id: id},
   req.body,
   {
    new: true,
    runValidators: true
   }
  );
  if(!task){
   return res.status(404).json(`No task with id: ${id}`);
  }
  res.status(200).json(task);
 }catch(err){
  res.status(500).json({msg: err.message});
 }
}

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json(`No User with id: ${id}`);
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  deleteTask,
  updateTask,
  getUserById,
  createUser,
  getAllUsers
};
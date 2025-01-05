const express=require('express');
const Task=require('../models/task');
const authMiddleware = require('../middleware/authMiddleware');

const router=express.Router();

// API to create tasks
router.post('/',authMiddleware,async(req,res)=>{
    try{
        const task=new Task(req.body);
        const savedTask=await task.save();
        res.status(201).json(savedTask);
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
});

// API to fetch all tasks
router.get('/',authMiddleware,async(req,res)=>{
    try{
        const tasks=await Task.find();
        res.status(200).json(tasks);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
});

// API to find a task by ID
router.get('/:id',authMiddleware,async(req,res)=>{
    try{
        const task=await Task.findById(req.params.id);
        if(!task) return res.status(404).json({error:'Task not found'});
        res.status(200).json(task);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
});

// API to update the task status
router.put('/:id',authMiddleware, async (req, res) => {
    try {
        const { status } = req.body;
        

        //here I Add { new: true } to get the updated document of status
        const task = await Task.findByIdAndUpdate(req.params.id,{ status },{ new: true });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(task);
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API to delete task
router.delete('/:id', authMiddleware,async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.status(200).json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports=router;

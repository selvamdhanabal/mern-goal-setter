const asyncHandler = require('express-async-handler')

const Goal = require('../modals/getModal')
const User = require('../modals/userModal')

// @desc    Get Goals
// @route   GET /api/goals
// @access  Private   
const getGoals = asyncHandler(async (req, res)=> {
    const goals = await Goal.find({user: req.user.id})
    res.status(200).json(goals)
})

// @desc    Set Goals
// @route   POST /api/goals
// @access  Private   
const setGoal = asyncHandler(async (req, res)=> {
    if(!req.body.text) {
        res.status(400);
        throw new Error('Text field is required')
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(goal)
})

// @desc    Get Goals
// @route   PUT /api/goals/:id
// @access  Private   
const updateGoal = asyncHandler(async (req, res)=> {
    const goal = await Goal.findById(req.params.id)
    if(!goal) {
        res.status(400);
        throw new Error ('The goal is not found')
    }

    // Check for user
    if(!req.user) {
        res.status(401);
        throw new Error('User Not Found')
    }

    // Make sure the logged in user matched the goal user
    if(Goal.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedGoal)
})

// @desc    Get Goals
// @route   DELETE /api/goals/:id
// @access  Private   
const deleteGoal = asyncHandler(async (req, res)=> {
    const goal = await Goal.findById(req.params.id)
    if(!goal) {
        res.status(400);
        throw new Error ('The given goal is not found')
    }

    // Check for user
    if(!req.user) {
        res.status(401);
        throw new Error('User Not Found')
    }

    // Make sure the logged in user matched the goal user
    if(goal.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized')
    }

    await goal.remove()
    res.status(200).json({id: req.params.id})
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}
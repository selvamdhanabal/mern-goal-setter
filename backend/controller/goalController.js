const asyncHandler = require('express-async-handler')

const Goal = require('../modals/getModal')

// @desc    Get Goals
// @route   GET /api/goals
// @access  Private   
const getGoals = asyncHandler(async (req, res)=> {
    const goals = await Goal.find()
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
        text: req.body.text
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

    await goal.remove()
    res.status(200).json({id: req.params.id})
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}
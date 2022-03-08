const express = require('express');
const router = express.Router()
const {getGoals, setGoal, updateGoal, deleteGoal} = require('../controller/goalController')
const {protect} = require('../middleware/authMiddleWare')

router.route('/').get(protect, getGoals).post(protect, setGoal);
router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal)

// router.get('/', getGoals, setGoal, updateGoal, deleteGoal)

// router.post('/', setGoal)

// router.put('/:id', updateGoal)

// router.delete('/:id', deleteGoal)


module.exports = router
const express = require('express');
const router = express.Router()
const {getGoals, setGoal, updateGoal, deleteGoal} = require('../controller/goalController')

router.route('/').get(getGoals).post(setGoal);
router.route('/:id').delete(deleteGoal).put(updateGoal)

// router.get('/', getGoals, setGoal, updateGoal, deleteGoal)

// router.post('/', setGoal)

// router.put('/:id', updateGoal)

// router.delete('/:id', deleteGoal)


module.exports = router
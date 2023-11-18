const { addExpense, getExpense, deleteExpense } = require('../controllers/expense')
const { addIncome, getIncome, deleteIncome } = require('../controllers/income')
const { getUser } = require('../controllers/user')
const { loginUser, addUser } = require('../controllers/userauth')
const { authentication } = require('../middleware/authentication')

const router = require('express').Router()

router.post('/add-income', authentication, addIncome) 
    .post('/get-incomes/:id', getIncome)
    .delete('/delete-income/:id', authentication, deleteIncome)
    .post('/add-expense', authentication, addExpense)
    .post('/get-expenses/:id', getExpense)
    .delete('/delete-expense/:id', authentication, deleteExpense)
    .post('/add-user', addUser)
    .post('/get-user', loginUser)


module.exports = router
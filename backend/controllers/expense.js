const ExpenseSchema = require("../models/ExpenseModel")

exports.addExpense = async (req,res) => {
    const {userid, title, amount, category, description, date} = req.body
    const expense = ExpenseSchema({
        userid,
        title, 
        amount, 
        category,
        description,
        date
    })

    try {
        //validations
        if(!userid || !title || !category || !description || !date){
            return res.satus(400).json({message : "All fields are requried!"})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.satus(400).json({message : "Amount must be positive!"})
        }
        await expense.save()
        res.status(200).json({message : "expense Added"})
    } catch (error) {
        res.status(400).json(error)
    }
    console.log(expense);
}

exports.getExpense = async (req, res) =>{
    const {id} = req.params
    try {
        const expense = await ExpenseSchema.find({userid : id}).sort({createdAt: -1})
        res.status(200).json(expense) 
    } catch (error) {
        res.status(500).json({message : "nhi milra expense"})
    }
}
   
exports.deleteExpense = async (req, res) =>{
    const {id} = req.params
    ExpenseSchema.findByIdAndDelete(id)
    .then((expense)=>{
        res.status(200).json({message : "Expense deleted"}) 
    })
    .catch((error) => {
        res.status(500).json({message : "server error"})
    })
}
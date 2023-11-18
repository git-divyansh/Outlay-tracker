const IncomeSchema = require("../models/IncomeModel")

exports.addIncome = async (req,res) => {
    const {userid, title, amount, category, description, date} = req.body
    const income = IncomeSchema({
        userid,
        title, 
        amount, 
        category,
        description,
        date
    }) 
    try {
        //validations
        console.log("--------- add income backend----------------");
        if(!userid || !title || !category || !description || !date){
            return res.satus(400).json({message : "All fields are requried!"})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.satus(400).json({message : "Amount must be positive!"})
        }
        await income.save()
        res.status(200).json({message : "Income Added"})
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.getIncome = async (req, res) =>{
    const {id} = req.params;
    try {
        const incomes = await IncomeSchema.find({userid : id}).sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message : "income nhi mili"})
    }
}

exports.deleteIncome = async (req, res) =>{
    const {id} = req.params;
    IncomeSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Income Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}
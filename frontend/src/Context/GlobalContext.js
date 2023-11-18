import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/v1/"
const BASE_URL = "https://outlaytrackerbackend.onrender.com/api/v1/"

const GlobalContext = createContext();

export const GlobalProvider = ({children}) =>{

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null) 
    const [user, setUser] = useState(false);
    const [userId, setuserId] = useState(null)
    const [name, setName] = useState(localStorage.getItem('username') || "")

    useEffect(()=>{
        const id = localStorage.getItem('userid');
        if(id)
            setuserId(id);
    }, [userId])

    //This function will add income in the database
    const addIncome = async (income) => {
        // eslint-disable-next-line
        income = {...income, ['userid'] : userId};
        // eslint-disable-next-line
        const response = await axios.post(`${BASE_URL}add-income`, income, {withCredentials : true})
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getIncomes()
    }

    // This funcition will retrieve the income database  
    const getIncomes = async () => {
        const userid = localStorage.getItem('userid');
        try {
            const response = await axios.post(`${BASE_URL}get-incomes/${userid}`, {withCredentials : true})
            setIncomes(response.data)
        } catch (error) {
            setError(error.response.data.message)
        }   
    }

    
    const deleteIncome = async (id) => {
        var payload = {
            'userid' : ""
        }
        // eslint-disable-next-line
        payload = {...payload, ['userid'] : userId};
        // eslint-disable-next-line
        const res  = await axios.delete(`${BASE_URL}delete-income/${id}`, {
              withCredentials: true, // include cookies
              data: payload, // Include your request body here
        })
        .catch((err) =>{
            setError(err.response.data.message)
        })
        getIncomes()
    }

    const totalIncome = () => {
        console.log(incomes);
        let totalIncome = 0;
        incomes.forEach((data) =>{
            totalIncome += data.amount;
        })
        return totalIncome;
    }

    //calculate incomes
    const addExpense = async (expense) => {
        const userid = userId
        // eslint-disable-next-line
        expense = {...expense, ['userid'] : userid};
        // eslint-disable-next-line
        const response = await axios.post(`${BASE_URL}add-expense`, expense, {withCredentials : true})
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const userid = userId
        try {
            const response = await axios.post(`${BASE_URL}get-expenses/${userid}`, {withCredentials : true}) 
            if(response){ 
                setExpenses(response.data);
            }
        } catch (error) {
            setError(error.response.data.message)
        }
    }

    const deleteExpense = async (id) => {
        var payload = {
            'userid' : ""
        }
        // eslint-disable-next-line
        payload = {...payload, ['userid'] : userId};
        // eslint-disable-next-line
        const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`, {
            withCredentials: true, // include cookies
            data: payload, // Include your request body here
        })
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((data) =>{
            totalIncome += data.amount;
        })

        return totalIncome;
    }


    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        if(!incomes)
            setIncomes(0);
        if(!expenses)
            setExpenses(0);
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }

    const getUser = async (user) =>{
        try{
            let info = await axios.post(`${BASE_URL}get-user`, user, {withCredentials : true})
            const id = info.data.check._id;
            const name = info.data.check.username;
            if(id && name){
                setName(name);
                setuserId(id);
                setUser(true);
                localStorage.setItem("userid", id);
                localStorage.setItem("username", name);
            }
            else    
                setError("Some error ocurred while logging in.")
        }
        catch(err){
            setError(err)
        }
    }

    const addUser = async (user) =>{
        // eslint-disable-next-line
        let res = await axios.post(`${BASE_URL}add-user`, user, {withCredentials : true})
        .catch((err) =>{
            setError(err.response.data.message);
        })
    }


    return(
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError,
            getUser,
            addUser,
            user,
            setUser,
            userId,
            name,
            setName
        }}>
            {children}
        </GlobalContext.Provider>
    )
}


export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}
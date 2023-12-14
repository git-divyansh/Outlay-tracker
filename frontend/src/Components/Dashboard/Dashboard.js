import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../Context/GlobalContext'
import { rupee } from '../../Utils/Icons';
import Chart from '../Chart/Chart';
import History from '../../History/History';

const Dashboard = () => {
    const {user, totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext()

    // Using useEffect to preload the Income and Expense 
    useEffect(() => {
        getIncomes()
        getExpenses()
    // eslint-disable-next-line
    }, [user])

  return (
    <DashboardStyled >
        <InDivStyled>
            <h1>Dashboard</h1>
            <div className="stats-con">
                <div className="chart-con">
                    <Chart />
                    <div className="amount-con">
                        <div className="income">
                            <h2>Total Income</h2>
                            <p>
                                {rupee} {totalIncome()}            
                            </p>
                        </div>
                        <div className="expense">
                            <h2>Total Expense</h2>
                            <p>
                                {rupee} {totalExpenses()}         
                            </p>
                        </div>
                        <div className="balance">
                            <h2>Total Balance</h2>
                            <p>
                                {rupee} {totalBalance()}          
                            </p>
                        </div>
                    </div>
                </div>
                <div className="history-con">
                    <History />
                    <h2 className="salary-title">Min <span>Salary</span>Max</h2>
         
                    <div className="salary-item">
                        <p>
                            {rupee}{incomes.length ? Math.min(...incomes.map(item => (item.amount ? item.amount : 0))) : 0}                
                        </p>
                        <p>
                            {rupee}{incomes.length ? Math.max(...incomes.map(item => (item.amount ? item.amount : 0))) : 0}              
                        </p>
                    </div>
                    <h2 className="salary-title">Min <span>Expense</span>Max</h2>
                    <div className="salary-item">
                        <p>
                            {rupee}{expenses.length ? Math.min(...expenses.map(item => (item.amount ? item.amount : 0))) : 0}
                        </p>
                        <p>
                            {rupee}{expenses.length ? Math.max(...expenses.map(item => (item.amount ? item.amount : 0))) : 0}
                        </p>
                    </div>
                </div>
            </div>
        </InDivStyled>
    </DashboardStyled>
  )
}

const InDivStyled = styled.div`
    background-color: #222321;
    height: auto;
    width: 100%;
    padding: 2rem 1.5rem;
    h1{
        margin-bottom: 15px;
        /* display: flex;
        justify-content: center;
        align-items: center; */
        
    }
    /* border: 2px solid white; */
    
`

const DashboardStyled = styled.div`
    .stats-con{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;
        .chart-con{
            grid-column: 1 / 4;
            height: 400px;
            .amount-con{
                h2{
                    color : #c8c6c6;
                }
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 2rem;
                padding-top: 2rem;
                .income, .expense{
                    grid-column: span 3;
                }
                .income, .expense, .balance{
                    background: #262725;
                    /* border: 2px solid #FFFFFF; */
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;
                    p{
                        color: #384d70;
                        font-size: 3.5rem;
                        font-weight: 700;
                    }
                    width: fit-content;
                }

                .balance{
                    width: fit-content;
                    grid-column: 1 / 4;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: flex-start;
                    p{
                        color: var(--color-green);
                        opacity: 0.6;
                        font-size: 4.5rem;
                    }
                }
                @media screen and (max-width: 1574px){
                    .income, .expense, .balance{
                        width: 10rem;
                        margin: 0px 10px;
                        padding: 1rem 10px;
                        h2{
                            margin-bottom: 10px;
                            width: 100%;
                            font-size: 20px;
                        }
                        p{
                            font-size: 20px;
                        }
                    }
                }
            }
            @media screen and (max-width: 1574px){
                display: flex;
                /* flex-direction: column; */
                width: 100%;
            }
        }

        .history-con{
            grid-column: 4 / -1;
            h2{
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .salary-title{
                font-size: 1.2rem;
                span{
                    font-size: 1.8rem;
                }
            }
            .salary-item{
                /* background: #FCF6F9; */
                background: #262725;
                /* border: 2px solid #FFFFFF; */
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                p{
                    color: #384d70;
                    font-weight: 600;
                    font-size: 1.6rem;
                }
            }
        }
        @media screen and (max-width: 1574px){
            display: flex;
            flex-direction: column;
            width: 100%;
        }
    }
`;

export default Dashboard
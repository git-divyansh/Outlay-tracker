import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../Context/GlobalContext';
import { InnerLayout } from '../../Styles/Layouts';
import Form from '../Form/Form.js';
import {rupee} from '../../Utils/Icons.js'
import IncomeItem from '../IncomeItem/IncomeItem';


const Incomes = () => {
    const {user, incomes, getIncomes, deleteIncome, totalIncome} = useGlobalContext()

    useEffect(() =>{
        getIncomes()
    // eslint-disable-next-line
    }, [user])
    
  return (
    <IncomeStyled>
        <InnerLayout>
            <h1>Incomes</h1>
            <h2 className="total-income">Total Income: <span>{rupee}{totalIncome()}</span></h2>
            <div className="income-content">
                <div className="form-container">
                    <Form />
                </div>
                <div className="incomes">
                    {incomes ? incomes.map((income) => {
                        const {_id, title, amount, date, category, description, type} = income;
                        return <IncomeItem
                            key={_id}
                            id={_id} 
                            title={title} 
                            description={description} 
                            amount={amount} 
                            date={date} 
                            type={type}
                            category={category} 
                            indicatorColor="var(--color-green)"
                            deleteItem={deleteIncome}
                        />
                    }) : null}
                </div>
            </div>
        </InnerLayout>
    </IncomeStyled>
  )
}

const IncomeStyled = styled.div`
    overflow-x: hidden;
    display: flex;
    overflow: auto;
    .total-income{
        color: #c8c6c6;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #262725;
        /* border: 2px solid #FFFFFF; */
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
    }
    .income-content{
        display: flex;
        gap: 2rem;
        .incomes{
            flex: 1;
        }
        @media screen and (max-width: 1574px){
            display: flex;
            flex-direction: column;
        }
    }

`;


export default Incomes
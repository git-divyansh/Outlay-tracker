import React from 'react'
import {Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'

import {Line} from 'react-chartjs-2'
import styled from 'styled-components'
import { useGlobalContext } from '../../Context/GlobalContext'
import { dateFormat } from '../../Utils/DateFormat'

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)

const Chart = () => {
    const {incomes, expenses} = useGlobalContext()

    const data = {
        labels: incomes.map((inc) =>{
            const {date} = inc
            return dateFormat(date)
        }),
        datasets: [
            {
                label: 'Income',
                data: [
                    ...incomes.map((income) => {
                        const {amount} = income
                        return amount
                    })
                ],
                backgroundColor: 'green',
                tension: .2,
                borderColor : '#c8c6c6',
                borderWidth : 1  
            },
            {
                label: 'Expenses',
                data: [
                    ...expenses.map((expense) => {
                        const {amount} = expense
                        return amount
                    })
                ],
                backgroundColor: 'red',
                borderColor : '#c8c6c6',
                borderWidth : 1  ,
                tension: .2
            }
        ]
    }


    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'white' // Change Y-axis values color here
                },
                grid: {
                    color: '#717070 ' // Change Y-axis grid lines color here
                }
            },
            x: {
                beginAtZero: true,
                ticks: {
                    color: 'white' // Change x-axis values color here
                },
                grid: {
                    color: '#717070' // Change Y-axis grid lines color here
                }
            }
        }   
    }


    return (
        <ChartStyled >
            <Line data={data} options={options} />
        </ChartStyled>
    )
}

const ChartStyled = styled.div`
    background: #3a3b39;
    /* border: 2px solid #FFFFFF; */
    @media screen and (max-width: 1574px){
            display: flex;
            width: 100%;
        }
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
`;

export default Chart
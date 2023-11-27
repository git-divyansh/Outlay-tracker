import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {dateFormat} from "../../Utils/DateFormat" 
import Chart from "../Chart/Chart2"
import { useGlobalContext } from "../../Context/GlobalContext";
import { rupee, comment,calender } from "../../Utils/Icons";

const Transaction = () => {
  const {incomes, expenses} = useGlobalContext();
  var dataset = [];
  incomes.forEach(x =>{dataset.push(x)})
  expenses.forEach(x =>{dataset.push(x)})

  const obj = [
    "Salary",
    "Freelancing",
    "Investments",
    "Stocks",
    "Bitcoin",
    "Bank transfer",
    "Youtube",
    "Others"
  ];

  const obj2 = [
    "Education",
    "Groceries",
    "Health",
    "Subscriptions",
    "Takeaways",
    "Clothing",
    "Travelling",
    "Other"
  ]

  const [data, setData] = useState(dataset);
  const [ids, setIds] = useState({
    "salary": "false",
    "freelancing": "false",
    "investments": "false",
    "stocks": "false",
    "bitcoin": "false",
    "bank transfer": "false",
    "youtube": "false",
    "others": "false",
    "income": "false",
    "expense": "false",
    "education" : "false",
    "groceries": "false",
    "health": "false",
    "subscriptions": "false",
    "takeaways": "false",
    "clothing": "false",
    "travelling": "false",
    "other": "false"
  });

  useEffect(() => {
    const handleData = () => {
      var newData = [];
      var flag = false;

      obj.forEach((x) => {
        if (ids[x.toLowerCase()] === "true") flag = true;
      });
      obj2.forEach((x) => {
        if (ids[x.toLowerCase()] === "true") flag = true;
      });
      if (ids["income"] === "true" || ids["expense"] === "true") flag = true;

      dataset.forEach((x) => {
        if (ids[x.category] === "true" || ids[x.type] === "true") {
          newData.push(x);
        }
      });

      if (flag === true) setData(newData);
      else setData(dataset);
    };
    handleData();
    // eslint-disable-next-line
  }, [ids]);

  const handleClick = (id) => {
    let value = id;
    if (ids[value] === "true") {
      setIds({ ...ids, [value]: "false" });
    }
    if (ids[value] === "false") {
      setIds({ ...ids, [value]: "true" });
    }
    
  };

  return (
    <TransactionStyled>
      <h1>View Transactions</h1>
      <ChartStyled>
        <Chart incomes = {incomes} expenses = {expenses} obj2 = {obj2} obj = {obj}/>
      </ChartStyled>
      <h2>Customized search...</h2>
      <TransactionInfo>
        <div className="checkbox-div">
          <ul>
          <li style={{marginBottom : "10px"}}>
              <input
                id="income"
                type="checkbox"
                onClick={(e) => handleClick(e.target.id)}
              />
              <label>All Income</label>
            </li>
            {obj.map((x) => {
              return (
                <li>
                  <input
                    id={x.toLowerCase()}
                    type="checkbox"
                    onClick={(e) => handleClick(e.target.id)}
                  />
                  <label>{x}</label>
                </li>
              );
            })}
          </ul>
          <ul>
            <li style={{marginBottom : "10px"}}>
              <input
                id="expense"
                type="checkbox"
                onClick={(e) => handleClick(e.target.id)}
              />
              <label>All Expense</label>
            </li>
            {obj2.map((x) => {
              return (
                <li>
                  <input
                    id={x.toLowerCase()}
                    type="checkbox"
                    onClick={(e) => handleClick(e.target.id)}
                  />
                  <label>{x}</label>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="display-data">
          {data.map((x) => {
            return (
              <div id="element" className="element">
                <div className="text">
                  <p>{rupee}{x.amount}</p>
                  <p>{x.title}</p>
                  <p>{comment}{x.description}</p>
                  <p>{calender}{dateFormat(x.date)}</p>
                </div>
                <span
                  style={{
                    background: `${x.type === "income" ? "#42ad00" : "red"}`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </TransactionInfo>
    </TransactionStyled>
  );
};

const TransactionStyled = styled.div`
  h1 {
    margin: 2rem 1rem;
    font-size: 40px;
  }
  h2{
        display: flex;
        justify-content: center ;
        margin-top: 4rem;
    }
`;

const TransactionInfo = styled.div`
  height: 34rem;
  margin-top: 3rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  .checkbox-div {
      margin: 1rem 1rem;
      margin-top: 2rem;
    display: flex;
    justify-content: center;
    width: 20rem;
    ul {
      color: black;
      gap: 1rem;
      margin: 10px 10px;
    }
    li {
      margin-right: auto;
      list-style-type: none;
    }
    label{
        margin: 5px 5px;
    }
  }
  .display-data {
    margin-right: auto;
    overflow-y: scroll;
    overflow-x: hidden;
    width: 40rem;
    height: 30rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    .element {
      padding: 5px 10px;
      border-radius: 15px;
      height: 4rem;
      width: 30rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background : #FCF6F9;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.2);
      .text {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        p {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          opacity: 0.8;
        }
      }
      span {
        border-radius: 10px;
        margin-left: auto;
        width: 10px;
        height: 100%;
        background: #42ad00;
      }
    }
    #element::-webkit-scrollbar {
      width: 10px;
      background-color: #f5f5f5;
    }
    #element::-webkit-scrollbar-track {
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.1);
      border: 1px solid #ccc;
    }

    #element::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: linear-gradient(left, #fff, #e4e4e4);
      border: 1px solid #aaa;
    }

    #element::-webkit-scrollbar-thumb:hover {
      background: #fff;
    }

    #element::-webkit-scrollbar-thumb:active {
      background: linear-gradient(left, #22add4, #1e98ba);
    }
  }
`;

const ChartStyled = styled.div`

`

export default Transaction;

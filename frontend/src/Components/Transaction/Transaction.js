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
      <ChartStyled>
      <h1>View Transactions</h1>
        <Chart incomes = {incomes} expenses = {expenses} obj2 = {obj2} obj = {obj}/>
      </ChartStyled>
      <TransactionInfo>
        <h2>Customized search...</h2>
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
        <h2>Transactions..</h2>
        <div className="display-data">
          {data.length ? data.map((x) => {
            return (
              <div id="element" className="element">
                <div className="text">
                  <p>{rupee}{x.amount}</p>
                  <p>{x.title}</p >
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
          }) : <div id="element" className="element" style={{display : "flex", justifyContent : "center", color : "#c8c6c6"}}> No Transactions</div>}
        </div>
      </TransactionInfo>
    </TransactionStyled>
  );
};

const TransactionStyled = styled.div`
  background-color: #222321;
  padding: 2rem 1.5rem;
  display: flex;
  /* height: 100%; */
  h1 {
    padding-bottom: 20px;
    font-size: 40px;    
    display: flex;
    justify-content: center;
    align-items: center;

  }
  h2{
        display: flex;
        justify-content: center ;
        margin-top: 4rem;
    }

  @media screen and (max-width: 1574px){
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const TransactionInfo = styled.div`
  height: 50rem;
  width: 40rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center ;
  h2{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .checkbox-div {
    margin: 0rem 1rem;
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    width: 20rem;
    ul {
      color: #a7a7a7;
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
    @media screen and (max-width: 1574px){
      margin: 0rem 1rem;
    }
  }
  .display-data {
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    background-color: #3a3b39;
    padding: 10 px 25px;
    overflow-x: hidden;
    overflow-y: scroll;
    width: 94%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 10px;
    gap: 10px;
    .element {
      padding: 5px 10px;
      border-radius: 15px;
      min-height: 4rem;
      width: 30rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background : #262725;
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
          color: #c8c6c6;
        }
      }
      span {
        border-radius: 10px;
        margin-left: auto;
        width: 10px;
        height: 100%;
        background: #42ad00;
      }
      @media screen and (max-width: 1024px){
        font-size: 15px;
        width: 27rem;
      }
    }
    &::-webkit-scrollbar {
      width: 0.5em;
    }

    &::-webkit-scrollbar-thumb {
      background-color: white;
      border-radius: 10px;
    }
    @media screen and (max-width: 1024px){
      width: 80%;
      padding: 10px  0px;
    }
    @media screen and (max-width: 1574px){
      width: 94%;
      padding: 10px  0px;
    }
  }
`;

const ChartStyled = styled.div`

`

export default Transaction;

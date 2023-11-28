import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
  } from "chart.js/auto";
  import { Bar } from "react-chartjs-2";
  import styled from "styled-components";
  
  ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
  );
  
  const Chart2 = ({ incomes, expenses, obj2, obj }) => {
  
      var income = [];
      obj.forEach((x) => {
        var a = 0;
        // eslint-disable-next-line
        incomes.map((y) => {
          if (y.type === "income" && y.category === x.toLowerCase())
            a += y.amount;
      });
      income.push(a);
    })
    var expense = [];
      obj2.forEach((x)=>{
        var b = 0;
        // eslint-disable-next-line
        expenses.map(y =>{
          if (y.type === "expense" && y.category === x.toLowerCase())
            b += y.amount;
        })
        expense.push(b);
      })
  
    const data = {
      labels: obj,
      datasets: [
        {
          label: "Income",
          data: income,
          backgroundColor: [
            "green",
            "green",
            "green",
            "green",
            "green",
            "green",
            "green",
            "green",
          ],
        }
      ]
    };

    const data2 = {
      labels : obj2,
      datasets : [
        {
          label : "Expense",
          data : expense,
          backgroundColor : [
            "red",
            "red",
            "red",
            "red",
            "red",
            "red",
            "red",
            "red"
          ]
        }
      ]
    }
  
    return (
      <BarStyled>
        <Bar 
          data={data} 
        />
        <Bar 
          data={data2}
        />
      </BarStyled>
    );
  };
  
  const BarStyled = styled.div`
    display: flex;
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 18rem;
    justify-content: space-between;
  `;
  
  export default Chart2;
  
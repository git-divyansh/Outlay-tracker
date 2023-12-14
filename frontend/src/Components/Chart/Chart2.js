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
      <>
        <BarStyled>
          <Bar 
            className="chart1"
            data={data} 
            options={options}
            />
        </BarStyled>
        <BarStyled>
          <Bar 
            className="chart2"
            data={data2}
            options={options}
          />
        </BarStyled>
      </>
    );
  };
  
  const BarStyled = styled.div`
    display: flex;  
    flex-direction: column;
    margin-bottom: 24%;
    width: fit-content;
    height: fit-content;
    background: #3a3b39;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    justify-content: space-between;
    .chart1, .chart2{
      height: 18rem;
    }
    @media screen and (max-width: 1574px){
      margin: 1rem 1rem;
      .chart1, .chart2{
        height: 20rem;
        width: 100%;
      }
    }
    @media screen and (max-width: 1024px){
      margin: 1rem 1rem;
      .chart1, .chart2{
        height: 14rem;
        width: 100%;
      }
    }
  `;
  
  export default Chart2;
  
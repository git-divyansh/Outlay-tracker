import styled from "styled-components";
import { MainLayout } from "../Styles/Layouts";
import Glow from "../Components/Glow/Glow";
import Navigation from "../Components/Navigation/Navigation";
import { useMemo, useState } from "react";
import Dashboard from "../Components/Dashboard/Dashboard";
import Incomes from "../Components/Incomes/Incomes";
import Expenses from "../Components/Expenses/Expenses";
import Transaction from "../Components/Transaction/Transaction";

const Home = () => {
    const [active, setActive] = useState(1)
  
    const displayData = () => {
      switch(active){
        case 1:
          return <Dashboard />
        case 2:
          return <Transaction />
        case 3:
          return <Incomes />
        case 4: 
          return <Expenses />
        default: 
          return <Dashboard />
      }
    }
  
    const glowMemo = useMemo(()=>{
      return <Glow />
    }, [])
  return (
        <AppStyled className="App">
        {glowMemo}
        <MainLayout>
        <Navigation 
          active = {active} 
          setActive = {setActive} 
          />
        <main>
          {displayData()}
        </main>
      </MainLayout>
    </AppStyled>
  )
}

const AppStyled = styled.div`
    height: 100vh;
    background-color: #121311;
    position: relative;
    main{
      flex: 1;
      background: rgba(252, 246, 249, 0.78);
      border: 3px solid #222321;
      backdrop-filter: blur(4.5px);
      border-radius: 32px;
      overflow-x: hidden;
      &::-webkit-scrollbar{
        width: 0;
      }
    }

`

export default Home
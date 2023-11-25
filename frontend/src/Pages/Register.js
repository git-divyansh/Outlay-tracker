import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useGlobalContext } from '../Context/GlobalContext';

const Register = () => {
    const [inputs, setInputs] = useState({});

    const {error, addUser} = useGlobalContext()
    const navigate = useNavigate();

    const handleChange = (e, name) => {
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = (e) => {
        addUser(inputs);
        if(!error){
            navigate('/login');
        }
    }

  return (
    <FormLogin onSubmit={handleSubmit}>
        <h1>Sign Up!</h1>
            <Details>
            {error ?  <p> {error} </p>: <legend>Create Account</legend>}
                <ul>
                    <li>
                    <label for="username">Username:</label>
                    <input type="text" value={inputs["username"]} id="username" required onChange={(e)=>handleChange(e, e.target.id)}/>
                    </li>
                    <li>
                    <label for="email">Email:</label>
                    <input type="email" value={inputs["email"]} id="email" required onChange={(e)=>handleChange(e, e.target.id)}/>
                    </li>
                    <li>
                    <label for="password">Password:</label>
                    <input type="password" value={inputs["password"]} id="password" required onChange={(e)=>handleChange(e, e.target.id)}/>
                    </li>
                </ul>
            </Details>
        <div>
            <Btn onClick={handleSubmit}>Submit</Btn>
            <Btn style={{textDecoration : "none"}} onClick={()=>{navigate('/login')}} type="button">Login</Btn>
        </div>
  </FormLogin>
  )
}

const FormLogin = styled.form`
    margin-top: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width : 100%;
    height: 100%;
    legend{
      margin: 1rem;
      font-size: 1.3rem;
    }
    h1{
      margin: 5px 5px;
    }
`

const Details = styled.div`
  height: 15rem;
  width: 30rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  ul{
    display : flex;
    flex-direction: column;
    gap: 1rem
  }
  li{
    margin: 0.2rem;
    gap: 1rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    label{
      font-size: 21px;
    }
    input{
      height: 2rem;
      width: 20rem;
      padding: 5px 5px;
      font-size: 15px;
      font-style: inherit;
    }
  }
`

const Btn = styled.button`
  margin: 5px 2px;
  height: 2.4rem;
  width: 7rem;
  border-radius: 4px;
  border-width: 0px;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.12);
    cursor: pointer;
  input{
    padding: 10px 10px;
  }
`

export default Register
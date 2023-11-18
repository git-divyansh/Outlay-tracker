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
        <h2>Sign Up!</h2>
        {error ?  <p> {error} </p>: <legend>Create Account</legend>}
            <Details>
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
            <Btn style={{textDecoration : "none"}} onClick={()=>{navigate('/login')}} type="button">Have an Account?</Btn>
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
    background-color: edf6f9;
    height: 100%;
`

const Details = styled.div`
  height: 10rem;
  width: 30rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: aliceblue;
  border-radius: 5px;
  ul{
    display : flex;
    flex-direction: column;
    gap: 1rem
  }
`

const Btn = styled.button`
    margin: 5px 2px;
    padding: 2px 2px;
    height: 30px;
    width: fit-content;
`

export default Register